import { useState, FC } from 'react'
import { Employee } from '../model/dto-types'
import { HStack, IconButton, Input, Text } from '@chakra-ui/react';
import { CiEdit, CiSquareCheck } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { departments, minSalary, maxSalary} from "../../config/employees-config.json"
import { MdClose } from 'react-icons/md';

interface Props {
    submitter: (data: Partial<Employee>) => void;
    field: "department" | "salary";
    prevValue: string | number;
}

const EditField: FC<Props> = ({submitter, field, prevValue}) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string | number>(prevValue);
    const {register, handleSubmit} = useForm<Employee>({defaultValues: {department: field === "department" ? prevValue as string : undefined,
        salary: field === "salary" ? prevValue as number : undefined
    }});

  return (
    <>
        {editing ? <HStack as="form" justifyContent="space-between" width={"80%"} 
            onSubmit={handleSubmit(data => {
            submitter(data);
            setEditing(false);
            setValue(data[field])
        })} onReset={() => {
            setEditing(false);
        }
        }>
            {
                field === "department" ? <select {...register("department")}>
                    {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                : <Input type="number" min={minSalary} max={maxSalary} {...register("salary", {valueAsNumber: true, required: true})} ></Input>
            }
            <span>
                <IconButton size="xs" variant="outline" type="submit" ><CiSquareCheck /></IconButton>
                <IconButton size="xs" variant="outline" type="button" onClick={() => setEditing(false)} ><MdClose /></IconButton>
            </span>
        </HStack> : <HStack justifyContent="space-between" width={"80%"}>
            <Text>{value}</Text>
            <IconButton onClick={() => setEditing(true)} size={"xs"} variant="outline" ><CiEdit /></IconButton>
        </HStack>
    }
    </>
  )
}

export default EditField