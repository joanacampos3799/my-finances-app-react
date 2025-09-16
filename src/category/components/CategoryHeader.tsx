import { Box, Flex, Show, Text, useBreakpointValue } from "@chakra-ui/react";
import { useMemo } from "react";
import TimePeriodMenu from "../../common/components/TimePeriodMenu";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useMonthlyBudget from "../hooks/useMonthlyBudget";
import MonthlyMenu from "../../common/components/MonthlyMenu";
import useMonthStore from "../../common/hooks/useMonthStore";
import NavbarMobile from "../../hero/components/NavbarMobile";
import HamburgerMenu from "../../common/components/HamburgerMenu";
import useCategoryStore from "../hooks/useCategoryStore";
import NewCategoryDrawer from "../../categories/components/NewCategoryDrawer";
import NewMonthlyBudgetDrawer from "./NewMonthlyBudgetDrawer";
const CategoryHeader = () => {
  const { period, setPeriod } = usePeriodStore();
  const { month, setMonth } = useMonthStore();
  const { category } = useCategoryStore();
  const budget = useMonthlyBudget(category.Id!, month);
  const monthlyBudget = budget ? budget.budget : undefined;

  const isMobile = useBreakpointValue({ base: true, md: false });
  const effectiveBudget = useMemo(() => {
    if (monthlyBudget != null) return monthlyBudget.budget;
    return category.Budget ?? undefined;
  }, [monthlyBudget, category.Budget]);

  return (
    <Flex
      paddingTop={{ base: "0px", md: "15px" }}
      paddingX={{ base: "0px", md: "15px" }}
      flexDirection={"row"}
      alignItems={{ base: "stretch", md: "flex-start" }}
      justifyContent="space-between"
      gap={{ base: 4, md: 0 }}
    >
      {isMobile && <NavbarMobile />}
      <Flex align="center">
        <Text fontSize="2xl" fontWeight="bold" color="teal.700">
          {category.Name}
        </Text>
      </Flex>
      {isMobile ? (
        <HamburgerMenu>
          <Flex
            direction={"column"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            <TimePeriodMenu period={period} setPeriod={setPeriod} />
            <Show when={period === "Monthly"}>
              <MonthlyMenu month={month} setMonth={setMonth} />
            </Show>
            <NewCategoryDrawer category={category} />
            <NewMonthlyBudgetDrawer
              categoryId={category.Id!!}
              budget={effectiveBudget}
              monthlyBudgetId={monthlyBudget ? monthlyBudget.id : undefined}
            />
          </Flex>
        </HamburgerMenu>
      ) : (
        <Flex
          direction={"row"}
          gap={2}
          alignItems={"flex-start"}
          justifyItems={"flex-end"}
        >
          <NewMonthlyBudgetDrawer
            categoryId={category.Id!!}
            budget={
              monthlyBudget != undefined
                ? monthlyBudget.budget
                : category.Budget
            }
            monthlyBudgetId={monthlyBudget ? monthlyBudget.id : undefined}
          />
          <NewCategoryDrawer category={category} />
          <TimePeriodMenu period={period} setPeriod={setPeriod} />
          <Show when={period === "Monthly"}>
            <MonthlyMenu month={month} setMonth={setMonth} />
          </Show>
        </Flex>
      )}
    </Flex>
  );
};

export default CategoryHeader;
