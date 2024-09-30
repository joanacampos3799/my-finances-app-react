import { HStack, Icon, Table } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { Button } from "../../components/ui/button";
import BudgetProgress from "./BudgetProgress";
import { FormatNumber } from "@chakra-ui/react";
import { timePeriods } from "../../common/constants";
import { useIconPack } from "../../common/hooks/useIconPack";
import Category from "../model/Category";
import Transaction from "../../transactions/model/Transaction";

interface CategoryRowProps {
  category: Category;
  period: string;

  getTransactionsTotalAmount: (
    transactions: Transaction[],
    period: string,
    categoryType: number
  ) => number;
  onDelete: (category: any) => void;
}

const CategoryRow = ({
  category,
  period,
  getTransactionsTotalAmount,
  onDelete,
}: CategoryRowProps) => {
  const iconPack = useIconPack();
  const totalAmount = getTransactionsTotalAmount(
    category.Transactions,
    period,
    category.CategoryType
  );
  const budgetValue = category.Budget
    ? category.Budget * timePeriods.find((t) => t.name === period)!!.period
    : 0;

  return (
    <Table.Row key={category.Id + "-row"}>
      <Table.Cell w="150px">
        <HStack>
          <Icon
            as={iconPack?.find((i) => i.name === category.Icon)?.icon}
            color={category.Color}
          />
          {category.Name}
        </HStack>
      </Table.Cell>
      <Table.Cell>
        <FormatNumber value={totalAmount} style={"currency"} currency="EUR" />
      </Table.Cell>
      <Table.Cell>
        {category.Budget ? (
          <FormatNumber value={budgetValue} style={"currency"} currency="EUR" />
        ) : (
          "N/A"
        )}
      </Table.Cell>
      <Table.Cell w="200px">
        {category.Budget ? (
          <BudgetProgress budget={budgetValue} spent={totalAmount} />
        ) : (
          "N/A"
        )}
      </Table.Cell>
      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
          <Button
            h="40px"
            w="40px"
            bgColor="red.500"
            onClick={() => onDelete(category)}
          >
            <LuTrash2 />
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

export default CategoryRow;
