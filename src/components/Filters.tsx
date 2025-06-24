import { HStack } from '@chakra-ui/react'
import React from 'react'
import AgeFilter from './AgeFilter'
import SelectDept from './SelectDept'
import SalaryFilter from './SalaryFilter'

const Filters = () => {
  return (
    <HStack>
        <AgeFilter />
        <SelectDept />
        <SalaryFilter />
    </HStack>
  )
}

export default Filters