import EmployeesTable from '../components/EmployeesTable'
import apiClient from '../services/ApiClientJsonServer'
import { Updater } from '../services/ApiClient'
import { Stack } from '@chakra-ui/react'
import Filters from '../components/Filters'
import { FC } from 'react'
import EmployeePaginator from '../components/EmployeePaginator'
import { SearchObject } from '../model/dto-types'
import useEmployeeFilters, { useAuthData } from '../state-management/store'
import _ from 'lodash'

const HomePage: FC = () => {
    const userData = useAuthData(s => s.userData);
   const {department, salaryFrom, salaryTo, ageFrom, ageTo} = useEmployeeFilters();
   let searchObj: SearchObject | undefined = {};
     department && (searchObj.department = department);
     salaryFrom && (searchObj.minSalary = salaryFrom);
     salaryTo && (searchObj.maxSalary = salaryTo);
     ageFrom && (searchObj.minAge = ageFrom);
     ageTo && (searchObj.maxAge = ageTo);
     if (_.isEmpty(searchObj)) {
       searchObj = undefined
     }
     const queryKey: any[] = ["employees"]
     searchObj && queryKey.push(searchObj)

  return (
    <>
    { !!userData &&
    <Stack>
      <Filters />
      <EmployeesTable deleteFn={(id)=>apiClient.deleteEmployee(id as string)}
          updateFn={(updater) => 
            apiClient.updateEmployee(updater as Updater)
          }
          getFn={() => {
            return apiClient.getAll(searchObj);
          }
          }
          queryKey={queryKey}
      />
      <EmployeePaginator />
    </Stack>
}</>)}


export default HomePage