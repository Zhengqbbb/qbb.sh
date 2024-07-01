import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    theme: {
        breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            xl2: '1424px', // macbook 13
            xl3: '1520px', // macbook 16
            xl4: '1650px',
        },
        colors: {
            ...expandColorsDepth('brand'),
            'c-bg': 'hsl(var(--c-bg) , %alpha)',
            'c-bg-accent': 'hsl(var(--c-bg-accent) , %alpha)',
            'c-fg': 'hsl(var(--c-fg) , %alpha)',
            'c-fg-1': 'hsl(var(--c-fg-1) , %alpha)',
            'c-fg-2': 'hsl(var(--c-fg-2) , %alpha)',
            'c-fg-3': 'hsl(var(--c-fg-3) , %alpha)',
            'c-fg-4': 'hsl(var(--c-fg-4) , %alpha)',
            'c-border': 'hsl(var(--c-border) , %alpha)',
            'c-border-accent': 'hsl(var(--c-border-accent) , %alpha)',
            'c-accent': 'hsl(var(--c-accent) , %alpha)',
            'c-code-bg': 'hsl(var(--c-code-bg) , %alpha)',
            'c-inner-code-bg': 'hsl(var(--c-inner-code-bg) , %alpha)',
        },
        borderRadius: {
            xs: '8px',
            sm: '12px',
            DEFAULT: '16px',
            md: '30px',
        },
        spacing: {
            space: 'var(--c-space)',
        },
        fontFamily: {
            sans: 'var(--c-font-family-base)',
            mono: 'var(--c-font-family-mono)',
        },
    },
    rules: [
        [/^slide-enter-(\d+)$/, ([_, n]) => ({
            '--enter-stage': n,
        })],
    ],
    shortcuts: [
        ['bg-gradient-ellipse', 'bg-[radial-gradient(ellipse_at_center,var(--un-gradient-stops))]'],
        ['bg-gradient-circle', 'bg-[radial-gradient(circle_at_center,var(--un-gradient-stops))]'],
        ['image-unloaded', ' blur-4! op-0!'],
        ['image-transition', 'transition-property-["filter,opacity,transform"] duration-400 ease'],
        ['image-loaded', 'blur-0 op-100 image-transition'],
        ['c-sk', 'animate-pulse bg-neutral-200 dark:bg-neutral-900'],
    ],
    content: {
        filesystem: ['src/main.ts'],
    },
    presets: [
        presetAttributify(),
        presetUno(),
        presetIcons({
            extraProperties: {
                'display': 'inline-block',
                'height': '1.2em',
                'width': '1.2em',
                'vertical-align': 'text-bottom',
            },
        }),
        presetWebFonts({
            fonts: {
                sans: 'Inter:400,500,600,800',
                mono: 'Noto Sans Mono:500,700',
            },
            extendTheme: false,
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})

function expandColorsDepth(name: string) {
    const res: any = {}
    const depths = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
    depths.forEach((depth) => {
        res[`c-${name}-${depth}`] = `hsl(var(--c-${name}-${depth}) , %alpha)`
    })
    res[`c-${name}`] = `hsl(var(--c-${name}) , %alpha)`
    return res
}
