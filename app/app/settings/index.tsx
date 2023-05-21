import { Container } from '@src/components/container'
import { ScreenHeader } from '@src/components/screen-header'
import { useOnGoogleLogoutMutation } from '@src/redux/api'
import { selectUser } from '@src/redux/slices'
import {
  Actionsheet,
  Avatar,
  Box,
  HStack,
  Heading,
  IActionsheetItemProps,
  Icon,
  IconButton,
  ScrollView,
  Stack,
  Text,
  useColorMode,
  useDisclose,
  useTheme,
} from 'native-base'
import { CaretRight, Check } from 'phosphor-react-native'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

export default function Settings() {
  const [t] = useTranslation()

  return (
    <>
      <ScreenHeader title={t('settings.title')} />

      <Container space={4} withBottomBar>
        <UserInfo />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack space={6} flex={1}>
            <AccountOptions />

            <GeneralOptions />
          </Stack>
        </ScrollView>
      </Container>
    </>
  )
}

function UserInfo() {
  const user = useSelector(selectUser)

  return (
    <HStack
      _dark={{
        bg: 'dark.100',
      }}
      _light={{
        bg: 'indigo.100',
      }}
      space={4}
      alignItems="center"
      px="4"
      py="5"
      borderRadius={'md'}
    >
      <Avatar
        source={{
          uri: user?.profile_url || undefined,
        }}
      />

      <Stack>
        <Text>{user.email}</Text>

        <Text fontWeight="bold" fontSize="lg">
          {user.name}
        </Text>
      </Stack>
    </HStack>
  )
}

function AccountOptions() {
  const themeChoose = useRef<ChooseThemActionSheetRef>(null)
  const languageChoose = useRef<ChooseLanguageActionSheetRef>(null)

  function onTheme() {
    themeChoose.current?.onOpen()
  }

  function onLanguage() {
    languageChoose.current?.onOpen()
  }

  const [onGoogleLogOut] = useOnGoogleLogoutMutation()

  const { t } = useTranslation()

  function onSignOut() {
    onGoogleLogOut()
  }

  return (
    <>
      <Stack space={2}>
        <Heading>{t('settings.account.title')}</Heading>

        <Stack space={4}>
          <SettingsBtn
            title={t('settings.account.btn.logout')}
            onPress={onSignOut}
          />

          <SettingsBtn
            title={t('settings.account.btn.notifications')}
            onPress={() => console.log('Editar perfil')}
          />

          <SettingsBtn
            title={t('settings.account.btn.language')}
            onPress={onLanguage}
          />

          <SettingsBtn
            title={t('settings.account.btn.theme')}
            onPress={onTheme}
          />
        </Stack>
      </Stack>

      <ChooseLanguageActionSheet ref={languageChoose} />

      <ChooseThemActionSheet ref={themeChoose} />
    </>
  )
}

function GeneralOptions() {
  const { t } = useTranslation()

  return (
    <Stack space={2}>
      <Heading>{t('settings.general.title')}</Heading>

      <Stack space={4}>
        <SettingsBtn
          title={t('settings.general.btn.support')}
          onPress={() => console.log('Editar perfil')}
        />

        <SettingsBtn
          title={t('settings.general.btn.terms')}
          onPress={() => console.log('Editar perfil')}
        />

        <SettingsBtn
          title={t('settings.general.btn.privacy')}
          onPress={() => console.log('Editar perfil')}
        />

        <SettingsBtn
          title={t('settings.general.btn.about')}
          onPress={() => console.log('Editar perfil')}
        />

        <SettingsBtn
          title={t('settings.general.btn.feedback')}
          onPress={() => console.log('Editar perfil')}
        />
      </Stack>
    </Stack>
  )
}

interface SettingsBtnProps {
  title: string
  onPress: VoidFunction
}

function SettingsBtn({ title, onPress }: SettingsBtnProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Box
        rounded="lg"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        py="4"
        px="3"
        _dark={{
          bg: 'dark.100',
        }}
        _light={{
          bg: 'indigo.100',
        }}
      >
        <Text fontWeight="bold">{title}</Text>

        <IconButton
          variant="subtle"
          rounded="full"
          size="xs"
          icon={
            <Icon as={<CaretRight size={18} weight="bold" color="white" />} />
          }
          bg="primary.500"
          _pressed={{
            bg: 'primary.400',
          }}
        />
      </Box>
    </TouchableOpacity>
  )
}

interface ChooseLanguageActionSheetRef {
  onOpen: VoidFunction
  onClose: VoidFunction
}

const ChooseLanguageActionSheet = forwardRef<ChooseLanguageActionSheetRef>(
  (_, ref) => {
    const { isOpen, onOpen, onClose } = useDisclose()
    const [t, { language, changeLanguage }] = useTranslation()

    useImperativeHandle(
      ref,
      () => {
        return {
          onClose,
          onOpen,
        }
      },
      []
    )

    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ActionSheetItem
            isCurrent={language === 'pt-BR'}
            onPress={() => {
              changeLanguage('pt-BR')
              onClose()
            }}
          >
            {t('actionSheet.language.portuguese')}
          </ActionSheetItem>

          <ActionSheetItem
            isCurrent={language === 'en-US'}
            onPress={() => {
              changeLanguage('en-US')
              onClose()
            }}
          >
            {t('actionSheet.language.english')}
          </ActionSheetItem>
        </Actionsheet.Content>
      </Actionsheet>
    )
  }
)

interface ChooseThemActionSheetRef {
  onOpen: VoidFunction
  onClose: VoidFunction
}

const ChooseThemActionSheet = forwardRef<ChooseThemActionSheetRef>((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclose()
  const { colorMode, setColorMode } = useColorMode()

  const { t } = useTranslation()

  useImperativeHandle(ref, () => {
    return {
      onClose,
      onOpen,
    }
  })

  function onDark() {
    setColorMode('dark')
  }

  function onLight() {
    setColorMode('light')
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <ActionSheetItem isCurrent={colorMode === 'dark'} onPress={onDark}>
          {t('actionSheet.theme.dark')}
        </ActionSheetItem>

        <ActionSheetItem isCurrent={colorMode === 'light'} onPress={onLight}>
          {t('actionSheet.theme.light')}
        </ActionSheetItem>
      </Actionsheet.Content>
    </Actionsheet>
  )
})

interface ActionsheetItemProps extends IActionsheetItemProps {
  isCurrent: boolean
}

function ActionSheetItem(props: ActionsheetItemProps) {
  const {
    colors: { primary },
  } = useTheme()

  const icon = props.isCurrent ? (
    <Icon as={<Check color={primary[500]} weight="bold" />} />
  ) : undefined

  return (
    <Actionsheet.Item
      {...props}
      leftIcon={icon}
      rounded="md"
      _dark={{
        _pressed: {
          bg: 'dark.200',
        },
      }}
      _light={{
        _pressed: {
          bg: 'gray.100',
        },
      }}
    />
  )
}
