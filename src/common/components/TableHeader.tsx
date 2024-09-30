import { chakra, HStack, Table } from "@chakra-ui/react";
import { LuChevronDown, LuChevronsUpDown, LuChevronUp } from "react-icons/lu";

interface Props {
  label: string;
  w: string;
  isSorting: boolean;
  sortingState: "asc" | "desc" | null;
  sortFn: () => void;
}

const TableHeader = ({ label, isSorting, sortingState, sortFn, w }: Props) => {
  return (
    <Table.ColumnHeader
      w={w}
      onClick={() => {
        sortFn();
      }}
    >
      <HStack>
        {label}
        <chakra.span pl="4">
          {isSorting ? (
            sortingState === "desc" ? (
              <LuChevronDown aria-label="sorted descending" />
            ) : (
              <LuChevronUp aria-label="sorted ascending" />
            )
          ) : (
            <LuChevronsUpDown />
          )}
        </chakra.span>
      </HStack>
    </Table.ColumnHeader>
  );
};

export default TableHeader;
