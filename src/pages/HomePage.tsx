import EmployeesTable from '../components/EmployeesTable'
import apiClient from '../services/ApiClientJsonServer'
import { Updater } from '../services/ApiClient'
import { Stack } from '@chakra-ui/react'
import Filters from '../components/Filters'

const HomePage = () => {
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