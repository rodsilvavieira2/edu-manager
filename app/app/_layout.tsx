import { Slot } from 'expo-router'
import { Box, HStack, Icon, IconButton, useTheme } from 'native-base'
import { ChartBar, Gear, House, Plus } from 'phosphor-react-native'
import { Dimensions } from 'react-native'
import { useWatchTasks } from '../../src/hooks'

const ICON_SIZE = 58

const { width } = Dimensions.get('window')

export default function ContentLayout() {
  useWatchTasks()

  return (
    <>
      <Slot />

      <BottomBar />
    </>
  )
}

function BottomBar() {
  const {
    colors: { gray },
  } = useTheme()

  const ICON_COLOR = gray[900]

  return (
    <Box
      bg="white"
      shadow={'8'}
      h="16"
      position="absolute"
      left={0}
      right={0}
      bottom={0}
      zIndex={300}
    >
      <Box
        px="3"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        flex={1}
      >
        <HStack space={8}>
          <IconButton
            colorScheme="info"
            rounded="full"
            variant="subtle"
            icon={<Icon as={<House color={ICON_COLOR} />} />}
          />

          <IconButton
            colorScheme="info"
            rounded="full"
            variant="subtle"
            icon={<Icon as={<House color={ICON_COLOR} />} />}
          />
        </HStack>

        <IconButton
          shadow={4}
          translateY={-ICON_SIZE / 2}
          translateX={(width - ICON_SIZE) / 2}
          style={{ height: ICON_SIZE, width: ICON_SIZE }}
          variant="solid"
          position="absolute"
          colorScheme="info"
          rounded="full"
          icon={<Icon as={<Plus color="white" />} />}
        />

        <HStack space={8}>
          <IconButton
            colorScheme="info"
            rounded="full"
            variant="subtle"
            icon={<Icon as={<ChartBar color={ICON_COLOR} />} />}
          />

          <IconButton
            colorScheme="info"
            rounded="full"
            variant="subtle"
            icon={<Icon as={<Gear color={ICON_COLOR} />} />}
          />
        </HStack>
      </Box>
    </Box>
  )
}
