import { FormControl, IInputProps, Input, useTheme } from 'native-base'
import { Control, FieldError, useController } from 'react-hook-form'

export interface FormInputProps<T = any> extends IInputProps {
  error?: FieldError
  control: Control<T>
  name: string
}

export function FormInput({ control, error, name, ...props }: FormInputProps) {
  const { indigo } = useTheme().colors

  const {
    field: { onBlur, onChange, ref, value },
  } = useController({ control, name })

  return (
    <FormControl isInvalid={!!error}>
      <Input
        borderWidth={2}
        rounded="lg"
        onChangeText={onChange}
        value={value}
        ref={ref}
        onBlur={onBlur}
        colorScheme="indigo"
        cursorColor={indigo[500]}
        {...props}
      />

      <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
    </FormControl>
  )
}
