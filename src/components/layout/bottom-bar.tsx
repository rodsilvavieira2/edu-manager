import { useKeyboardChange } from '@src/hooks'
import { usePathname, useRouter } from 'expo-router'
import {
  Actionsheet,
  Box,
  HStack,
  IIconButtonProps,
  Icon,
  IconButton,
  useDisclose,
  useTheme,
} from 'native-base'
import {
  ChartBar,
  Gear,
  GraduationCap,
  House,
  Note,
  NotePencil,
  Notebook,
  Plus,
} from 'phosphor-react-native'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Dimensions } from 'react-native'
import Reanimated, { FadeIn, FadeOut } from 'react-native-reanimated'

const BottomBarContainer = Reanimated.createAnimatedComponent(Box)

const ICON_SIZE = 58

export const BOTTOM_BAR_HEIGHT = 64

const { width } = Dimensions.get('window')

export function BottomBar() {
  const {
    colors: { white },
  } = useTheme()

  const ICON_COLOR = white

  const keyboardState = useKeyboardChange()

  const createItemActionSheetRef = useRef<CreateItemActionSheetRef>(null)

  function onCreateItem() {
    createItemActionSheetRef.current?.onOpen()
  }

  if (keyboardState.isOpen) return null

  return (
    <>
      <BottomBarContainer
        shadow={'8'}
        style={{ height: BOTTOM_BAR_HEIGHT }}
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        zIndex={100}
        _dark={{ bg: 'dark.100' }}
        _light={{ bg: 'light.100' }}
        entering={FadeIn}
        exiting={FadeOut}
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

          <PlusButton onPress={onCreateItem} />

          <HStack space={8}>
            <BtnBottom
              icon={<ChartBar color={ICON_COLOR} />}
              path="/app/statistics"
            />

            <BtnBottom
              icon={<Gear color={ICON_COLOR} />}
              path="/app/settings"
            />
          </HStack>
        </Box>
      </BottomBarContainer>

      <CreateItemActionSheet ref={createItemActionSheetRef} />
    </>
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

const AnimatedIconButton = Reanimated.createAnimatedComponent(IconButton)

interface PlusButtonProps {
  onPress: VoidFunction
}

export function PlusButton({ onPress }: PlusButtonProps) {
  const name = usePathname()

  const router = useRouter()

  const actions = {
    '/app': onPress,

    '/app/disciplines': () => {
      router.push('/app/new-discipline')
    },
  }

  function onClick() {
    actions[name]?.()
  }

  return (
    <AnimatedIconButton
      shadow={4}
      translateY={-ICON_SIZE / 2}
      translateX={(width - ICON_SIZE) / 2}
      style={{ height: ICON_SIZE, width: ICON_SIZE }}
      position="absolute"
      variant="bottom"
      onPress={onClick}
      icon={<Icon as={<Plus color="white" />} />}
      exiting={FadeOut}
      entering={FadeIn}
    />
  )
}

export interface CreateItemActionSheetRef {
  onClose: VoidFunction
  onOpen: VoidFunction
}

export const CreateItemActionSheet = forwardRef<CreateItemActionSheetRef>(
  (_, ref) => {
    const { isOpen, onClose, onOpen } = useDisclose()

    const { icon } = useTheme().colors

    useImperativeHandle(
      ref,
      () => ({
        onClose,
        onOpen,
      }),
      []
    )

    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            _icon={{ marginLeft: 'auto' }}
            rightIcon={<Icon as={<Note color={icon[500]} />} />}
          >
            Lembrete
          </Actionsheet.Item>

          <Actionsheet.Item
            _icon={{ marginLeft: 'auto' }}
            rightIcon={<Icon as={<Notebook color={icon[500]} />} />}
          >
            Tarefa
          </Actionsheet.Item>

          <Actionsheet.Item
            _icon={{ marginLeft: 'auto' }}
            rightIcon={<Icon as={<NotePencil color={icon[500]} />} />}
          >
            Trabalho de casa
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    )
  }
)
