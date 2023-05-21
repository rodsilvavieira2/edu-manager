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
  useOnCreateAccountMutation,
  useOnGoogleLoginMutation,
} from '@src/redux/api'
import { useRouter } from 'expo-router'
import {
  Button,
  Center,
  HStack,
  Icon,
  Link,
  ScrollView,
  Stack,
  useTheme,
} from 'native-base'
import { Envelope, FacebookLogo, GoogleLogo } from 'phosphor-react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, StatusBar } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { z } from 'zod'

const { height } = Dimensions.get('window')

const SCREEN_HEIGHT = height + StatusBar.currentHeight

export default function SignUp() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container flex={1} safeArea style={{ height: SCREEN_HEIGHT }}>
        <Header />

        <Form />

        <SocialLogins />

        <Footer />
      </Container>
    </ScrollView>
  )
}

function Header() {
  return (
    <>
      <Center h={RFPercentage(45)} w={['100%']}>
        <SVGS.signUp height="100%" width="100%" />
      </Center>

      <LocalizedHeading path="sign-up.heading.line1" mt={6} />
    </>
  )
}

function Form() {
  const { icon } = useTheme().colors

  const [onCreateAccount, createAccountState] = useOnCreateAccountMutation()

  const { t } = useLocation()

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

    onCreateAccount({ email, password })
  }

  return (
    <Stack mt={6} space={6}>
      <Stack space={4}>
        <FormInput
          control={control}
          name="email"
          keyboardType="email-address"
          placeholder={t('sign-up.form.email')}
          leftElement={<Icon ml={2} as={<Envelope color={icon[500]} />} />}
        />

        <FormPasswordInput
          control={control}
          placeholder={t('sign-up.form.password')}
          name="password"
        />
      </Stack>

      <Button
        size="lg"
        rounded="lg"
        colorScheme="indigo"
        onPress={onSubmit}
        isLoading={createAccountState.isLoading}
      >
        {t('sign-up.form.submitBtn')}
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
  const { t } = useLocation()

  function goToSignUp() {
    router.push('sign-in')
  }

  return (
    <HStack justifyContent="center" space={1}>
      <LocalizedText path="sign-up.footer.line1" />

      <Link colorScheme="info" onPress={goToSignUp}>
        {t('sign-up.footer.line2')}
      </Link>
    </HStack>
  )
}
