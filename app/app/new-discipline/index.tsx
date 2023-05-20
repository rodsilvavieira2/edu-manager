import { zodResolver } from '@hookform/resolvers/zod'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { Container } from '@src/components/container'
import { FormInput, FormTextArea } from '@src/components/form'
import { ScreenHeader } from '@src/components/screen-header'
import { HStack, ScrollView, Stack } from 'native-base'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const validation = z.object({
  name: z.string().min(3).max(255),
  teacher: z.string().min(3).max(255),
  description: z.string().max(255).optional(),
})

type Validation = z.infer<typeof validation>

export default function NewClass() {
  return (
    <>
      <ScreenHeader title="Nova classe" />

      <Container pt={0}>
        <Form />
      </Container>
    </>
  )
}

function chooseTime() {
  DateTimePickerAndroid.open({
    mode: 'time',
    value: new Date(),

    onChange(event, date) {
      console.log(date)
    },
  })
}

function Form() {
  const { control } = useForm<Validation>({
    resolver: zodResolver(validation),
  })

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <Stack space={4}>
        <HStack space={4}>
          <FormInput
            control={control}
            placeholder="Nome"
            name="name"
            height={'10'}
            _container={{ flex: 1 }}
          />

          <FormInput
            control={control}
            name="teacher"
            height={'10'}
            placeholder="Professor(a)"
            _container={{ flex: 1 }}
          />
        </HStack>

        <FormTextArea
          control={control}
          name="description"
          placeholder="Descrição"
        />
      </Stack>
    </ScrollView>
  )
}
