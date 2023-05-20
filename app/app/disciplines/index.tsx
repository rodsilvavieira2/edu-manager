import { FlashList } from '@shopify/flash-list'
import { Discipline } from '@src/@types'
import { BOTTOM_BAR_HEIGHT } from '@src/components/bottom-bar'
import { ListLoading } from '@src/components/list-loading'
import { ScreenHeader } from '@src/components/screen-header'
import {
  disciplineSelectors,
  selectDisciplineMetadata,
} from '@src/redux/slices'
import {
  Box,
  Center,
  Container,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  useTheme,
} from 'native-base'
import { ArrowRight } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

const CARD_HEIGHT = 64

export default function Disciplines() {
  return (
    <>
      <ScreenHeader title="Disciplines" />

      <Container pt={0} style={{ paddingBottom: BOTTOM_BAR_HEIGHT }}>
        <List />
      </Container>
    </>
  )
}

function List() {
  const data = useSelector(disciplineSelectors.selectAll)
  const { isLoading } = useSelector(selectDisciplineMetadata)

  if (isLoading) return <ListLoading />

  return (
    <FlashList
      contentContainerStyle={{ paddingBottom: 30 }}
      data={data}
      ItemSeparatorComponent={() => <Box h={3} />}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={CARD_HEIGHT}
      renderItem={({ item }) => <DisciplineCard {...item} />}
    />
  )
}

interface DisciplineCardProps extends Discipline {}

function DisciplineCard({ name }: DisciplineCardProps) {
  const { colors } = useTheme()

  const arrowColor = useColorModeValue(colors.icon[700], colors.white)

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
        <Stack flex={1}>
          <Text fontSize="md" fontWeight="bold" numberOfLines={1}>
            {name}
          </Text>

          <HStack alignItems="center" space={1}>
            <Text fontSize="xs" fontWeight="bold" color="primary.500">
              Professor:
            </Text>

            <Text fontSize="xs">{name}</Text>
          </HStack>
        </Stack>

        <Center>
          <ArrowRight color={arrowColor} weight="bold" />
        </Center>
      </HStack>
    </TouchableOpacity>
  )
}
