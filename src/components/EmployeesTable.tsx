import { Image, Table } from "@chakra-ui/react"
import useEmployee from "../hooks/useEmployee";

const EmployeesTable = () => {
    const { data: items = [], error } = useEmployee();

  if (error) {
    return <div>Error loading employees.</div>;
  }

  return (
    <Table.Root size="sm" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Image</Table.ColumnHeader>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Department</Table.ColumnHeader>
          <Table.ColumnHeader>Salary</Table.ColumnHeader>
          <Table.ColumnHeader>Birthday</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <Image src={item.avatar} alt={item.fullName} boxSize="32px" borderRadius="full"/>
            </Table.Cell>
            <Table.Cell>{item.fullName}</Table.Cell>
            <Table.Cell>{item.department}</Table.Cell>
            <Table.Cell>{item.salary}</Table.Cell>
            <Table.Cell>{item.birthDate}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default EmployeesTable