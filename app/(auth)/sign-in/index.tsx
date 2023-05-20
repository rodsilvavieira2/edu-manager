import { zodResolver } from '@hookform/resolvers/zod'
import { SVGS } from '@src/assets/svgs'
import { Container } from '@src/components/container'
import {
  FormInput,
  FormPasswordInput,
  SocialButton,
} from '@src/components/form'
import { LocalizedHeading } from '@src/components/localized-header'
import { LocalizedText } from '@src/components/localized-text'
import { useLocation } from '@src/context'
import {
  useOnEmailLoginMutation,
  useOnGoogleLoginMutation,
} from '@src/redux/api'
import { useRouter } from 'expo-router'
import {
  Button,
  Center,
  HStack,
  Icon,
  KeyboardAvoidingView,
  Link,
  ScrollView,
  Stack,
  useTheme,
} from 'native-base'
import { Envelope, FacebookLogo, GoogleLogo } from 'phosphor-react-native'
import { useForm } from 'react-hook-form'
import { useWindowDimensions } from 'react-native'
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

export default function SignIn() {
  const { icon } = useTheme().colors

  const [onGoogleLogin, googleLoginState] = useOnGoogleLoginMutation()
  const [onEmailLogin, emailLoginState] = useOnEmailLoginMutation()
  const { t } = useLocation()

  const { height } = useWindowDimensions()

  const router = useRouter()

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView flex={1}>
        <Container safeArea style={{ height: height + 20 }}>
          <Center h={['45%']} w={['100%']}>
            <SVGS.welcome height="100%" width="100%" />
          </Center>

          <LocalizedHeading path="sign-in.heading.line1" mt={6} />

          <Stack mt={6} space={6}>
            <Stack space={4}>
              <FormInput
                control={control}
                name="email"
                keyboardType="email-address"
                placeholder={t('sign-in.form.email')}
                leftElement={
                  <Icon ml={2} as={<Envelope color={icon[500]} />} />
                }
              />

              <FormPasswordInput
                control={control}
                placeholder={t('sign-in.form.password')}
                name="password"
              />
            </Stack>

            <Button
              size="lg"
              rounded="lg"
              colorScheme="indigo"
              onPress={onSubmit}
              isLoading={emailLoginState.isLoading}
            >
              {t('sign-in.form.submitBtn')}
            </Button>
          </Stack>

          <HStack
            space={4}
            flex={1}
            alignItems="center"
            justifyContent="center"
          >
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
            <LocalizedText path="sign-in.footer.line1" />

            <Link colorScheme="info" onPress={goToSignUp}>
              {t('sign-in.footer.line2')}
            </Link>
          </HStack>
        </Container>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
