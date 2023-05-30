import {
  FormControl,
  IInputProps,
  Icon,
  Input,
  Pressable,
  useTheme,
} from 'native-base'
import { Eye, EyeClosed } from 'phosphor-react-native'
import { useState } from 'react'
import { Control, Path, useController } from 'react-hook-form'

export interface FormPasswordInputProps<T> extends IInputProps {
  control: Control<T>
  name: Path<T>
}

export function FormPasswordInput<T>({
  control,
  name,
  ...props
}: FormPasswordInputProps<T>) {
  const { indigo, icon } = useTheme().colors
  const [isVisible, setIsVisible] = useState(false)

  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error, invalid },
  } = useController({ control, name })

  function onChangeVisible() {
    setIsVisible((prev) => !prev)
  }

  return (
    <FormControl isInvalid={invalid}>
      <Input
        type={isVisible ? 'text' : 'password'}
        borderWidth={1}
        placeholderTextColor="gray.500"
        InputLeftElement={
          <Pressable onPress={onChangeVisible}>
            <Icon
              ml={2}
              as={
                isVisible ? (
                  <Eye color={icon[500]} />
                ) : (
                  <EyeClosed color={icon[500]} />
                )
              }
            />
          </Pressable>
        }
        onChangeText={onChange}
        value={value ? String(value) : undefined}
        ref={ref}
        onBlur={onBlur}
        _light={{
          _focus: {
            borderColor: 'primary.500',
          },
        }}
        _dark={{
          _focus: {
            borderColor: 'primary.500',
          },
        }}
        cursorColor="white"
        {...props}
      />

      <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
    </FormControl>
  )
}
