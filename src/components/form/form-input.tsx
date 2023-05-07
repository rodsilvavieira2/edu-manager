import { FormControl, IInputProps, Input, useTheme } from 'native-base'
import { Control, useController } from 'react-hook-form'

export interface FormInputProps<T = any> extends IInputProps {
  control: Control<T>
  name: string
}

export function FormInput({ control, name, ...props }: FormInputProps) {
  const { indigo } = useTheme().colors

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
        colorScheme="indigo"
        cursorColor={indigo[500]}
        {...props}
      />

      <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
    </FormControl>
  )
}
