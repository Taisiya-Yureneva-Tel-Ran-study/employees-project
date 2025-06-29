import { FC, useState } from 'react'
import useEmployeeFilters from '../state-management/store';
import { useForm } from 'react-hook-form';
import { Button, Field, HStack, VStack } from '@chakra-ui/react';
import { minSalary, maxSalary } from "../../config/employees-config.json"

const SalaryFilter: FC = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const setSalaryRange = useEmployeeFilters(s => s.setSalaryRange);
  const salaryFrom  = useEmployeeFilters(s => s.salaryFrom)
  const salaryTo = useEmployeeFilters(s => s.salaryTo)
  const [salaryFromCur, setSalaryFromCur] = useState<number>(minSalary)
  const [salaryToCur, setSalaryToCur] = useState<number>(maxSalary)
  const { handleSubmit, register } = useForm<{ salaryFromInput: number, salaryToInput: number }>();

  return (
    <HStack as="form" onSubmit={handleSubmit((data) => {
      setEditing(false);
      setSalaryRange(data.salaryFromInput, data.salaryToInput);
    })}>
      <Field.Root>
        <Field.Label>Salary from</Field.Label>
        <input type="number" {...register("salaryFromInput", { valueAsNumber: true, min: minSalary,
          max: (salaryTo ? salaryTo - 1 : maxSalary - 1), onChange: (e) => {
            console.log("min", e.target.value);
            if (e.target.value < salaryToCur) {
              console.log("ok, editing");
              setEditing(true);
              setSalaryFromCur(e.target.value);
              setEditing(true);
            }
            else {
              setEditing(false);}
          }, value: salaryFromCur })} />
      </Field.Root>
      <Field.Root>
        <Field.Label>Salary to</Field.Label>
        <input type="number" {...register("salaryToInput", { valueAsNumber: true, min:minSalary + 1,
          max: maxSalary, value: salaryToCur, onChange: (e) => {
            if (e.target.value > salaryFromCur) {
              setSalaryToCur(e.target.value);
              setEditing(true);
            }
            else {
              setEditing(false);
            }
          } })}/>

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