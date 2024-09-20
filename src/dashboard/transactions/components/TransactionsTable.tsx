import { chakra, FormatNumber, Icon, Table } from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  createColumnHelper,
  CellContext,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import Transaction from "../Transaction";

import { TbArrowBarDown, TbArrowBarUp } from "react-icons/tb";
import useAccounts from "../../../manage-banks-accounts/hooks/useAccounts";
import { Tag } from "../../../components/ui/tag";
import useCategories from "../../../categories/hooks/useCategories";
import { useIconPack } from "../../../common/hooks/useIconPack";

export type DataTableProps = {
  data: Transaction[];
};

function TransactionsTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  const iconPack = useIconPack();
  const columnHelper = createColumnHelper<Transaction>();

  const columns = useMemo<ColumnDef<Transaction, any>[]>(
    () => [
      columnHelper.accessor("transactionType", {
        header: "",
        cell: (info: CellContext<Transaction, number>) =>
          info.renderValue() === 1 ? (
            <Icon>
              <TbArrowBarDown />
            </Icon>
          ) : (
            <Icon>
              <TbArrowBarUp />
            </Icon>
          ),
      }),
      columnHelper.accessor("Name", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Description", {
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("Amount", {
        cell: (info) => info.getValue(),
        footer: (props) => (
          <FormatNumber
            value={data.reduce((total, { Amount }) => (total += Amount), 0)}
            style={"currency"}
            currency="EUR"
          />
        ),
      }),
      columnHelper.accessor("Date", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("accountId", {
        header: "Account",
        cell: (info) => accounts.find((a) => a.Id === info.getValue())?.Name,
      }),
      columnHelper.accessor("categories", {
        header: "Categories",
        cell: (info: CellContext<Transaction, number[]>) =>
          info.getValue().map((val) => {
            const cat = categories.find((c) => c.Id === val)!!;
            return (
              <Tag
                rounded={"md"}
                startElement={
                  <Icon
                    as={
                      iconPack?.find((icon) => icon.name === cat.Icon)?.icon!!
                    }
                  />
                }
              >
                {cat.Name}
              </Tag>
            );
          }),
      }),
    ],
    []
  );
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table.Root>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta: any = header.column.columnDef.meta;
              return (
                <Table.Header
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <LuChevronDown aria-label="sorted descending" />
                      ) : (
                        <LuChevronUp aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Table.Header>
              );
            })}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const meta: any = cell.column.columnDef.meta;
              return (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default TransactionsTable;
