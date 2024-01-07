"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@nextui-org/react";

import { FaChevronDown, FaSearch } from "react-icons/fa";
import { apiClient } from "@/lib";
import { USER_API_ROUTES } from "@/utils";
import { BookingType } from "@/types/booking";

const statusColorMap: Record<string, ChipProps["color"]> = {
  trips: "success",
  flights: "secondary",
  hotels: "danger",
};

const columns = [
  { name: "ID", uid: "id" },
  { name: "BOOKING TYPE", uid: "bookingType" },
  { name: "NAME", uid: "name" },
  { name: "AMOUNT", uid: "totalAmount" },
  { name: "PAYMENT STATUS", uid: "isCompleted" },
  { name: "BOOKING DATE", uid: "createdAt" },
  {
    name: "BOOKING ON",
    uid: "date",
  },
];

const bookingsType = [
  { name: "Trips", uid: "trips" },
  { name: "Flights", uid: "flights" },
  { name: "Hotels", uid: "hotels" },
];
interface BookingTypeWithName extends BookingType {
  name: string;
}
export default function Bookings() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const [bookings, setBookings] = useState<BookingTypeWithName[]>([]);
  type Bookings = BookingTypeWithName;
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await apiClient.get(USER_API_ROUTES.GET_ALL_BOOKINGS);
        console.log(data.data.bookings);
        setBookings(data.data.bookings);
      } catch (error) {
        console.log({ error });
      }
    };

    getData();
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns;

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...bookings];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== bookingsType.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.bookingType)
      );
    }

    return filteredUsers;
  }, [bookings, filterValue, hasSearchFilter, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Bookings, b: Bookings) => {
      const first = a[sortDescriptor.column as keyof Bookings] as number;
      const second = b[sortDescriptor.column as keyof Bookings] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (booking: Bookings, columnKey: React.Key) => {
      const cellValue = booking[columnKey as keyof Bookings];

      switch (columnKey) {
        case "date":
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return cellValue.split("T")[0];
        case "createdAt":
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return cellValue.split("T")[0];

        case "bookingType":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[booking.bookingType]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "isCompleted":
          return (
            <Chip
              className="capitalize"
              color={cellValue ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {cellValue ? "Completed" : "Pending"}
            </Chip>
          );

        default:
          return cellValue;
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<FaSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<FaChevronDown className="text-small" />}
                  variant="flat"
                >
                  Bookings Type
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {bookingsType.map((bookingType) => (
                  <DropdownItem key={bookingType.uid} className="capitalize">
                    {bookingType.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {bookings.length} bookings
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    statusFilter,
    bookings.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <div className="p-12 min-h-[80vh]">
      <Table
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.uid} align={"start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No bookings found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
