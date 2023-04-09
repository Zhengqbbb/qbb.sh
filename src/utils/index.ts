import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

export function isExternal(path: string) {
  const outboundRE = /^(https?:|mailto:|tel:)/
  return outboundRE.test(path)
}

export function getYear(a: Date | string | number) {
  return new Date(a).getFullYear()
}
export function isSameYear(a: Date | string | number, b: Date | string | number) {
  return a && b && getYear(a) === getYear(b)
}
export function formatDate(d?: string | Date | null, lang = 'en') {
  if (!d)
    return
  if (isSameYear(d, new Date()))
    return lang === 'zh' ? dayjs(d).locale('zh-CN').format('MMMDD日') : dayjs(d).format('MMM D')
  else
    return lang === 'zh' ? dayjs(d).locale('zh-CN').format('YYYY年 MMMDD日') : dayjs(d).format('MMM D, YYYY')
}

export const isClient = typeof window !== 'undefined'
