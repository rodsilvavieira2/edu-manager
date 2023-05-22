import { FlashList } from '@shopify/flash-list'
import { Task } from '@src/@types'
import { SVGS } from '@src/assets/svgs'
import { Container } from '@src/components/container'
import { useDate } from '@src/hooks'
import { selectUser, taskSelectors } from '@src/redux/slices'
import { dateService } from '@src/services'
import {
  Box,
  Center,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Stack,
  Text,
  useColorModeValue,
  useTheme,
} from 'native-base'
import { ArrowRight, Bell } from 'phosphor-react-native'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

export default function Home() {
  return (
    <Container space={4} safeArea withBottomBar>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <TasksReport />
      </ScrollView>
    </Container>
  )
}

function TasksReport() {
  const tasks = useSelector(taskSelectors.selectAll)

  const [t] = useTranslation()

  return (
    <Stack space={5}>
      <TaskIndicator
        emptyMessage={t('app.taskReport.today.empty')}
        svg="task"
        title={t('app.taskReport.today.title')}
        data={filterCurrentDayTasks(tasks)}
      />

      <TaskIndicator
        emptyMessage={t('app.taskReport.tomorrow.empty')}
        svg="schedule"
        title={t('app.taskReport.tomorrow.title')}
        dayOffset={1}
        data={filterNextDayTasks(tasks)}
      />

      <TaskIndicator
        emptyMessage={t('app.taskReport.tasks.empty')}
        svg="time"
        title={t('app.taskReport.tasks.title')}
        data={[]}
      />
    </Stack>
  )
}

interface TaskIndicatorProps {
  title: string
  emptyMessage: string
  svg: keyof typeof SVGS
  dayOffset?: number
  data: Array<{ id: string; name: string }>
}

function TaskIndicator({
  emptyMessage,
  svg,
  data = [],
  title,
  dayOffset,
}: TaskIndicatorProps) {
  if (data.length) {
    return (
      <Stack
        space={2}
        style={{ height: 400 }}
        p={3}
        rounded="md"
        _light={{ bg: 'indigo.50' }}
        _dark={{
          bg: 'dark.200',
        }}
      >
        <HeaderTime title={title} dayOffset={dayOffset} />

        <Box flex={1}>
          <FlashList
            data={data}
            renderItem={({ item }) => <TaskIndicatorItem {...item} />}
            estimatedItemSize={16}
            ItemSeparatorComponent={() => <Box h={3} />}
            nestedScrollEnabled
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </Stack>
    )
  }

  return (
    <Stack
      space={2}
      style={{ height: 400 }}
      p={3}
      rounded="md"
      _light={{ bg: 'indigo.50' }}
      _dark={{
        bg: 'dark.200',
      }}
    >
      <HeaderTime title={title} dayOffset={dayOffset} />

      <EmptyMessage emptyMessage={emptyMessage} svg={svg} />
    </Stack>
  )
}

interface TaskIndicatorItemProps {
  id: string
  name: string
}

function TaskIndicatorItem({ id, name }: TaskIndicatorItemProps) {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <Box
        px={3}
        h={12}
        rounded="md"
        _light={{ bg: 'white' }}
        _dark={{
          bg: 'dark.200',
        }}
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>{name}</Text>

        <Icon as={<ArrowRight size={18} />} />
      </Box>
    </TouchableOpacity>
  )
}

interface EmptyMessageProps
  extends Pick<TaskIndicatorProps, 'svg' | 'emptyMessage'> {}

function EmptyMessage({ emptyMessage, svg }: EmptyMessageProps) {
  const Svg = SVGS[svg]

  return (
    <>
      <Center flex={1}>
        <Svg height={250} width="100%" />
      </Center>

      <Text
        _light={{ color: 'indigo.400' }}
        _dark={{ color: 'white' }}
        fontWeight="bold"
        textAlign="center"
      >
        {emptyMessage}
      </Text>
    </>
  )
}

function Header() {
  const {
    colors: { icon, white },
  } = useTheme()

  const ICON_COLOR = useColorModeValue(icon[700], white)

  const { name } = useSelector(selectUser)

  const { t } = useTranslation()

  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      <Heading>{t('app.header.welcome', { name })}</Heading>

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

  const [t] = useTranslation()

  const date = addDays(dayOffset)

  return (
    <Box flexDir="row" justifyContent="space-between">
      <Heading>{title}</Heading>

      <Text fontFamily="Lato" fontWeight={500}>
        {t('formatting.intlDateTime', {
          val: date.toDate(),
          formatParams: {
            val: {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
            },
          },
        })}
      </Text>
    </Box>
  )
}

function filterCurrentDayTasks(tasks: Task[]) {
  const currentDate = dateService()

  return tasks.filter((task) => {
    return currentDate.isSame(task.finishedAt)
  })
}

function filterNextDayTasks(tasks: Task[]) {
  const currentDate = dateService().add(1, 'day')

  return tasks.filter((task) => {
    return currentDate.isSame(task.finishedAt)
  })
}
