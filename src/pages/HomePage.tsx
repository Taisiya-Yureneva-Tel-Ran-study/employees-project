import EmployeesTable from '../components/EmployeesTable'
import apiClient from '../services/ApiClientJsonServer'
import { Updater } from '../services/ApiClient'
import { Stack } from '@chakra-ui/react'
import Filters from '../components/Filters'
import { FC } from 'react'
import EmployeePaginator from '../components/EmployeePaginator'
import { SearchObject } from '../model/dto-types'

const HomePage: FC = () => {
  return (
    
    <Stack>
      <Filters />
      <EmployeesTable deleteFn={(id)=>apiClient.deleteEmployee(id as string)}
          updateFn={(updater) => 
            apiClient.updateEmployee(updater as Updater)
          }
          getFn={(qryKey) => {
            const searchObject = qryKey.queryKey[1] as SearchObject;
            return apiClient.getAll(searchObject as SearchObject);
          }
          }
      />
      <EmployeePaginator />
    </Stack>
  )
}

export default HomePage