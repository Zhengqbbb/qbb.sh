import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        desc: z.string(),
        // #region [Optional] - gen from data
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
        // #endregion
    }),
})

const projects = defineCollection({
    type: 'data',
    schema: z.record(z.array(
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
