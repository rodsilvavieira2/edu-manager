import { zodResolver } from '@hookform/resolvers/zod'
import { SVGS } from '@src/assets/svgs'
import {
  FormInput,
  FormPasswordInput,
  SocialButton,
} from '@src/components/form'
import {
  useOnCreateAccountMutation,
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
import { z } from 'zod'

const validation = z.object({
  email: z
    .string({ required_error: 'Campo obrigatório' })
    .email({ message: 'E-mail invalido' }),
  password: z
    .string({ required_error: 'Campo obrigatório' })
    .min(8, 'É preciso ter no mínimo 8 caracteres'),
})

const { height } = Dimensions.get('window')

type Validation = z.infer<typeof validation>

export default function SignUp() {
  const { gray } = useTheme().colors

  const [onCreateAccount, createAccountState] = useOnCreateAccountMutation()
  const [onGoogleLogin, googleLoginState] = useOnGoogleLoginMutation()

  const router = useRouter()

  const { control, trigger, getValues } = useForm<Validation>({
    resolver: zodResolver(validation),
  })

  function onGoToLogin() {
    router.push('/')
  }

  async function onSubmit() {
    const isValid = await trigger()

    if (!isValid) return

    const { email, password } = getValues()

    onCreateAccount({ email, password })
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
          <SVGS.signUp height="100%" width="100%" />
        </Center>

        <Heading mt={6}>Crie sua conta</Heading>

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

          <Button
            size="lg"
            rounded="lg"
            colorScheme="indigo"
            onPress={onSubmit}
            isLoading={createAccountState.isLoading}
          >
            Criar
          </Button>
        </Stack>

        <HStack space={4} flex={1} alignItems="center" justifyContent="center">
          <SocialButton
            onPress={onGoogleLogin}
            isDisabled={googleLoginState.isLoading}
            icon={<GoogleLogo weight="bold" />}
          />

          <SocialButton icon={<FacebookLogo weight="bold" />} />
        </HStack>

        <HStack justifyContent="center">
          <Text>Já tem uma conta?</Text>

          <Link colorScheme="info" onPress={onGoToLogin}>
            Entre aqui
          </Link>
        </HStack>
      </Container>
    </ScrollView>
  )
}
