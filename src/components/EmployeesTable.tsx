import { MutationFunction } from "@tanstack/react-query";
import { Avatar, Spinner, Stack, Table, Button } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { FC, useEffect } from "react";
import useEmployeesMutation from "../hooks/useEmployeesMutation";
import EditField from "./EditField";
import useEmployee from "../hooks/useEmployee";
import config from "../../config/employees-config.json"
import { useAuthData, usePagerData } from "../state-management/store";

interface Props {
  deleteFn: MutationFunction,
  updateFn: MutationFunction
}

const EmployeesTable: FC<Props> = ({ deleteFn, updateFn }) => {
  const {
    data: employees,
    error,
    isLoading,
  } = useEmployee();

  const user = useAuthData(s => s.userData);

  const page = usePagerData(s => s.page);
  const pageSize = config.pageSize;
  const setCount = usePagerData(s => s.setCount);
  const setPage = usePagerData(s => s.setPage);
// useCallback is better
  useEffect(() => {
    const count = employees?.length || 0;
      setCount(count);
    if ((page - 1) * pageSize > count) {
      setPage(1);
    }
  }, [employees]);
  
// And here it is better to use useMemo
  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize

  const visibleItems = employees?.slice(startRange, endRange)

  if (error) {
    throw error;
  }

  const mutationDel = useEmployeesMutation(deleteFn);
  const mutationUpdate = useEmployeesMutation(updateFn);

  const bg = useColorModeValue("red.500", "red.200");
  return (
    <>
      {isLoading && <Spinner />}
      <Stack
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Table.ScrollArea
          borderWidth="1px"
          rounded="md"
          height="auto"
          width={{
            base: "100vw",
            sm: "95vw",
            md: "80vw"
          }}
        >
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle" zIndex="0">
                <Table.ColumnHeader hideBelow={"md"}></Table.ColumnHeader>
                <Table.ColumnHeader >Full Name</Table.ColumnHeader>
                <Table.ColumnHeader>Department</Table.ColumnHeader>
                <Table.ColumnHeader hideBelow="sm">Salary</Table.ColumnHeader>
                <Table.ColumnHeader hideBelow="md">Birthday</Table.ColumnHeader>
                <Table.ColumnHeader ></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body zIndex="-100">
              {visibleItems?.map((empl) => (
                <Table.Row key={empl.id} >
                  <Table.Cell hideBelow={"md"}>
                    <Avatar.Root shape="full" size="lg">
                      <Avatar.Fallback name={empl.fullName} />
                      <Avatar.Image src={empl.avatar} />
                    </Avatar.Root>
                  </Table.Cell>
                  <Table.Cell >{empl.fullName}</Table.Cell>
                  <Table.Cell >
                    <EditField field={"department"} prevValue={empl.department} submitter={(data) => mutationUpdate.mutate({ id: empl.id, ...data })} />
                  </Table.Cell>
                  <Table.Cell hideBelow="sm">
                    <EditField field={"salary"} prevValue={empl.salary} submitter={(data) => mutationUpdate.mutate({ id: empl.id, ...data })} />
                  </Table.Cell>
                  <Table.Cell hideBelow="md">{empl.birthDate}</Table.Cell>
                  <Table.Cell hidden={user?.role !== "ADMIN"}>
                    <Button size="xs" background={bg} onClick={() => {
                      if (confirm("Are you sure you want to delete this employee?")) {
                        mutationDel.mutate(empl.id);}
                      }} disabled={mutationDel.isPending}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Stack>
    </>
  );
};

export default EmployeesTable;
