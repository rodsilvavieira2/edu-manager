import { usePathname, useRouter } from 'expo-router'
import {
  Box,
  HStack,
  IIconButtonProps,
  Icon,
  IconButton,
  useTheme,
} from 'native-base'
import {
  ChartBar,
  Gear,
  GraduationCap,
  House,
  Plus,
} from 'phosphor-react-native'

import { Dimensions } from 'react-native'

const ICON_SIZE = 58

export const BOTTOM_BAR_HEIGHT = 64

const { width } = Dimensions.get('window')

export function BottomBar() {
  const {
    colors: { white },
  } = useTheme()

  const ICON_COLOR = white

  return (
    <Box
      shadow={'8'}
      style={{ height: BOTTOM_BAR_HEIGHT }}
      position="absolute"
      left={0}
      right={0}
      bottom={0}
      zIndex={300}
      _dark={{ bg: 'dark.100' }}
      _light={{ bg: 'light.100' }}
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
          <BtnBottom path="/app" icon={<House color={ICON_COLOR} />} />

          <BtnBottom
            icon={<GraduationCap color={ICON_COLOR} />}
            path="/app/disciplines"
          />
        </HStack>

        <PlusButton />

        <HStack space={8}>
          <BtnBottom
            icon={<ChartBar color={ICON_COLOR} />}
            path="/app/statistics"
          />

          <BtnBottom icon={<Gear color={ICON_COLOR} />} path="/app/settings" />
        </HStack>
      </Box>
    </Box>
  )
}

interface BtnBottomProps extends IIconButtonProps {
  icon: JSX.Element
  path: string
}

function BtnBottom({ icon, path, ...props }: BtnBottomProps) {
  const router = useRouter()
  const currentPath = usePathname()

  return (
    <IconButton
      variant="bottom"
      icon={<Icon as={icon} />}
      bg={currentPath === path ? 'indigo.500' : undefined}
      onPress={() => {
        router.push(path)
      }}
      {...props}
    />
  )
}

export function PlusButton() {
  const name = usePathname()

  const router = useRouter()

  const actions = {
    '/app': () => {
      router.push('/app/new-task')
    },

    '/app/disciplines': () => {
      router.push('/app/new-discipline')
    },
  }

  const action = actions[name]

  function onCreate() {
    action?.()
  }

  if (!action) return null

  return (
    <IconButton
      shadow={4}
      translateY={-ICON_SIZE / 2}
      translateX={(width - ICON_SIZE) / 2}
      style={{ height: ICON_SIZE, width: ICON_SIZE }}
      position="absolute"
      variant="bottom"
      onPress={onCreate}
      icon={<Icon as={<Plus color="white" />} />}
    />
  )
}
