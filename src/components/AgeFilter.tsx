import { Button, Field, HStack, VStack } from '@chakra-ui/react'
import { maxAge, minAge } from '../../config/employees-config.json'
import { FC, useState } from 'react'
import useEmployeeFilters from '../state-management/store'
import { useForm } from 'react-hook-form'

const AgeFilter: FC = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [minAgeInput, setMinAgeInput] = useState<number>(minAge);
  const [maxAgeInput, setMaxAgeInput] = useState<number>(maxAge);
  const setAgeRange = useEmployeeFilters(s => s.setAgeRange);
  const { handleSubmit, register } = useForm<{ ageFromInput: number, ageToInput: number }>();
/// TODO: nice error handling...
  return (
    <HStack as="form" onSubmit={handleSubmit((data) => {
      setEditing(false);
      setAgeRange(data.ageFromInput, data.ageToInput);
    })}>
      <Field.Root>
        <Field.Label>Age from</Field.Label>
        <input type="number" {...register("ageFromInput", { valueAsNumber: true, min: minAge,
          max: (maxAgeInput - 1), onChange: (e) => {
            console.log("min", e.target.value);
            if (e.target.value < maxAgeInput) {
              console.log("ok, editing");
              setEditing(true);
              setMinAgeInput(e.target.value);
              setEditing(true);
            }
            else {
              setEditing(false);}
          }, value: minAgeInput})}></input>
      </Field.Root>
      <Field.Root>
        <Field.Label>Age to</Field.Label>
        <input type="number" {...register("ageToInput", { valueAsNumber: true, min: minAgeInput,
          max: maxAge, onChange:  (e) => {
            console.log("changed to:", e.target.value, e.currentTarget.ariaValueNow);
            if (Number(e.target.value) > minAgeInput ) {
              setEditing(true);
              setMaxAgeInput(Number(e.target.value));
              setEditing(true);
            }
            else setEditing(false);
          }, value: maxAgeInput})}></input>
      </Field.Root>
      <VStack>
      <Button type="submit" disabled={!editing} variant={"outline"}>Find</Button>
      <Button type="reset" onClick={() => {
        setAgeRange(minAge, maxAge);
        setMaxAgeInput(maxAge);
        setMinAgeInput(minAge);
        setEditing(false);
      }} variant={"outline"}>Reset</Button>
      </VStack>
    </HStack>
  )
}

export default AgeFilter