import { Box, Flex, Icon, Text, Button, HStack } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import BudgetProgress from "./BudgetProgress";
import { FormatNumber } from "@chakra-ui/react";
import { FaPen } from "react-icons/fa6";
import CategoryDetails from "./CategoryDetails";
import NewCategoryDrawer from "./NewCategoryDrawer";
import useInsights from "../../common/hooks/useInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useMonthStore from "../../common/hooks/useMonthStore";
import { timePeriods } from "../../common/constants";
import { useIconPack } from "../../common/hooks/useIconPack";
import Category from "../model/Category";

interface Props {
  category: Category;
  onDelete: (category: Category) => void;
}
const CategoryCard = ({ category, onDelete }: Props) => {
  const { period } = usePeriodStore();
  const { month } = useMonthStore();
  const iconPack = useIconPack();
  const { getTransactionsTotalAmount, getTransactionsTotal } = useInsights();

  const totalAmount = getTransactionsTotalAmount(category.Transactions, period);
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
  const budgetValue = category.Budget
    ? category.Budget * timePeriods.find((t) => t.name === period)!!.period
    : 0;
  const CatIcon =
    iconPack?.find((i) => i.name === category.Icon)?.icon ?? FaPen;
  return (
    <Box bg="white" borderRadius="md" boxShadow="sm" p={3} mb={3} w="full">
      <Flex align="center" mb={2} gap={2}>
        <Icon color={category.Color}>
          <CatIcon />
        </Icon>
        <Text fontWeight="bold" fontSize="lg">
          {category.Name}
        </Text>
        <HStack ml="auto">
          <CategoryDetails
            category={category}
            total={totalAmount}
            totalExpense={totalExpense}
            totalIncome={totalIncome}
          />
          <NewCategoryDrawer category={category} />
          <Button
            h="32px"
            w="32px"
            bgColor="red.500"
            disabled={category.isSalary}
            onClick={() => onDelete(category)}
          >
            <LuTrash2 />
          </Button>
        </HStack>
      </Flex>
      <Flex direction="column" gap={1}>
        <Text fontSize="sm">
          <b>Total:</b>{" "}
          <FormatNumber value={totalAmount} style="currency" currency="EUR" />
        </Text>

        <Text fontSize="sm">
          <b>#Transactions:</b> {category.Transactions?.length ?? 0}
        </Text>
        {category.CategoryType === 0 && (
          <>
            <Text fontSize="sm">
              <b>Budget:</b>{" "}
              {!!(category.Budget && category.Budget > 0 && budgetValue > 0) ? (
                <FormatNumber
                  value={budgetValue}
                  style="currency"
                  currency="EUR"
                />
              ) : (
                "N/A"
              )}
            </Text>
            {!!(category.Budget && category.Budget > 0 && budgetValue > 0) && (
              <BudgetProgress budget={budgetValue} spent={totalAmount} />
            )}
          </>
        )}
      </Flex>
    </Box>
  );
};
export default CategoryCard;
