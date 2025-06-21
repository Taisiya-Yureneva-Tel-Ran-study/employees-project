import { useQuery } from '@tanstack/react-query'
import { Employee } from '../model/dto-types'
import { AxiosError } from 'axios'
import apiClient from '../services/ApiClientJsonServer'
import Statistics from '../components/Statistics'

const AgeStatisticsPage = () => {
  const {data: employees} = useQuery<Employee[], AxiosError>(
    {
      queryKey: ['employees'],
      queryFn: () => apiClient.getAll(),
      staleTime: 1000 * 60 * 60
    }
  )
  
  return (
    <Statistics numbers={employees?.map((e) => {
      const age = new Date(Date.now()).getFullYear() - new Date(e.birthDate).getFullYear();
      return age; 
})} interval={1} label='Age'/>
  )}

export default AgeStatisticsPage