import {
  Actionsheet,
  Box,
  ScrollView,
  Stack,
  Text,
  useDisclose,
  useTheme,
} from 'native-base'
import { IColorHues } from 'native-base/lib/typescript/theme/base/colors'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Control, Path, useController } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'

type CurrentColor = {
  key: string
  hex: string
}

export interface FormColorPickProps<T> {
  name: Path<T>
  control: Control<T>
}

export function FormColorPick<T>({ control, name }: FormColorPickProps<T>) {
  const { colors } = useTheme()

  const {
    field: { onChange },
  } = useController({ control, name })

  const [value, setValue] = useState<CurrentColor>({
    key: 'blue',
    hex: colors.blue[500],
  })

  const actionSheetRef = useRef<ActionSheetColorPickerRef>(null)

  function onOpen() {
    actionSheetRef.current?.onOpen()
  }

  function onChangeColor(input: CurrentColor) {
    setValue(input)

    onChange(input.hex)
  }

  return (
    <>
      <Stack space={2}>
        <Text color="gray.500">Escola uma cor:</Text>

        <TouchableOpacity onPress={onOpen} activeOpacity={0.8}>
          <Box rounded="md" style={{ backgroundColor: value.hex }} h="10" />
        </TouchableOpacity>
      </Stack>

      <ActionSheetColorPicker
        current={value.key}
        onChange={onChangeColor}
        ref={actionSheetRef}
      />
    </>
  )
}

interface ActionSheetColorPickerRef {
  onOpen: VoidFunction
  onClose: VoidFunction
}

interface ActionSheetColorPickerProps {
  onChange: (value: CurrentColor) => void
  current: string
}

const ActionSheetColorPicker = forwardRef<
  ActionSheetColorPickerRef,
  ActionSheetColorPickerProps
>(({ current, onChange }, ref) => {
  const { isOpen, onClose, onOpen } = useDisclose()
  const {
    blue,
    cyan,
    danger,
    fuchsia,
    green,
    indigo,
    orange,
    pink,
    purple,
    info,
    red,
    rose,
  } = useTheme().colors

  useImperativeHandle(
    ref,
    () => {
      return {
        onClose,
        onOpen,
      }
    },
    []
  )

  const data = {
    blue,
    cyan,
    danger,
    fuchsia,
    green,
    indigo,
    orange,
    pink,
    purple,
    info,
    red,
    rose,
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <ScrollView
          w="full"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <Stack space={3} w="full">
            {Object.entries(data).map(([key, value]) => (
              <ColorPallet
                key={key}
                current={current}
                pallet={value}
                onChange={onChange}
              />
            ))}
          </Stack>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  )
})

interface ColorPalletProps {
  current: string
  pallet: IColorHues
  key: string
  onChange: (value: CurrentColor) => void
}

function ColorPallet({ pallet, key, onChange }: ColorPalletProps) {
  const colors = Object.values(pallet).slice(5, 9)

  function handleChange() {
    onChange({
      key,
      hex: colors[0],
    })
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleChange}>
      <Box
        style={{ height: 60 }}
        w="full"
        flexDir="row"
        rounded="md"
        overflow="hidden"
      >
        {colors.map((color) => (
          <Box flex={1} key={color} bg={color} borderWidth={0} />
        ))}
      </Box>
    </TouchableOpacity>
  )
}
