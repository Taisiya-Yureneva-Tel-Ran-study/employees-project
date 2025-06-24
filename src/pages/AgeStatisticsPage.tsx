import Statistics from "../components/Statistics"
import { getAge } from "../util/functions"
import useEmployee from "../hooks/useEmployee"

const AgeStatisticsPage = () => {
 const {data: employees} = useEmployee();
 
   return (
    <Statistics numbers={employees?.map(e => getAge(e.birthDate)) || []} 
      interval={5} label={'Age'} />
   )
 }

export default AgeStatisticsPage