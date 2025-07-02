import EmployeesTable from '../components/EmployeesTable'
import apiClient from '../services/ApiClientJsonServer'
import { Updater } from '../services/ApiClient'
import { Stack } from '@chakra-ui/react'
import Filters from '../components/Filters'
import { FC } from 'react'
import { useAuthData } from '../state-management/store'

const HomePage: FC = () => {
  const userData = useAuthData(s => s.userData);
  return (
    
    <Stack>
      <Filters />
      <EmployeesTable deleteFn={(id)=>apiClient.deleteEmployee(id as string)}
          updateFn={(updater) => 
            apiClient.updateEmployee(updater as Updater)
          }
      ></EmployeesTable>
    </Stack>
  )
}

export default HomePage