import Statistics from '../components/Statistics'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import apiClient from '../services/ApiClientJsonServer'
import { Employee } from '../model/dto-types'

const SalaryStatisticsPage = () => {
  const {data: employees} = useQuery<Employee[], AxiosError>(
    {
      queryKey: ['employees'],
      queryFn: () => apiClient.getAll(),
      staleTime: 1000 * 60 * 60
    }
  )
  
  return (
    <Statistics numbers={employees?.map((e) => e.salary || [])} interval={1000} label='Salary'/>
  )
}

export default SalaryStatisticsPage