import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  Link,
  ScrollView,
  Stack,
  Text,
  useTheme,
} from 'native-base'
import { Envelope, FacebookLogo, GoogleLogo } from 'phosphor-react-native'
import { useForm } from 'react-hook-form'
import { Dimensions } from 'react-native'
import { z } from 'zod'
import { SVGS } from '../src/assets/svgs'
import {
  FormInput,
  FormPasswordInput,
  SocialButton,
} from '../src/components/form'

const formValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const { height } = Dimensions.get('window')

export default function Welcome() {
  const { gray } = useTheme().colors

  const { control } = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
  })

  return (
    <ScrollView>
      <Box safeArea px={4} height={height}>
        <Center h={['45%']} w={['100%']}>
          <SVGS.welcome height="100%" width="100%" />
        </Center>

        <Heading mt={6}>Faça seu login</Heading>

        <Stack mt={6} space={6}>
          <Stack space={4}>
            <FormInput
              control={control}
              name="email"
              keyboardType="email-address"
              leftElement={<Icon ml={2} as={<Envelope color={gray[500]} />} />}
            />

            <FormPasswordInput control={control} name="password" />
          </Stack>

          <Button size="lg" rounded="lg" colorScheme="indigo">
            Entrar
          </Button>
        </Stack>

        <HStack space={4} flex={1} alignItems="center" justifyContent="center">
          <SocialButton icon={<GoogleLogo weight="bold" />} />

          <SocialButton icon={<FacebookLogo weight="bold" />} />
        </HStack>

        <HStack justifyContent="center">
          <Text>Não tem uma conta? </Text>

          <Link colorScheme="info">Cadastre-se</Link>
        </HStack>
      </Box>
    </ScrollView>
  )
}
