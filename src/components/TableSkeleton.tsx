import { Skeleton, SkeletonCircle, Table } from "@chakra-ui/react"
import { useAuthData } from "../state-management/store";

const TableSkeleton = () => {
    const user = useAuthData(s => s.userData);
    
    return (
        <Table.Row key="loading">
            <Table.Cell hideBelow={"md"}>
                <SkeletonCircle size="12" />
            </Table.Cell>
            <Table.Cell >
                <Skeleton height="5" />
            </Table.Cell>
            <Table.Cell >
                <Skeleton height="5" />
            </Table.Cell>
            <Table.Cell hideBelow="sm">
                <Skeleton height="5" />
            </Table.Cell>
            <Table.Cell hideBelow="md"><Skeleton height="5" /></Table.Cell>
            <Table.Cell hidden={user?.role !== "ADMIN"}>
                <Skeleton height="5" />
            </Table.Cell>

        </Table.Row>
    )
}

export default TableSkeleton