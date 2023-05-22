import { ISelectProps, Select } from 'native-base'
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

export function FormSelect<T = any>({
  name,
  control,
  items,
  ...props
}: FormSelectProps<T>) {
  const {
    field: { onChange, ref, value },
  } = useController<T>({ control, name })

  return (
    <Select
      selectedValue={String(value)}
      ref={ref as any}
      onValueChange={onChange}
      {...props}
    >
      {items.map((item) => (
        <Select.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Select>
  )
}
