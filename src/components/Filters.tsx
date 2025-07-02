import { Stack } from '@chakra-ui/react'
import AgeFilter from './AgeFilter'
import SelectDept from './SelectDept'
import SalaryFilter from './SalaryFilter'
import { FC } from 'react'
import { useAuthData } from '../state-management/store'

const Filters: FC = () => {
  const userData = useAuthData(s => s.userData);
  return (
    <Stack justifyContent={"space-between"} direction={{ base: "column", md: "row"}}
           width={{
                base:"100vw",
                sm:"95vw",
                md:"80vw"
              }}
              alignSelf={"center"}
              hidden={!userData}
    >
        <SelectDept />
        <AgeFilter />
        <SalaryFilter />
    </Stack>
  )
}

export default Filters