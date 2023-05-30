import { ISelectProps, Icon, Select, useTheme } from 'native-base'
import { CaretDown, Check } from 'phosphor-react-native'
import { Control, Path, useController } from 'react-hook-form'

export interface SelectItem {
  value: string
  label: string
}

export interface FormSelectProps<T> extends ISelectProps {
  name: Path<T>
  control: Control<T>
  items: SelectItem[]
}

export function FormSelect<T>({
  name,
  control,
  items,
  ...props
}: FormSelectProps<T>) {
  const {
    field: { onChange, ref, value },
  } = useController<T>({ control, name })

  const { gray } = useTheme().colors

  return (
    <Select
      selectedValue={value ? String(value) : undefined}
      ref={ref as any}
      onValueChange={onChange}
      placeholderTextColor="gray.500"
      dropdownIcon={<Icon mr="2" as={<CaretDown color={gray[500]} />} />}
      _selectedItem={{
        bg: 'primary.500',
        _text: { color: 'white' },
        rounded: 'md',
        _icon: {
          marginLeft: 'auto',
        },
        rightIcon: (
          <Icon as={<Check color="white" weight="bold" size={20} />} />
        ),
      }}
      {...props}
    >
      {items.map((item) => (
        <Select.Item
          _dark={{ _pressed: { bg: 'dark.200' } }}
          _light={{ _pressed: { bg: 'indigo.200' } }}
          rounded="md"
          key={item.value}
          label={item.label}
          value={item.value}
        />
      ))}
    </Select>
  )
}
