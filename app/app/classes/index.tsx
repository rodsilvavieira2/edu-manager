import { faker } from '@faker-js/faker'
import { FlashList } from '@shopify/flash-list'
import {
  Box,
  Center,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  useTheme,
} from 'native-base'
import { ArrowRight } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { Class } from '../../../src/@types'
import { BOTTOM_BAR_HEIGHT } from '../../../src/components/bottom-bar'
import { Container } from '../../../src/components/container'
import { ScreenHeader } from '../../../src/components/screen-header'

const CARD_HEIGHT = 64

const data: Class[] = Array.from(
  {
    length: 30,
  },
  () => ({
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    teacher: faker.name.fullName(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  })
)

export default function Classes() {
  return (
    <>
      <ScreenHeader title="Classes" />

      <Container pt={0} style={{ paddingBottom: BOTTOM_BAR_HEIGHT }}>
        <FlashList
          contentContainerStyle={{ paddingBottom: 30 }}
          data={data}
          ItemSeparatorComponent={() => <Box h={3} />}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={CARD_HEIGHT}
          renderItem={({ item }) => <ClassCard {...item} />}
        />
      </Container>
    </>
  )
}

interface ClassCardProps extends Class {}

function ClassCard({ name, teacher }: ClassCardProps) {
  const { colors } = useTheme()

  const arrowColor = useColorModeValue(colors.icon[700], colors.white)
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
        <Stack flex={1}>
          <Text fontSize="md" fontWeight="bold" numberOfLines={1}>
            {name}
          </Text>

          <HStack alignItems="center" space={1}>
            <Text fontSize="xs" fontWeight="bold" color="primary.500">
              Professor:
            </Text>

            <Text fontSize="xs">{teacher}</Text>
          </HStack>
        </Stack>

        <Center>
          <ArrowRight color={arrowColor} weight="bold" />
        </Center>
      </HStack>
    </TouchableOpacity>
  )
}
