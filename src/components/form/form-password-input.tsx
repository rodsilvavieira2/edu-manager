import {
  FormControl,
  IInputProps,
  Icon,
  Input,
  Pressable,
  useTheme,
} from "native-base";
import { Eye, EyeClosed } from "phosphor-react-native";
import { useState } from "react";
import { Control, FieldError, useController } from "react-hook-form";

export interface FormPasswordInputProps<T = any> extends IInputProps {
  error?: FieldError;
  control: Control<T>;
  name: string;
}

export function FormPasswordInput({
  control,
  error,
  name,
  ...props
}: FormPasswordInputProps) {
  const { indigo, gray } = useTheme().colors;
  const [isVisible, setIsVisible] = useState(false);

  const {
    field: { onBlur, onChange, ref, value },
  } = useController({ control, name });

  function onChangeVisible() {
    setIsVisible((prev) => !prev);
  }

  return (
    <FormControl isInvalid={!!error}>
      <Input
        type={isVisible ? "text" : "password"}
        borderWidth={2}
        rounded="lg"
        InputLeftElement={
          <Pressable onPress={onChangeVisible}>
            <Icon
              ml={2}
              as={
                isVisible ? (
                  <Eye color={gray[500]} />
                ) : (
                  <EyeClosed color={gray[500]} />
                )
              }
            />
          </Pressable>
        }
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
  );
}
