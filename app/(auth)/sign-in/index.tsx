import { zodResolver } from '@hookform/resolvers/zod'
import { SVGS } from '@src/assets/svgs'
import {
  FormInput,
  FormPasswordInput,
  SocialButton,
} from '@src/components/form'
import { Container } from '@src/components/layout'
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
  Text,
  useTheme,
} from 'native-base'
import { Envelope, FacebookLogo, GoogleLogo } from 'phosphor-react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Dimensions, StatusBar } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { z } from 'zod'

const { height } = Dimensions.get('window')

const SCREEN_HEIGHT = height + StatusBar.currentHeight

export default function SignIn() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView>
        <Container style={{ height: SCREEN_HEIGHT }}>
          <Header />

          <Form />

          <SocialLogins />

          <Footer />
        </Container>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

function Header() {
  const { t } = useTranslation()

  return (
    <>
      <Center h={RFPercentage(45)} w={['100%']}>
        <SVGS.welcome height="100%" width="100%" />
      </Center>

      <Text mt={6}>{t('sign-in.heading.line1')}</Text>
    </>
  )
}

function Form() {
  const { icon } = useTheme().colors

  const [onEmailLogin, emailLoginState] = useOnEmailLoginMutation()

  const { t } = useTranslation()

  const validation = z.object({
    email: z
      .string({ required_error: t('form.required') })
      .email({ message: t('form.email') }),

    password: z
      .string({ required_error: t('form.required') })
      .min(8, t('form.required')),
  })

  type Validation = z.infer<typeof validation>

  const { control, trigger, getValues } = useForm<Validation>({
    resolver: zodResolver(validation),
  })

  async function onSubmit() {
    const isValid = await trigger()

    if (!isValid) return

    const { email, password } = getValues()

    onEmailLogin({ email, password })
  }

  return (
    <Stack mt={6} space={6}>
      <Stack space={4}>
        <FormInput
          control={control}
          name="email"
          keyboardType="email-address"
          placeholder={t('sign-in.form.email')}
          leftElement={<Icon ml={2} as={<Envelope color={icon[500]} />} />}
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
  )
}

function SocialLogins() {
  const { icon } = useTheme().colors

  const [onGoogleLogin, googleLoginState] = useOnGoogleLoginMutation()

  return (
    <HStack
      flex={1}
      space={4}
      my={6}
      alignItems="center"
      justifyContent="center"
    >
      <SocialButton
        onPress={onGoogleLogin}
        isDisabled={googleLoginState.isLoading}
        icon={<GoogleLogo weight="bold" color={icon[700]} />}
      />

      <SocialButton icon={<FacebookLogo weight="bold" color={icon[700]} />} />
    </HStack>
  )
}

function Footer() {
  const router = useRouter()
  const { t } = useTranslation()

  function goToSignUp() {
    router.push('sign-up')
  }

  return (
    <HStack justifyContent="center" space={1}>
      <Text>{t('sign-in.footer.line1')}</Text>

      <Link colorScheme="info" onPress={goToSignUp}>
        {t('sign-in.footer.line2')}
      </Link>
    </HStack>
  )
}
