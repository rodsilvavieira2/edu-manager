import { useLocation } from '@src/context'
import { TranslateOptions } from 'i18n-js'
import { ITextProps, Text } from 'native-base'

export interface LocalizedTextProps extends ITextProps {
  path: string
  options?: TranslateOptions
}

export function LocalizedText({ path, options, ...props }: LocalizedTextProps) {
  const { t } = useLocation()

  return <Text {...props}>{t(path, options)}</Text>
}
