import { useLocation } from '@src/context'
import { TranslateOptions } from 'i18n-js'
import { Heading, IHeadingProps } from 'native-base'

export interface LocalizedHeadingProps extends IHeadingProps {
  path: string
  options?: TranslateOptions
}

export function LocalizedHeading({
  path,
  options,
  ...props
}: LocalizedHeadingProps) {
  const { t } = useLocation()

  return <Heading {...props}>{t(path, options)}</Heading>
}
