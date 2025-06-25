import { Button, HStack, NumberInput } from '@chakra-ui/react'
import { maxAge, minAge} from '../../config/employees-config.json'
import { FC, useState } from 'react'
import useEmployeeFilters from '../state-management/store'
import { useForm } from 'react-hook-form'

const AgeFilter: FC = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const {setAgeFrom} = useEmployeeFilters();
  const {setAgeTo} = useEmployeeFilters();
  const {handleSubmit, register} = useForm<{ageFromInput: number, ageToInput: number}>();

  return (
    <HStack as="form" onSubmit={handleSubmit((data) => {
      console.log("submitting", data);
      setEditing(false);
      setAgeFrom(Number(data.ageFromInput));
      setAgeTo(data.ageToInput);
    })}>
      <NumberInput.Root width="200px" defaultValue={minAge.toString()} 
        min={minAge} 
        max={maxAge-1}
        onValueChange={() => setEditing(true)}
        size={"sm"}
      >
        <NumberInput.Label>Age from</NumberInput.Label>
        <NumberInput.Control />
        <NumberInput.Input {...register("ageFromInput", {valueAsNumber: true})}/>
      </NumberInput.Root>
      <NumberInput.Root width="200px" defaultValue={maxAge.toString()} 
        min={minAge+1} 
        max={maxAge}
        onValueChange={() => setEditing(true)}
      >
        <NumberInput.Label>Age to</NumberInput.Label>
        <NumberInput.Control />
        <NumberInput.Input {...register("ageToInput", {valueAsNumber: true})}/>
      </NumberInput.Root>
      <Button type="submit" disabled={!editing} variant={"outline"}>Find</Button>
    </HStack>
  )
}

export default AgeFilter