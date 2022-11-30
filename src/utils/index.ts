import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

export const isExternal = (path: string) => {
  const outboundRE = /^(https?:|mailto:|tel:)/
  return outboundRE.test(path)
}

export const getYear = (a: Date | string | number) => new Date(a).getFullYear()
export const isSameYear = (a: Date | string | number, b: Date | string | number) => a && b && getYear(a) === getYear(b)
export function formatDate(d?: string | Date | null, lang = 'en') {
  if (!d)
    return
  if (isSameYear(d, new Date()))
    return lang === 'zh' ? dayjs(d).locale('zh-CN').format('MMMDD日') : dayjs(d).format('MMM D')
  else
    return lang === 'zh' ? dayjs(d).locale('zh-CN').format('YYYY年 MMMDD日') : dayjs(d).format('MMM D, YYYY')
}

export const isClient = typeof window !== 'undefined'
