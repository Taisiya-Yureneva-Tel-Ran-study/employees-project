import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react'
import { usePagerData } from '../state-management/store'
import config from "../../config/employees-config.json"
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const EmployeePaginator = () => {
  const page = usePagerData((s) => s.page);
  const count = usePagerData((s) => s.count);
  const pageSize = config.pageSize;
  const setPage = usePagerData((s) => s.setPage);

  return (
    <div>        <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => setPage(e.page)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
    </div>
  )
}

export default EmployeePaginator