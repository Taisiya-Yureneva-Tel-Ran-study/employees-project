import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import { Avatar, Stack, Table } from "@chakra-ui/react";
import { FC, useEffect, useMemo } from "react";
import useEmployeesMutation from "../hooks/useEmployeesMutation";
import EditField from "./EditField";
import config from "../../config/employees-config.json"
import { useAuthData, usePagerData } from "../state-management/store";
import AlertDialog from "./AlertDialog";
import TableSkeleton from "./TableSkeleton";
import { Employee } from "../model/dto-types";
import useEmployeesQuery from "../hooks/useEmployeesQuery";

interface Props {
  deleteFn: MutationFunction,
  updateFn: MutationFunction,
  getFn:    QueryFunction<Employee[]>,
  queryKey: any[]
}

const EmployeesTable: FC<Props> = ({ deleteFn, updateFn, getFn, queryKey }) => {
  const {
    data: employees,
    isLoading,
  } = useEmployeesQuery(queryKey, getFn);

  const user = useAuthData(s => s.userData);

  const page = usePagerData(s => s.page);
  const pageSize = config.pageSize;
  const setCount = usePagerData(s => s.setCount);
  const setPage = usePagerData(s => s.setPage);

  useEffect(() => {
    const count = employees?.length || 0;
    setCount(count);
    if ((page - 1) * pageSize > count) {
      setPage(1);
    }
  }, [employees]);

  const {startRange, endRange} = useMemo(() => {
    const startRange = (page - 1) * pageSize;
    const endRange = startRange + pageSize;
    return {startRange, endRange}
  }, [page])

  const visibleItems = employees?.slice(startRange, endRange)

  const mutationDel = useEmployeesMutation(deleteFn);
  const mutationUpdate = useEmployeesMutation(updateFn);

  return (
    <>
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
              {isLoading && <TableSkeleton />}
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
                    <AlertDialog mutationDel={mutationDel} empl={empl} />
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
