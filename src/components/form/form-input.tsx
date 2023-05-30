import { FormControl, IFormControlProps, IInputProps, Input } from 'native-base'
import { Control, Path, useController } from 'react-hook-form'

export interface FormInputProps<T> extends IInputProps {
  control: Control<T>
  name: Path<T>
  _container?: IFormControlProps
}

export function FormInput<T>({
  control,
  name,
  _container,
  ...props
}: FormInputProps<T>) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error, invalid },
  } = useController({ control, name })

  return (
    <FormControl isInvalid={invalid} {..._container}>
      <Input
        onChangeText={onChange}
        value={value ? String(value) : undefined}
        ref={ref}
        onBlur={onBlur}
        placeholderTextColor="gray.500"
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
