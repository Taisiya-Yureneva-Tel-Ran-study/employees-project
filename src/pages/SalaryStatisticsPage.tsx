import Statistics from '../components/Statistics'
import useEmployee from '../hooks/useEmployee'

const SalaryStatisticsPage = () => {
  const {data: employees} = useEmployee();

  return (
    <Statistics numbers={employees?.map(e => e.salary) || []} 
      interval={1000} label={'Salary'} />
  )
}

export default SalaryStatisticsPage