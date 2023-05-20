import { zodResolver } from '@hookform/resolvers/zod'
import { SVGS } from '@src/assets/svgs'
import {
  FormInput,
  FormPasswordInput,
  SocialButton,
} from '@src/components/form'
import {
  useOnEmailLoginMutation,
  useOnGoogleLoginMutation,
} from '@src/redux/api'
import { useRouter } from 'expo-router'
import {
  Button,
  Center,
  Container,
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
import { useDispatch } from 'react-redux'
import { z } from 'zod'

const validation = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email({ message: 'E-mail invalido' }),
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(8, 'É preciso ter no mínimo 8 caracteres'),
})

type Validation = z.infer<typeof validation>

const { height } = Dimensions.get('window')

export default function SignIn() {
  const { icon } = useTheme().colors

  const [onGoogleLogin, googleLoginState] = useOnGoogleLoginMutation()
  const [onEmailLogin, emailLoginState] = useOnEmailLoginMutation()

  const router = useRouter()
  const dispatch = useDispatch()

  const { control, trigger, getValues } = useForm<Validation>({
    resolver: zodResolver(validation),
  })

  function goToSignUp() {
    router.push('sign-up')
  }

  async function onSubmit() {
    const isValid = await trigger()

    if (!isValid) return

    const { email, password } = getValues()

    onEmailLogin({ email, password })
  }

  return (
    <ScrollView
      _light={{
        bg: 'neutral.500',
      }}
      _dark={{ bg: 'dark.50' }}
    >
      <Container height={height}>
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
              leftElement={<Icon ml={2} as={<Envelope color={icon[500]} />} />}
            />

            <FormPasswordInput control={control} name="password" />
          </Stack>

          <Button
            size="lg"
            rounded="lg"
            colorScheme="indigo"
            onPress={onSubmit}
            isLoading={emailLoginState.isLoading}
          >
            Entrar
          </Button>
        </Stack>

        <HStack space={4} flex={1} alignItems="center" justifyContent="center">
          <SocialButton
            onPress={onGoogleLogin}
            isDisabled={googleLoginState.isLoading}
            icon={<GoogleLogo weight="bold" color={icon[700]} />}
          />

          <SocialButton
            icon={<FacebookLogo weight="bold" color={icon[700]} />}
          />
        </HStack>

        <HStack justifyContent="center">
          <Text>Não tem uma conta? </Text>

          <Link colorScheme="info" onPress={goToSignUp}>
            Cadastre-se
          </Link>
        </HStack>
      </Container>
    </ScrollView>
  )
}
