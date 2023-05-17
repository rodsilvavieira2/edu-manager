import { FlashList } from '@shopify/flash-list'
import { getCalendars } from 'expo-localization'
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useTheme,
} from 'native-base'
import { ArrowRight, Bell, CircleNotch, Clock } from 'phosphor-react-native'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Circle, Svg, Text as SvgText } from 'react-native-svg'
import { useSelector } from 'react-redux'
import { Task } from '../../src/@types'
import { BOTTOM_BAR_HEIGHT } from '../../src/components/bottom-bar'
import { Container } from '../../src/components/container'
import { ListLoading } from '../../src/components/list-loading'
import {
  selectAllTasks,
  selectCompletedTasks,
  selectTasksMetadata,
  selectUncompletedTasks,
  selectUser,
} from '../../src/redux/slices'
import { dateService } from '../../src/services/dayjs'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const TASK_CARD_HEIGHT = 64

export default function Home() {
  return (
    <Container style={{ paddingBottom: BOTTOM_BAR_HEIGHT }}>
      <Stack space={2} flex={1}>
        <Header />

        <HStack my={4} space={4}>
          <IncomingTasks />

          <CompletedTasks />
        </HStack>

        <TaskListHeader />

        <TasksList />
      </Stack>
    </Container>
  )
}

function Header() {
  const {
    colors: { icon, white },
  } = useTheme()

  const ICON_COLOR = useColorModeValue(icon[700], white)

  const user = useSelector(selectUser)

  // const [onGoogleLogout] = useOnLogoutMutation()

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

function TaskListHeader() {
  return (
    <Box flexDir="row" alignItems="center" justifyContent="space-between">
      <Heading fontSize="lg">Seus afazeres para hoje</Heading>

      <Button
        size="sm"
        rounded="lg"
        variant="outline"
        _light={{
          _text: {
            color: 'darkText',
          },

          _pressed: {
            bg: 'indigo.400',

            _text: {
              color: 'white',
            },

            borderColor: 'indigo.400',
          },
        }}
        _dark={{
          _text: {
            color: 'white',
          },

          borderColor: 'light.400',

          _pressed: {
            bg: 'indigo.400',
            borderColor: 'indigo.400',
          },
        }}
      >
        Ver tudo
      </Button>
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
          height: TASK_CARD_HEIGHT,
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

function IncomingTasks() {
  const uncompletedTasks = useSelector(selectUncompletedTasks)

  return (
    <Center
      flex={1}
      justifyContent="space-between"
      rounded="md"
      bg="pink.100"
      py={2}
    >
      <Text color="pink.600" fontWeight="bold">
        Próximos
      </Text>

      <Text fontWeight="bold" color="pink.600" fontSize="7xl">
        {uncompletedTasks}
      </Text>

      <Text color="pink.600" fontWeight="bold">
        afazeres
      </Text>
    </Center>
  )
}

function CompletedTasks() {
  const completedTasks = useSelector(selectCompletedTasks)
  const uncompletedTasks = useSelector(selectUncompletedTasks)

  const progress = completedTasks / (completedTasks + uncompletedTasks) || 0

  const { info } = useTheme().colors
  const strokeWidth = 8

  const progressValue = useSharedValue(0)

  useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 1000 })
  }, [progress])

  const width = 130
  const height = 130

  const r = (width - strokeWidth) / 2

  const circumference = useSharedValue(r * 2 * Math.PI)

  const stylesProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference.value * (1 - progressValue.value),
    }
  })

  return (
    <Center
      flex={1}
      py={2}
      justifyContent="space-between"
      rounded="md"
      bg="info.100"
    >
      <Text color="info.500" fontWeight="bold">
        Afazeres
      </Text>

      <Svg style={{ width, height, marginTop: 10, marginBottom: 10 }}>
        <Circle
          cx={r}
          cy={r}
          r={r - strokeWidth / 2}
          fill="transparent"
          stroke={info[200]}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          cx={r}
          cy={r}
          animatedProps={stylesProps}
          r={r - strokeWidth / 2}
          fill="transparent"
          stroke={info[500]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference.value}
          strokeLinecap="round"
        />

        <SvgText
          x={r + strokeWidth / 2}
          y={r + strokeWidth / 2}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={r / 1.8}
          fontFamily="Poppins_500Bold"
          fontWeight="bold"
          fill={info[500]}
        >
          {`${Math.round(progress * 100)}%`}
        </SvgText>
      </Svg>

      <Text color="info.500" fontWeight="bold">
        completos
      </Text>
    </Center>
  )
}

function TasksList() {
  const data = useSelector(selectAllTasks)
  const { isLoading } = useSelector(selectTasksMetadata)

  if (isLoading) {
    return <ListLoading />
  }

  if (!data.length) {
    return (
      <Center flex={1}>
        <Text>Nenhum afazer encontrado</Text>
      </Center>
    )
  }

  return (
    <Box flex={1} mt="3">
      <FlashList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        estimatedItemSize={TASK_CARD_HEIGHT}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Box h={3} />}
        renderItem={({ item }) => <TaskCard {...item} />}
      />
    </Box>
  )
}
