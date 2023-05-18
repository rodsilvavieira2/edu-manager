import {
  FormControl,
  IFormControlProps,
  ITextAreaProps,
  TextArea,
} from 'native-base'
import { Control, Path, useController } from 'react-hook-form'

export interface FormTextAreaProps<T> extends Partial<ITextAreaProps> {
  control: Control<T>
  name: Path<T>
  _container?: IFormControlProps
}

export function FormTextArea<T>({
  control,
  name,
  _container,
  ...props
}: FormTextAreaProps<T>) {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error, invalid },
  } = useController({ control, name })

  return (
    <FormControl isInvalid={invalid} {..._container}>
      <TextArea
        rounded="lg"
        onChangeText={onChange}
        value={value as string}
        ref={ref}
        onBlur={onBlur}
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
        placeholderTextColor="gray.500"
        autoCompleteType="off"
        {...props}
      />

      <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
    </FormControl>
  )
}
