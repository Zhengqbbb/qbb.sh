/**
 *  @PoweredBy https://github.com/Renovamen/renovamen.github.io
 *  @description Calculate the reading time of a text for Blog
 */

export interface ReadingTimeOptions {
    /**
     * Number of Chinese words per minute a user can read
     *
     * @default 300
     */
    wordsPerMinuteCN?: number

    /**
     * Number of English words per minute a user can read
     *
     * @default 200
     */
    wordsPerMinuteEN?: number

    /**
     * Excludes all content inside code blocks or not
     *
     * @default false
     */
    excludeCodeBlock?: boolean

    /**
     * Excludes all content inside tex blocks or not
     *
     * @default false
     */
    excludeTexBlock?: boolean
}

export interface ReadingTime {
    /**
     * Expect reading time (number of minutes)
     */
    minutes: number
    /**
     * Number of words of the page
     */
    words: number
}

function getNumCN(text: string): number {
    return (text.match(/[\u4E00-\u9FA5]/g) || []).length
}

function getNumEN(text: string): number {
    return (
        text
            .replace(/[\u4E00-\u9FA5]/g, '')
            .match(
                // eslint-disable-next-line regexp/no-dupe-disjunctions
                /[\w\u0392-\u03C9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g,
            ) || []
    ).length
}

function excludeCodeBlock(text: string): string {
    return text.replace(/```[\s\S]*?```/g, '')
}

function excludeTexBlock(text: string): string {
    return text.replace(/\$\$[\s\S]*?\$\$/g, '')
}

export function calcReadingTime(text: string, options?: ReadingTimeOptions): ReadingTime {
    options = options || {}

    // use default values if necessary
    options.wordsPerMinuteCN = options.wordsPerMinuteCN || 300
    options.wordsPerMinuteEN = options.wordsPerMinuteEN || 200

    // exclude all content inside code blocks
    if (options.excludeCodeBlock)
        text = excludeCodeBlock(text)
    // exclude all content inside tex blocks
    if (options.excludeTexBlock)
        text = excludeTexBlock(text)

    // number of chinese words and english words
    const cntCN = getNumCN(text || '')
    const cntEN = getNumEN(text || '')

    // compute reading time
    let minutes
        = cntCN / options.wordsPerMinuteCN + cntEN / options.wordsPerMinuteEN
    minutes = minutes < 1 ? 1 : Math.ceil(Number(minutes.toFixed(2)))

    return {
        minutes,
        words: cntCN + cntEN,
    }
}
