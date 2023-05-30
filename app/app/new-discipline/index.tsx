import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormColorPick,
  FormInput,
  FormSelect,
  FormTextArea,
  SelectItem,
} from '@src/components/form'
import {
  BOTTOM_BAR_HEIGHT,
  Container,
  ScreenHeader,
} from '@src/components/layout'
import { useKeyboardChange } from '@src/hooks'
import { Fab, Icon, ScrollView, Stack } from 'native-base'
import { FloppyDisk } from 'phosphor-react-native'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const teaches: SelectItem[] = Array.from({ length: 10 }, () => {
  const teacher = faker.name.fullName()

  return {
    label: teacher,
    value: teacher.toLowerCase().replace(/\s/g, '-'),
  }
})

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

  const keyboardVisibility = useKeyboardChange()

  return (
    <>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Stack space={4}>
          <FormColorPick control={control} name="color" />

          <FormInput
            control={control}
            placeholder={t('newDiscipline.form.name')}
            name="name"
          />

          <FormInput
            control={control}
            placeholder={t('newDiscipline.form.name')}
            name="roomName"
          />

          <FormSelect
            control={control}
            name="teacher"
            items={teaches}
            placeholder={t('newDiscipline.form.teacher')}
          />

          <FormTextArea
            control={control}
            name="description"
            flex={1}
            _container={{ height: 150 }}
            placeholder={t('newDiscipline.form.description')}
          />
        </Stack>
      </ScrollView>

      {!keyboardVisibility.isOpen ? (
        <Fab
          size="lg"
          bg="primary.500"
          _pressed={{ bg: 'primary.400' }}
          style={{ bottom: BOTTOM_BAR_HEIGHT + 20 }}
          icon={<Icon as={<FloppyDisk color="white" />} />}
        />
      ) : null}
    </>
  )
}
