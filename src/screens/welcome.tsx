import {
  Box,
  Center,
  Heading,
  Input,
  Stack,
  Button,
  Icon,
  useTheme,
  HStack,
  Text,
  Link,
} from "native-base";
import { SVGS } from "../assets/svgs";
import { Envelope, EyeClosed } from "phosphor-react-native";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormPasswordInput } from "../components/form";

const formValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function Welcome() {
  const { gray, indigo } = useTheme().colors;

  const { control } = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
  });

  return (
    <Box safeArea flex={1} p={4}>
      <Center h={["45%"]} w={["100%"]}>
        <SVGS.welcome height="100%" width="100%" />
      </Center>

      <Heading mt={6}>Faça seu login</Heading>

      <Stack mt={6} space={6}>
        <Stack space={4}>
          <FormInput
            control={control}
            name="email"
            keyboardType="email-address"
            leftElement={<Icon ml={3} as={<Envelope color={gray[500]} />} />}
          />

          <FormPasswordInput control={control} name="password" />
        </Stack>

        <Button size="lg" rounded="full" colorScheme="indigo">
          Entrar
        </Button>
      </Stack>

      <HStack mt="auto" space={2} justifyContent="center">
        <Text>Não tem uma conta? </Text>

        <Link colorScheme="info">Cadastre-se</Link>
      </HStack>
    </Box>
  );
}
