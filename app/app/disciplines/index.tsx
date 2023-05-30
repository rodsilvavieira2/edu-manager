import { FlashList } from '@shopify/flash-list'
import { Discipline } from '@src/@types'
import { SkeletonList } from '@src/components/feedback'
import { Container, ScreenHeader } from '@src/components/layout'

import {
  disciplineSelectors,
  selectDisciplineMetadata,
} from '@src/redux/slices'
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
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

const CARD_HEIGHT = 64

export default function Disciplines() {
  const [t] = useTranslation()

  return (
    <>
      <ScreenHeader title={t('disciplines.title')} />

      <Container>
        <List />
      </Container>
    </>
  )
}

function List() {
  const data = useSelector(disciplineSelectors.selectAll)
  const { isLoading } = useSelector(selectDisciplineMetadata)

  if (isLoading) return <SkeletonList />

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
