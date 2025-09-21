import { HStack, Icon, Show, Table } from "@chakra-ui/react";
import { LuSearch, LuTrash2 } from "react-icons/lu";
import { Button } from "../../components/ui/button";
import BudgetProgress from "./BudgetProgress";
import { FormatNumber } from "@chakra-ui/react";
import { timePeriods } from "../../common/constants";
import { useIconPack } from "../../common/hooks/useIconPack";
import Category from "../model/Category";
import NewCategoryDrawer from "./NewCategoryDrawer";
import useInsights from "../../common/hooks/useInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import { FaPen } from "react-icons/fa6";
import useMonthStore from "../../common/hooks/useMonthStore";
import { LinkButton } from "../../components/ui/link-button";
import useMonthlyBudget from "../../category/hooks/useMonthlyBudget";
import { useMemo } from "react";

interface CategoryRowProps {
  category: Category;

  onDelete: (category: any) => void;
}

const CategoryRow = ({ category, onDelete }: CategoryRowProps) => {
  const { period } = usePeriodStore();
  const { month } = useMonthStore();
  const iconPack = useIconPack();
  const budget = useMonthlyBudget(category.Id!, month);
  const monthlyBudget = budget.budget ? budget.budget : undefined;
  const { getTransactionsTotalAmount, getTransactionsTotal } = useInsights();
  const totalAmount = getTransactionsTotalAmount(
    category.Transactions,
    period,
    month
  );

  const totalExpense = getTransactionsTotalAmount(
    category.Transactions,
    period,
    month,
    0
  );
  const totalIncome = getTransactionsTotalAmount(
    category.Transactions,
    period,
    month,
    1
  );
  const budgetValue = useMemo(() => {
    if (monthlyBudget != null && period === "Monthly")
      return monthlyBudget.budget;
    return category.Budget
      ? category.Budget * timePeriods.find((t) => t.name === period)!!.period
      : undefined;
  }, [monthlyBudget, category.Budget]);

  const CatIcon =
    iconPack?.find((i) => i.name === category.Icon)?.icon ?? FaPen;

  return (
    <Table.Row key={category.Id + "-row"}>
      <Table.Cell w="150px">
        <HStack>
          <Icon color={category.Color}>
            <CatIcon />
          </Icon>
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
        {getTransactionsTotal(category.Transactions, period, month)}
      </Table.Cell>
      <Show when={category.CategoryType === 0}>
        <Table.Cell>
          {budgetValue != undefined ? (
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
          {budgetValue != undefined ? (
            <BudgetProgress budget={budgetValue} spent={totalAmount} />
          ) : (
            "N/A"
          )}
        </Table.Cell>
      </Show>

      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
          <LinkButton
            href={"/s/categories/" + category.Id}
            h="40px"
            w="40px"
            variant={"outline"}
            colorPalette={"teal"}
            borderColor={"teal.500"}
            borderRadius={"md"}
          >
            <LuSearch />
          </LinkButton>
          <NewCategoryDrawer category={category} />
          <Button
            h="40px"
            w="40px"
            bgColor="red.500"
            disabled={category.isSalary}
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
