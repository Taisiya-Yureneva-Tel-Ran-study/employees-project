import { FC, useState } from 'react'
import useEmployeeFilters from '../state-management/store';
import { useForm } from 'react-hook-form';
import { Button, Field, HStack, NumberInput, VStack } from '@chakra-ui/react';
import { minSalary, maxSalary } from "../../config/employees-config.json"

const SalaryFilter: FC = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const { setSalaryRange } = useEmployeeFilters();
  const { handleSubmit, register } = useForm<{ salaryFromInput: number, salaryToInput: number }>();

  return (
    <HStack as="form" onSubmit={handleSubmit((data) => {
      setEditing(false);
      setSalaryRange(data.salaryFromInput, data.salaryToInput);
    })}>
      <Field.Root>
        <Field.Label>Salary from</Field.Label>
        <NumberInput.Root width="200px" defaultValue={minSalary.toString()}
          min={minSalary}
          max={maxSalary - 1}
          onValueChange={() => setEditing(true)}
          size={"sm"}
        >
          <NumberInput.Control />
          <NumberInput.Input {...register("salaryFromInput", { valueAsNumber: true })} />
        </NumberInput.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>Salary to</Field.Label>
        <NumberInput.Root width="200px" defaultValue={maxSalary.toString()}
          min={minSalary + 1}
          max={maxSalary}
          onValueChange={() => setEditing(true)}
        >
          <NumberInput.Control />
          <NumberInput.Input {...register("salaryToInput", { valueAsNumber: true })} />
        </NumberInput.Root>
      </Field.Root>
      <VStack>
        <Button type="submit" disabled={!editing} variant={"outline"}>Find</Button>
        <Button type="reset" onClick={() => {
          setSalaryRange(minSalary, maxSalary);
          setEditing(false);
        }} variant={"outline"}>Reset</Button>
      </VStack>
    </HStack>
  )
}

export default SalaryFilter