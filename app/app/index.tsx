import { SVGS } from '@src/assets/svgs'
import { Container } from '@src/components/container'
import { useDate } from '@src/hooks'
import { selectUser } from '@src/redux/slices'
import {
  Box,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Stack,
  Text,
  useColorModeValue,
  useTheme,
} from 'native-base'
import { Bell } from 'phosphor-react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  return (
    <Container>
      <Stack space={8} flex={1}>
        <Header />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack space={5}>
            <TaskIndicator
              message="Nada para fazer hoje? Aproveite para descansar e se preparar"
              svg="task"
              title="Hoje"
            />

            <TaskIndicator
              message="Você ainda não tem tarefas para amanhã, comece a criar algumas!"
              svg="schedule"
              title="Amanhã"
              dayOffset={1}
            />
          </Stack>
        </ScrollView>
      </Stack>
    </Container>
  )
}

interface TaskIndicatorProps {
  title: string
  message: string
  svg: keyof typeof SVGS
  dayOffset?: number
}

function TaskIndicator({ message, svg, title, dayOffset }: TaskIndicatorProps) {
  const Svg = SVGS[svg]

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
      <HeaderTime title={title} dayOffset={dayOffset} />

      <Svg height={250} width="100%" />

      <Text
        _light={{ color: 'indigo.400' }}
        _dark={{ color: 'white' }}
        fontWeight="bold"
        textAlign="center"
      >
        {message}
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
  const { addDays } = useDate()

  const date = addDays(dayOffset).format('DD/MM/YYYY')

  return (
    <Box flexDir="row" justifyContent="space-between">
      <Heading>{title}</Heading>

      <Text fontFamily="Lato" fontWeight={500}>
        {date}
      </Text>
    </Box>
  )
}
