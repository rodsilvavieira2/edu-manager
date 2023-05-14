import { FormControl, IInputProps, Input } from 'native-base'
import { Control, useController } from 'react-hook-form'

export interface FormInputProps<T = any> extends IInputProps {
  control: Control<T>
  name: string
}

export function FormInput({ control, name, ...props }: FormInputProps) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error, invalid },
  } = useController({ control, name })

  return (
    <FormControl isInvalid={invalid}>
      <Input
        borderWidth={2}
        rounded="lg"
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
