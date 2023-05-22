import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput, FormTextArea } from '@src/components/form'
import { Container, ScreenHeader } from '@src/components/layout'
import { Box, ScrollView, Stack, Text } from 'native-base'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const validation = z.object({
  name: z.string().min(3).max(255),
  roomName: z.string().max(150).optional(),
  teacher: z.string().min(3).max(255),
  color: z.string().min(3).max(255).optional(),
  description: z.string().max(255).optional(),
})

type Validation = z.infer<typeof validation>

export default function NewClass() {
  const { t } = useTranslation()

  return (
    <>
      <ScreenHeader title={t('newDiscipline.title')} />

      <Container>
        <Form />
      </Container>
    </>
  )
}

function Form() {
  const { control } = useForm<Validation>({
    resolver: zodResolver(validation),
  })

  const { t } = useTranslation()

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <Stack space={4}>
        <FormInput
          control={control}
          placeholder={t('newDiscipline.form.name')}
          name="name"
        />

        <FormInput
          control={control}
          name="teacher"
          placeholder={t('newDiscipline.form.teacher')}
        />

        <FormTextArea
          control={control}
          name="description"
          placeholder={t('newDiscipline.form.description')}
        />

        <Stack space={2}>
          <Text>Escola uma cor:</Text>

          <Box rounded="md" bg="emerald.500" h="10" />
        </Stack>
      </Stack>
    </ScrollView>
  )
}
