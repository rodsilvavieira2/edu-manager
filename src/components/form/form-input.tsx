import { FormControl, IFormControlProps, IInputProps, Input } from 'native-base'
import { Control, useController } from 'react-hook-form'

export interface FormInputProps<T = any> extends IInputProps {
  control: Control<T>
  name: string
  _container?: IFormControlProps
}

export function FormInput({
  control,
  name,
  _container,
  ...props
}: FormInputProps) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error, invalid },
  } = useController({ control, name })

  return (
    <FormControl isInvalid={invalid} {..._container}>
      <Input
        rounded="lg"
        onChangeText={onChange}
        value={value}
        ref={ref}
        onBlur={onBlur}
        placeholderTextColor="gray.500"
        size="md"
        _light={{
          borderColor: 'gray.400',
          _focus: {
            borderColor: 'primary.500',
          },
        }}
        _dark={{
          _focus: {
            borderColor: 'primary.500',
          },
          borderColor: 'border.300',
        }}
        cursorColor="white"
        {...props}
      />

      <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
    </FormControl>
  )
}
