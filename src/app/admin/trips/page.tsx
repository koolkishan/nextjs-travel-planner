"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
  Link,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { apiClient } from "@/lib";
import { USER_API_ROUTES } from "@/utils";
import { TripType } from "@/types/trip";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "CITIES", uid: "destinationItinerary" },
  { name: "PRICE", uid: "price", sortable: true },
  { name: "SCRAPPED ON", uid: "scrapedOn", sortable: true },
];

export default function Trips() {
  const [trips, setTrips] = useState<TripType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get(USER_API_ROUTES.GET_ALL_TRIPS);
      if (response.data.trips) setTrips(response.data.trips);
    };
    fetchData();
  }, []);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns;

  const filteredItems = React.useMemo(() => {
    let filteredUsers = trips;

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [trips, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: TripType, b: TripType) => {
      const first = a[sortDescriptor.column as keyof TripType] as number;
      const second = b[sortDescriptor.column as keyof TripType] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: TripType, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof TripType];
      function formatDateAndTime(inputDate: string) {
        const date = new Date(inputDate);
        const options = {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        } as Intl.DateTimeFormatOptions;

        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          date
        );

        return formattedDate;
      }

      switch (columnKey) {
        case "id":
          return (
            <Link href={`/trip/${cellValue}`} target="_blank">
              {cellValue as string}
            </Link>
          );
        case "url":
          return (
            <Link href={cellValue as string} target="_blank">
              {cellValue as string}
            </Link>
          );
        case "destinationItinerary": {
          const colors = [
            "primary",
            "secondary",
            "success",
            "warning",
            "danger",
          ];
          let currentIndex = 0;
          if (Array.isArray(cellValue)) {
            const itineraryValues = cellValue.slice(0, 4) as {
              place: string;
            }[];
            return (
              <div className="flex gap-2">
                {itineraryValues.map((value) => (
                  <Chip
                    key={value.place}
                    color={
                      `${colors[currentIndex++ % colors.length]}` as
                        | "primary"
                        | "secondary"
                        | "success"
                        | "warning"
                        | "danger"
                        | "default"
                    }
                  >
                    {value.place}
                  </Chip>
                ))}
              </div>
            );
          }
          return null; // Or handle the non-array case appropriately
        }

        case "scrapedOn":
          return formatDateAndTime(cellValue as string);
        case "price":
          return `₹${cellValue}`;
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
        <div className="flex justify-between gap-3 items-end bg-white p-2 rounded-2xl shadow-sm">
          <Input
            isClearable
            className="w-full"
            placeholder="Search by package id..."
            startContent={<FaSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {trips.length} trips
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, trips.length, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center ">
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
    <div className="m-5">
      {trips.length > 0 && (
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[500px] h-[500px]",
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
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No trips found"} items={sortedItems}>
            {(item: TripType) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(item, columnKey) as ReactNode}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
