import React, { useMemo, useState } from "react";
import useCategoryStore from "../hooks/useCategoryStore";
import {
  Editable,
  Flex,
  FormatNumber,
  Heading,
  HStack,
  Separator,
  Show,
  Text,
} from "@chakra-ui/react";
import { Tag } from "../../components/ui/tag";
import useInsights from "../../common/hooks/useInsights";
import { useUpdateCategory } from "../../categories/hooks/useUpdateCategory";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useMonthStore from "../../common/hooks/useMonthStore";
import BarChartComponent from "../../common/components/BarChartComponent";
import useDateFilter from "../../common/hooks/useDateFilter";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import NewMonthlyBudgetDrawer from "./NewMonthlyBudgetDrawer";
import useMonthlyBudget from "../hooks/useMonthlyBudget";
import BudgetProgress from "../../categories/components/BudgetProgress";

const CategoryKpis = () => {
  const { category } = useCategoryStore();
  const {
    getTransactionsAverageAmount,
    budgetInsight,
    spendingTrendInsight,
    getTransactionsTotalAmount,
  } = useInsights();

  const { period } = usePeriodStore();
  const { month } = useMonthStore();
  const { parseDate, getStartEndDates } = useDateFilter();
  const budget = useMonthlyBudget(category.Id!, month);
  const monthlyBudget = budget.budget ? budget.budget : undefined;
  const { endDate } = useMemo(
    () => getStartEndDates(period, month),
    [getStartEndDates, period, month]
  );
  const total = getTransactionsTotalAmount(category.Transactions, period);
  const lastSixMonthsData = useMemo(() => {
    // Use endDate as the anchor (selected month end)
    const base = endOfMonth(endDate);
    return Array.from({ length: 6 }).map((_, i) => {
      // Oldest -> Newest
      const ref = subMonths(base, 5 - i);
      const mStart = startOfMonth(ref);
      const mEnd = endOfMonth(ref);
      if (category.CategoryType == 0) {
        const spent =
          category.Transactions?.filter((t) => {
            const d = parseDate(t.Date);
            return d >= mStart && d <= mEnd && t.transactionType === 0; // expenses only
          })
            .map((t) => t.Amount)
            .reduce((acc, v) => acc + v, 0) ?? 0;

        return {
          month: format(ref, "LLL yy"),
          Spent: spent,
        };
      } else {
        const earned =
          category.Transactions?.filter((t) => {
            const d = parseDate(t.Date);
            return d >= mStart && d <= mEnd && t.transactionType === 1; // income only
          })
            .map((t) => t.Amount)
            .reduce((acc, v) => acc + v, 0) ?? 0;

        return {
          month: format(ref, "LLL yy"),
          Earned: earned,
        };
      }
    });
  }, [category.Transactions, endDate, parseDate]);

  const effectiveBudget = useMemo(() => {
    if (monthlyBudget != null) return monthlyBudget.budget;
    return category.Budget ?? undefined;
  }, [monthlyBudget, category.Budget]);

  return (
    <Flex direction={"column"} gap={5} mb={5}>
      <Flex direction={"row"} gap={10}>
        <Show when={category.Budget}>
          <HStack>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Budget Amount{" "}
            </Heading>
            <FormatNumber
              value={category.Budget!!}
              style="currency"
              currency="Eur"
            />
          </HStack>
        </Show>
        <HStack>
          <Show when={category.CategoryType !== 1}>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Total Spending
            </Heading>
            <FormatNumber value={total} style="currency" currency="Eur" />
          </Show>
          <Show when={category.CategoryType !== 0}>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Total Income
            </Heading>
            <FormatNumber value={total} style="currency" currency="Eur" />
          </Show>
        </HStack>
        <Show when={category.Budget}>
          <HStack>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Budget Status
            </Heading>
            <Tag
              variant="subtle"
              colorPalette={total > category.Budget!! ? "red" : "green"}
            >
              {total > category.Budget!! ? "Over Budget" : "Within Budget"}
            </Tag>
          </HStack>
        </Show>
        <HStack>
          <Heading color={"teal.700"} size="sm">
            Total Transactions
          </Heading>
          {category.Transactions.length}
        </HStack>
        <HStack>
          <Heading color={"teal.700"} size="sm">
            Average Transaction Amount
          </Heading>

          <FormatNumber
            value={getTransactionsAverageAmount(category.Transactions)}
            style="currency"
            currency="Eur"
          />
        </HStack>
      </Flex>

      <Show when={category.CategoryType === 0}>
        <Flex direction={"column"} mt={3} gap={3}>
          <Separator />
          {effectiveBudget ? (
            <Flex direction={"column"} gap={2}>
              <Heading color={"teal.700"} size="sm">
                Budget Progress
              </Heading>
              <BudgetProgress budget={effectiveBudget} spent={total} />
            </Flex>
          ) : (
            <Text>
              No budget set for this category. Set a budget for this month in
              the button above.
            </Text>
          )}
          <Text>
            {spendingTrendInsight(category.Transactions, period, month)}
          </Text>
        </Flex>
      </Show>

      <Flex direction={{ base: "column", md: "row" }} gap={2} mx={"10px"}>
        <Flex width={"100%"} bgColor={"white"} borderRadius={"md"}>
          <BarChartComponent
            chartData={lastSixMonthsData}
            xAxisDataKey="month"
            data={[
              {
                dataKey: category.CategoryType === 0 ? "Spent" : "Earned",
                label:
                  category.CategoryType === 0
                    ? "Total Expenses"
                    : "Total Income",
              },
            ]}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CategoryKpis;
