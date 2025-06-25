import { Button, Field, HStack, NumberInput } from '@chakra-ui/react'
import { maxAge, minAge } from '../../config/employees-config.json'
import { FC, useState } from 'react'
import useEmployeeFilters from '../state-management/store'
import { useForm } from 'react-hook-form'

const AgeFilter: FC = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const { setAgeRange } = useEmployeeFilters();
  const { handleSubmit, register } = useForm<{ ageFromInput: number, ageToInput: number }>();

  return (
    <HStack as="form" onSubmit={handleSubmit((data) => {
      setEditing(false);
      setAgeRange(data.ageFromInput, data.ageToInput);
    })}>
      <Field.Root>
        <Field.Label>Age from</Field.Label>
        <NumberInput.Root width="200px" defaultValue={minAge.toString()}
          min={minAge}
          max={maxAge - 1}
          onValueChange={() => setEditing(true)}
          size={"sm"}
        >
          <NumberInput.Control />
          <NumberInput.Input {...register("ageFromInput", { valueAsNumber: true })} />
        </NumberInput.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>Age to</Field.Label>

        <NumberInput.Root width="200px" defaultValue={maxAge.toString()}
          min={minAge + 1}
          max={maxAge}
          onValueChange={() => setEditing(true)}
        >
          <NumberInput.Control />
          <NumberInput.Input {...register("ageToInput", { valueAsNumber: true })} />
        </NumberInput.Root>
      </Field.Root>
      <Button type="submit" disabled={!editing} variant={"outline"}>Find</Button>
    </HStack>
  )
}

export default AgeFilter