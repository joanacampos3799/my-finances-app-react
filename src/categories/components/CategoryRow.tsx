import { HStack, Icon, Show, Table } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { Button } from "../../components/ui/button";
import BudgetProgress from "./BudgetProgress";
import { FormatNumber } from "@chakra-ui/react";
import { timePeriods } from "../../common/constants";
import { useIconPack } from "../../common/hooks/useIconPack";
import Category from "../model/Category";
import NewCategoryDrawer from "./NewCategoryDrawer";
import CategoryDetails from "./CategoryDetails";
import useInsights from "../../common/hooks/useInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";

interface CategoryRowProps {
  category: Category;

  onDelete: (category: any) => void;
}

const CategoryRow = ({ category, onDelete }: CategoryRowProps) => {
  const { period } = usePeriodStore();
  const iconPack = useIconPack();
  const { getTransactionsTotalAmount, getTransactionsTotal } = useInsights();
  const totalAmount = getTransactionsTotalAmount(category.Transactions, period);

  const totalExpense = getTransactionsTotalAmount(
    category.Transactions,
    period,
    0
  );
  const totalIncome = getTransactionsTotalAmount(
    category.Transactions,
    period,
    1
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
      <Show when={category.CategoryType !== 2}>
        <Table.Cell>
          <FormatNumber value={totalAmount} style={"currency"} currency="EUR" />
        </Table.Cell>
      </Show>
      <Show when={category.CategoryType === 2}>
        <Table.Cell>
          <FormatNumber
            value={totalExpense}
            style={"currency"}
            currency="EUR"
          />
        </Table.Cell>
        <Table.Cell>
          <FormatNumber value={totalIncome} style={"currency"} currency="EUR" />
        </Table.Cell>
        <Table.Cell>
          <FormatNumber value={totalAmount} style={"currency"} currency="EUR" />
        </Table.Cell>
      </Show>
      <Table.Cell>
        {getTransactionsTotal(category.Transactions, period)}
      </Table.Cell>
      <Show when={category.CategoryType === 0}>
        <Table.Cell>
          {category.Budget ? (
            <FormatNumber
              value={budgetValue}
              style={"currency"}
              currency="EUR"
            />
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
      </Show>

      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
          <CategoryDetails
            category={category}
            total={totalAmount}
            totalExpense={totalExpense}
            totalIncome={totalIncome}
          />
          <NewCategoryDrawer category={category} />
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
