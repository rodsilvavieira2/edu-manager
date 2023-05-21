import { IIconButtonProps, Icon, IconButton } from 'native-base'

interface SocialButtonProps extends IIconButtonProps {}

export function SocialButton({ icon, ...props }: SocialButtonProps) {
  return (
    <IconButton
      rounded="lg"
      borderWidth={1}
      size="lg"
      icon={<Icon as={icon} />}
      _light={{
        borderColor: 'gray.400',

        _focus: {
          borderColor: 'primary.500',
        },

        _pressed: {
          bg: 'indigo.200',
          borderColor: 'indigo.200',
        },
      }}
      _dark={{
        borderColor: 'light.300',

        _focus: {
          borderColor: 'primary.500',
        },

        _pressed: {
          bg: 'primary.500',
          borderColor: 'primary.500',
        },
      }}
      {...props}
    />
  )
}
