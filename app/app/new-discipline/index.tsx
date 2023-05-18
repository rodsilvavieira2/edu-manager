import { zodResolver } from '@hookform/resolvers/zod'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { HStack, ScrollView, Stack } from 'native-base'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BOTTOM_BAR_HEIGHT } from '../../../src/components/bottom-bar'
import { Container } from '../../../src/components/container'
import { FormInput, FormTextArea } from '../../../src/components/form'
import { ScreenHeader } from '../../../src/components/screen-header'

const validation = z.object({
  name: z.string().min(3).max(255),
  teacher: z.string().min(3).max(255),
  description: z.string().max(255).optional(),
})

type FromData = z.infer<typeof validation>

export default function NewClass() {
  return (
    <>
      <ScreenHeader title="Nova classe" />

      <Container pt={0} style={{ paddingBottom: BOTTOM_BAR_HEIGHT }}>
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
  const { control } = useForm<FromData>({
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
