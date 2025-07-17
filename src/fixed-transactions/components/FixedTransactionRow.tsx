import FixedTransactionList from "../model/FixedTransactionsList";
import { Button, FormatNumber, HStack, Icon, Table } from "@chakra-ui/react";
import { useIconPack } from "../../common/hooks/useIconPack";
import { FaPen } from "react-icons/fa6";
import NewFixedTransactionDrawer from "./NewFixedTransactionDrawer";
import FixedTransactionDetails from "./FixedTransactionDetails";
import { LuArchiveRestore, LuTrash2 } from "react-icons/lu";
import CategoryTag from "../../common/components/CategoryTag";
import { movementTypes } from "../../common/constants";

interface Props {
  fixed: FixedTransactionList;
  onDelete: (fixed: FixedTransactionList) => void;
}

const FixedTransactionRow = ({ fixed, onDelete }: Props) => {
  const iconPack = useIconPack();
  const FxIcon = iconPack?.find((i) => i.name === fixed.Icon)?.icon ?? FaPen;
  return (
    <Table.Row>
      <Table.Cell w="150px">
        <HStack>
          <Icon color="teal.500">
            <FxIcon />
          </Icon>
          {fixed.Name}
        </HStack>
      </Table.Cell>
      <Table.Cell w="150px">
        <FormatNumber value={fixed.Amount} style={"currency"} currency="EUR" />
      </Table.Cell>
      <Table.Cell w="150px">
        <HStack>
          {movementTypes[fixed.transactionType].MovementIcon}{" "}
          {movementTypes[fixed.transactionType].name}
        </HStack>
      </Table.Cell>
      <Table.Cell>
        <CategoryTag
          category={fixed.category}
          key={fixed.category.Id + "-cat_tag"}
        />
      </Table.Cell>
      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
          <FixedTransactionDetails id={fixed.Id!!} />
          <NewFixedTransactionDrawer fixedTransaction={fixed} />
          <Button
            h="40px"
            w="40px"
            bgColor="red.500"
            onClick={() => onDelete(fixed)}
          >
            {fixed.active ? <LuTrash2 /> : <LuArchiveRestore />}
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

export default FixedTransactionRow;
