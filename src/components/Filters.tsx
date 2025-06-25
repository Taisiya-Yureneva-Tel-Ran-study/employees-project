import { Stack } from '@chakra-ui/react'
import AgeFilter from './AgeFilter'
import SelectDept from './SelectDept'
import SalaryFilter from './SalaryFilter'

const Filters = () => {
  return (
    <Stack justifyContent={"space-between"} direction={{ base: "column", md: "row"}}
           width={{
                base:"100vw",
                sm:"95vw",
                md:"80vw"
              }}
              alignSelf={"center"}
    >
        <SelectDept />
        <AgeFilter />
        <SalaryFilter />
    </Stack>
  )
}

export default Filters