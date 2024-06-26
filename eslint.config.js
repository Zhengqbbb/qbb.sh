import antfu from '@antfu/eslint-config'

export default antfu(
    {
        formatters: true,
        unocss: true,
        astro: true,
        yaml: false,
        markdown: false,
        stylistic: { indent: 4 },
        overrides: {
            jsonc: {
                'indent': ['error', 2],
                'jsonc/indent': ['error', 2],
            },
            javascript: {
                'no-console': 'off',
            },
            typescript: {
                'ts/ban-ts-comment': 'off',
            },
        },
        ignores: [
            'src/components/BaseHead.astro',
        ],
    },
)
