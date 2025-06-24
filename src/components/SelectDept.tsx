import { NativeSelect } from '@chakra-ui/react'
import employeesConfig from '../../config/employees-config.json'

const SelectDept = () => {
  return (
    <NativeSelect.Root size={"md"}>
      <NativeSelect.Field placeholder="Select department">
        {employeesConfig.departments.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>)
}

export default SelectDept