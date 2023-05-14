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
import { Control, useController } from 'react-hook-form'

export interface FormPasswordInputProps<T = any> extends IInputProps {
  control: Control<T>
  name: string
}

export function FormPasswordInput({
  control,
  name,
  ...props
}: FormPasswordInputProps) {
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
        borderWidth={2}
        rounded="lg"
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
        value={value}
        ref={ref}
        onBlur={onBlur}
        _light={{
          borderColor: 'gray.400',
          _focus: {
            borderColor: 'primary.500',
          },
        }}
        _dark={{
          borderColor: 'light.300',
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
