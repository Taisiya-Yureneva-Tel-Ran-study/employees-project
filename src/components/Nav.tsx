import { HStack, Text } from '@chakra-ui/react'
import { NavLink as RouterLink } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'
import StatisticsSelector from '../pages/StatisticsSelector'
import { FC } from 'react'
import { useAuthData } from '../state-management/store'

const Nav: FC = () => {
  const userData = useAuthData(s => s.userData);

  return (
    <HStack justifyContent={"space-between"} marginLeft={"4vw"}>
      {userData ? <>
        <Text>{userData.email}</Text>
        <RouterLink to="/"> <Text>Home</Text></RouterLink>
        <StatisticsSelector></StatisticsSelector>
        <RouterLink to="/logout"> <Text>LogOut</Text></RouterLink>

        {userData.role === "ADMIN" ?
          <RouterLink to="/add"> <Text>Add Employee</Text></RouterLink>
          : <></>}
      </> :
        <RouterLink to="/login"> <Text>Login</Text></RouterLink>
      }
      <ColorModeButton></ColorModeButton>
    </HStack>
  )
}

export default Nav