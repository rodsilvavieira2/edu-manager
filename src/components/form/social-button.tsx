import { IIconButtonProps, Icon, IconButton } from 'native-base'

interface SocialButtonProps extends IIconButtonProps {}

export function SocialButton({ icon, ...props }: SocialButtonProps) {
  return (
    <IconButton
      rounded="lg"
      colorScheme="indigo"
      borderWidth={1}
      borderColor="gray.400"
      size="lg"
      icon={<Icon as={icon} />}
      {...props}
    />
  )
}
