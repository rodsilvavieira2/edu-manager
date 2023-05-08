import {
  Avatar,
  Box,
  HStack,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Stack,
  Text,
} from 'native-base'
import { CaretRight } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../src/redux/slices'

export default function Settings() {
  const user = useSelector(selectUser)

  return (
    <Box safeArea flex={1} bgColor="#F6F8FA">
      <Box
        alignItems="center"
        justifyContent="center"
        flexDir="row"
        px="4"
        py="4"
        bg="info.500"
        shadow={8}
      >
        <Heading color="white" fontSize="lg">
          Configurações
        </Heading>
      </Box>

      <HStack space={4} h="20" bg="white" alignItems="center" px="4">
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

      <ScrollView
        mb="16"
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Stack space={6} flex={1} py="3">
          <Stack px="4" space={2}>
            <Heading>Conta</Heading>

            <Stack space={4}>
              <SettingsBtn
                title="Sair"
                onPress={() => console.log('Editar perfil')}
              />

              <SettingsBtn
                title="Notificações"
                onPress={() => console.log('Editar perfil')}
              />

              <SettingsBtn
                title="Lingua"
                onPress={() => console.log('Editar perfil')}
              />

              <SettingsBtn
                title="Tema"
                onPress={() => console.log('Editar perfil')}
              />
            </Stack>
          </Stack>

          <Stack px="4" space={2}>
            <Heading>Geral</Heading>

            <Stack space={4}>
              <SettingsBtn
                title="Suporte"
                onPress={() => console.log('Editar perfil')}
              />

              <SettingsBtn
                title="Termos de serviço"
                onPress={() => console.log('Editar perfil')}
              />

              <SettingsBtn
                title="Privacidade"
                onPress={() => console.log('Editar perfil')}
              />

              <SettingsBtn
                title="Sobre"
                onPress={() => console.log('Editar perfil')}
              />

              <SettingsBtn
                title="Feedback"
                onPress={() => console.log('Editar perfil')}
              />
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
    </Box>
  )
}

interface SettingsBtnProps {
  title: string
  onPress: VoidFunction
}

function SettingsBtn({ title, onPress }: SettingsBtnProps) {
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <Box
        rounded="lg"
        bg="white"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        py="4"
        px="3"
      >
        <Text fontWeight="bold">{title}</Text>

        <IconButton
          colorScheme="info"
          variant="subtle"
          rounded="full"
          size="xs"
          icon={<Icon as={<CaretRight size={18} />} />}
        />
      </Box>
    </TouchableOpacity>
  )
}
