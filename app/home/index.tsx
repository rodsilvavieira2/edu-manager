import { getCalendars } from 'expo-localization'
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Stack,
  Text,
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
import { useOnLogoutMutation } from '../../src/redux/api'
import {
  selectAllTasks,
  selectCompletedTasks,
  selectUncompletedTasks,
  selectUser,
} from '../../src/redux/slices'
import { dateService } from '../../src/services/dayjs'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function Home() {
  return (
    <Stack space={2} bg="white" safeArea p={4} flex={1}>
      <Header />

      <HStack my={4} space={4}>
        <IncomingTasks />

        <CompletedTasks />
      </HStack>

      <Box flexDir="row" alignItems="center" justifyContent="space-between">
        <Heading fontSize="lg">Seus afazeres para hoje</Heading>

        <Button
          size="sm"
          rounded="lg"
          colorScheme="info"
          borderColor="gray.300"
          variant="outline"
          _text={{ color: 'gray.500' }}
        >
          Ver tudo
        </Button>
      </Box>

      <TasksList />
    </Stack>
  )
}

function Header() {
  const {
    colors: { gray },
  } = useTheme()

  const user = useSelector(selectUser)

  const [onGoogleLogout] = useOnLogoutMutation()

  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      <Heading numberOfLines={1}>Olá, {user.name ?? 'novamente'}</Heading>

      <IconButton
        rounded="full"
        colorScheme="info"
        onPress={onGoogleLogout}
        icon={<Icon as={<Bell color={gray[500]} />} />}
      />
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

  return (
    <TouchableOpacity activeOpacity={0.6}>
      <HStack
        w="100%"
        borderWidth={1}
        borderColor="gray.300"
        rounded="md"
        px="4"
        py={4}
        bg="info.50"
        alignItems="center"
        space={4}
      >
        <Stack space={1} flex={1}>
          <Text fontWeight="bold" numberOfLines={1}>
            {name}
          </Text>

          <HStack space={3}>
            <HStack space={1} alignItems="center">
              <Clock size={18} color={colors.gray[500]} />

              <Text>{date}</Text>
            </HStack>

            <HStack space={1} alignItems="center">
              <CircleNotch size={18} color={colors.gray[500]} />

              <Text>
                {currentStep}/{steps}
              </Text>
            </HStack>
          </HStack>
        </Stack>

        <Center>
          <ArrowRight color={colors.gray[500]} weight="bold" />
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

  if (!data.length) {
    return (
      <Center flex={1}>
        <Text>Nenhum afazer encontrado</Text>
      </Center>
    )
  }

  return (
    <ScrollView
      mt={4}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Stack space={4}>
        {data.map((item) => (
          <TaskCard key={item.id} {...item} />
        ))}
      </Stack>
    </ScrollView>
  )
}
