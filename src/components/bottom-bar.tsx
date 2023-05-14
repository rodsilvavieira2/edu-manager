import { useRouter } from 'expo-router'
import { Box, HStack, Icon, IconButton, useTheme } from 'native-base'
import {
  ChartBar,
  Gear,
  GraduationCap,
  House,
  Plus,
} from 'phosphor-react-native'

import { Dimensions } from 'react-native'

const ICON_SIZE = 58

const { width } = Dimensions.get('window')

export function BottomBar() {
  const {
    colors: { white },
  } = useTheme()

  const ICON_COLOR = white

  const router = useRouter()

  return (
    <Box
      shadow={'8'}
      h="16"
      position="absolute"
      left={0}
      right={0}
      bottom={0}
      zIndex={300}
      _dark={{ bg: 'dark.100' }}
      _light={{ bg: 'white' }}
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
            variant="bottom"
            icon={<Icon as={<House color={ICON_COLOR} />} />}
            onPress={() => {
              router.push('/app')
            }}
          />

          <IconButton
            variant="bottom"
            icon={<Icon as={<GraduationCap color={ICON_COLOR} />} />}
            onPress={() => {
              router.push('/app/classes')
            }}
          />
        </HStack>

        <IconButton
          shadow={4}
          translateY={-ICON_SIZE / 2}
          translateX={(width - ICON_SIZE) / 2}
          style={{ height: ICON_SIZE, width: ICON_SIZE }}
          position="absolute"
          variant="bottom"
          icon={<Icon as={<Plus color="white" />} />}
        />

        <HStack space={8}>
          <IconButton
            variant="bottom"
            icon={<Icon as={<ChartBar color={ICON_COLOR} />} />}
            onPress={() => {
              router.push('/app/statistics')
            }}
          />

          <IconButton
            variant="bottom"
            icon={<Icon as={<Gear color={ICON_COLOR} />} />}
            onPress={() => {
              router.push('/app/settings')
            }}
          />
        </HStack>
      </Box>
    </Box>
  )
}
