import type { AstroIntegration } from 'astro'
import { appendFileSync, existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

function collectFiles(dir: string, ext: string): string[] {
    const result: string[] = []
    if (!existsSync(dir)) return result
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) {
            result.push(...collectFiles(full, ext))
        } else if (extname(entry.name) === ext) {
            result.push(full)
        }
    }
    return result
}

export function mergeCSSAssets(): AstroIntegration {
    return {
        name: 'merge-css-assets',
        hooks: {
            'astro:build:done': ({ dir }) => {
                const root = fileURLToPath(dir)
                const cssDir = join(root, '_astro')
                if (!existsSync(cssDir)) return

                const cssFiles = readdirSync(cssDir).filter(f => f.endsWith('.css'))
                if (cssFiles.length < 2) return

                // Keep the first CSS file, merge the rest into it
                const [main, ...rest] = cssFiles
                let merged = ''

                for (const file of rest) {
                    merged += readFileSync(join(cssDir, file), 'utf-8')
                    unlinkSync(join(cssDir, file))
                }

                appendFileSync(join(cssDir, main), merged)

                // Remove stale <link> tags from all HTML files
                const htmlFiles = collectFiles(root, '.html')
                for (const htmlFile of htmlFiles) {
                    let html = readFileSync(htmlFile, 'utf-8')
                    for (const file of rest) {
                        const escaped = basename(file).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                        html = html.replace(
                            new RegExp(`<link[^>]*href="[^"]*${escaped}"[^>]*>\\s*`, 'g'),
                            '',
                        )
                    }
                    writeFileSync(htmlFile, html)
                }
            },
        },
    }
}
