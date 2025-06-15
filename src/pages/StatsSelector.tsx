import { Button, Menu, Portal } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MotionComponent from "../components/MotionComponent";
import { NavLink, useLocation } from "react-router-dom";

const StatsSelector: React.FC = () => {
    // TODO: use isLoading
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const isActive = location.pathname.includes("statistics");
 
  return (
    
    <Menu.Root  onExitComplete={() => setIsOpen(false)} >
      <Menu.Trigger marginBottom={3} asChild >
        <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} fontWeight={isActive ? "bold" : "normal"}>
          Statistics
          {isOpen ? 
            <FaChevronUp />
            : <FaChevronDown />}
        </Button>
      </Menu.Trigger>
      <Portal >
        <Menu.Positioner>
          <MotionComponent duration={0.5}>
          <Menu.Content>
            <Menu.Item onClick={() => setIsOpen(false)} value="age">
              <NavLink to={"/statistics/age"}>Age</NavLink> 
            </Menu.Item>
            <Menu.Item onClick={() => setIsOpen(false)} value="age">
              <NavLink to={"/statistics/salary"}>Salary</NavLink> 
            </Menu.Item>
            <Menu.Item onClick={() => setIsOpen(false)} value="age">
              <NavLink to={"/statistics/department"}>Dept</NavLink> 
            </Menu.Item>
          
         
          </Menu.Content>
          </MotionComponent>
        </Menu.Positioner>
      </Portal>
     </Menu.Root>
  )}

export default StatsSelector;
