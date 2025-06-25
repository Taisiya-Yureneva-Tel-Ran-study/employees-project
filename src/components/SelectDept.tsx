import { Button, Menu, Portal } from '@chakra-ui/react'
import employeesConfig from '../../config/employees-config.json'
import { FC, useState } from 'react'
import useEmployeeFilters from '../state-management/store'
import MotionComponent from './MotionComponent'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const SelectDept: FC = () => {
  const {department, setDepartment} = useEmployeeFilters();
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  return (
    <Menu.Root  onExitComplete={() => setIsOpen(false)} >
      <Menu.Trigger marginBottom={3} asChild width="auto">
        <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} >
          {department ? department : "Select department"}
          {isOpen ? 
            <FaChevronUp />
            : <FaChevronDown />}
        </Button>
      </Menu.Trigger>
      <Portal >
        <Menu.Positioner>
          <MotionComponent duration={0.5}>
          <Menu.Content>
            <Menu.Item key={"all"} value={"all"} onClick={() => {
                setDepartment(null); 
                setIsOpen(false);}}>
              All departments
            </Menu.Item>
            {employeesConfig.departments?.map((d) => <Menu.Item key={d} value={d} onClick={() => {
                setDepartment(d); 
                setIsOpen(false);}}>
              {d} 
            </Menu.Item>
            )}
         
          </Menu.Content>
          </MotionComponent>
        </Menu.Positioner>
      </Portal>
     </Menu.Root>
  )}

export default SelectDept