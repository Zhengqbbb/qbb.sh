import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        desc: z.string(),
        /** Specify the use of Open Graph images */
        image: z.string().optional(),
        link: z.string().optional(),
        date: z.object({
            date: z.string(),
            year: z.string(),
            iso: z.string(),
            listText: z.string(),
            postText: z.string(),
        }).optional(),
        lang: z.string().optional(),
        /** unit: minutes */
        readTime: z.string().optional(),
        prev: z.object({
            title: z.string(),
            link: z.string(),
        }).optional(),
        next: z.object({
            title: z.string(),
            link: z.string(),
        }).optional(),
    }),
})

const projects = defineCollection({
    loader: file('./src/content/projects/index.yml'),
    schema: z.record(z.string(), z.array(
        z.object({
            title: z.string(),
            desc: z.string(),
            link: z.string(),
            image: z.string(),
        }),
    )),
})

export const collections = {
    blog,
    projects,
}
