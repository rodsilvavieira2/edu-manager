import { Task } from '@src/@types'
import { SVGS } from '@src/assets/svgs'
import { Container } from '@src/components/container'
import { selectUser } from '@src/redux/slices'
import { dateService } from '@src/services'
import { getCalendars } from 'expo-localization'
import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Stack,
  Text,
  useColorModeValue,
  useTheme,
} from 'native-base'
import { ArrowRight, Bell, CircleNotch, Clock } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

const CARD_HEIGHT = 64

export default function Home() {
  return (
    <Container>
      <Stack space={8} flex={1}>
        <Header />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack space={5}>
            <Stack
              space={2}
              bg="indigo.50"
              p={3}
              rounded="md"
              _light={{ bg: 'indigo.50' }}
              _dark={{
                bg: 'dark.200',
              }}
            >
              <HeaderTime title="Hoje" />

              <SVGS.task height={250} width="100%" />

              <Text color="indigo.400" fontWeight="bold" textAlign="center">
                Nada para fazer hoje? Aproveite para descansar e se preparar
              </Text>
            </Stack>

            <Stack
              space={2}
              p={3}
              rounded="md"
              _light={{ bg: 'indigo.50' }}
              _dark={{
                bg: 'dark.200',
              }}
            >
              <HeaderTime title="Amanhã" />

              <SVGS.schedule height={250} width="100%" />

              <Text color="indigo.400" fontWeight="bold" textAlign="center">
                Nada para fazer hoje? Aproveite para descansar e se preparar
              </Text>
            </Stack>
          </Stack>
        </ScrollView>
      </Stack>
    </Container>
  )
}

interface TaskIndicatorProps {}

function TaskIndicator() {
  return (
    <Stack
      space={2}
      bg="indigo.50"
      p={3}
      rounded="md"
      _light={{ bg: 'indigo.50' }}
      _dark={{
        bg: 'dark.200',
      }}
    >
      <HeaderTime title="Hoje" />

      <SVGS.task height={250} width="100%" />

      <Text color="indigo.400" fontWeight="bold" textAlign="center">
        Nada para fazer hoje? Aproveite para descansar e se preparar
      </Text>
    </Stack>
  )
}

function Header() {
  const {
    colors: { icon, white },
  } = useTheme()

  const ICON_COLOR = useColorModeValue(icon[700], white)

  const user = useSelector(selectUser)

  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      <Heading numberOfLines={1}>Olá, {user?.name ?? 'novamente'}</Heading>

      <IconButton
        variant="icon"
        icon={<Icon as={<Bell color={ICON_COLOR} />} />}
      />
    </Box>
  )
}

interface HeaderTimeProps {
  title: string
  dayOffset?: number
}

function HeaderTime({ title, dayOffset = 0 }: HeaderTimeProps) {
  const date = dateService().add(dayOffset, 'day').format('DD/MM/YYYY')

  return (
    <Box flexDir="row" justifyContent="space-between">
      <Heading>{title}</Heading>

      <Text fontWeight="medium">{date}</Text>
    </Box>
  )
}

interface TaskCardProps extends Task {}

function TaskCard({ name, steps, currentStep, endedAt }: TaskCardProps) {
  const values = getCalendars()[0]
  const { colors } = useTheme()

  const date = dateService
    .tz(endedAt, values.timeZone)
    .format('DD/MM/YYYY - HH:mm')

  const arrowColor = useColorModeValue(colors.primary[500], colors.white)
  const displayColor = colors.primary[500]

  return (
    <TouchableOpacity activeOpacity={0.6}>
      <HStack
        w="100%"
        rounded="md"
        bg="info.50"
        px="4"
        alignItems="center"
        space={4}
        style={{
          height: CARD_HEIGHT,
        }}
        _dark={{
          bg: 'dark.100',
        }}
        _light={{
          bg: 'indigo.100',
        }}
      >
        <Stack space={1} flex={1}>
          <Text fontWeight="bold" numberOfLines={1}>
            {name}
          </Text>

          <HStack space={3}>
            <HStack space={1} alignItems="center">
              <Clock size={18} color={displayColor} />

              <Text>{date}</Text>
            </HStack>

            <HStack space={1} alignItems="center">
              <CircleNotch size={18} color={displayColor} />

              <Text>
                {currentStep}/{steps}
              </Text>
            </HStack>
          </HStack>
        </Stack>

        <Center>
          <ArrowRight color={arrowColor} weight="bold" />
        </Center>
      </HStack>
    </TouchableOpacity>
  )
}
