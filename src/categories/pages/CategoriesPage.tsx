import { Box, Flex, HStack, Icon, Show, Tabs } from "@chakra-ui/react";
import CategoriesList from "../components/CategoriesList";
import NewCategoryDrawer from "../components/NewCategoryDrawer";
import useCategories from "../hooks/useCategories";
import { useMutationState } from "@tanstack/react-query";
import { movementTypes, queryKeys } from "../../common/constants";
import { HelperEntity } from "../../common/helper";
import CategoryKPIs from "../components/CategoryKPIs";
import CategoryEmptyState from "../components/CategoryEmptyState";
import Category from "../model/Category";
import CollapsibleTitle from "../../common/components/CollapsibleTitle";
import ExportDrawer from "../components/ExportDrawer";
import TimePeriodMenu from "../../common/components/TimePeriodMenu";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import React from "react";
import LoadingPage from "../../common/components/LoadingPage";
import useMonthStore from "../../common/hooks/useMonthStore";
import MonthlyMenu from "../../common/components/MonthlyMenu";

const CategoriesPage = React.memo(() => {
  const { categories, isLoading } = useCategories();
  const { period, setPeriod } = usePeriodStore();
  const { month, setMonth } = useMonthStore();
  const pendingData = useMutationState({
    filters: {
      mutationKey: [queryKeys.categories],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as Category;
    },
  });
  const pendingCat = pendingData ? pendingData[0] : null;
  let catData = categories.data;
  let catCount = categories.count;

  const helper = new HelperEntity<Category>();
  if (pendingCat) {
    const { tCount, tData } = helper.getPendingData(categories, pendingCat);
    catData = tData;
    catCount = tCount;
  }
  if (isLoading || !categories.isValueSet) return <LoadingPage />;
  return (
    <Box padding={"15px"}>
      <Box>
        <HStack
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          justifyItems={"flex-end"}
        >
          <CollapsibleTitle
            title={"Categories"}
            description={
              " Welcome to the Categories Page, where you can easily manage your finances by organizing your transactions into meaningful categories."
            }
          />
          <Flex
            direction={"row"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            <TimePeriodMenu period={period} setPeriod={setPeriod} />
            <Show when={period === "Monthly"}>
              <MonthlyMenu month={month} setMonth={setMonth} />
            </Show>
            <NewCategoryDrawer />
          </Flex>
        </HStack>

        <CategoryKPIs data={catData} />
      </Box>

      {!catData || catCount === 0 ? (
        <CategoryEmptyState keyname={"mainEmpty"} />
      ) : (
        <Box>
          <Tabs.Root
            defaultValue={"Expenses"}
            justify={"end"}
            colorPalette={"teal"}
          >
            {/* Wrap Tabs and ExportDrawer in an HStack or Flex for alignment */}
            <Flex justify="space-between" mt={2}>
              <ExportDrawer />
              <Tabs.List width={"full"} border={0}>
                {movementTypes
                  .filter((mt) => mt.id !== 2)
                  .map((ct) => (
                    <Tabs.Trigger key={ct.id + "-movTypesTab"} value={ct.name}>
                      <Icon color={"teal.500"}>{ct.MovementIcon}</Icon>
                      {ct.name}
                    </Tabs.Trigger>
                  ))}
              </Tabs.List>
            </Flex>

            {/* Render Tabs content */}
            {movementTypes
              .filter((mt) => mt.id !== 2)
              .map((ct) => (
                <Tabs.Content key={ct.name + "-contentTab"} value={ct.name}>
                  <CategoriesList
                    key={ct.name + "-grid"}
                    categories={catData.filter((c) => c.CategoryType === ct.id)}
                    categoryTypeId={ct.id}
                  />
                </Tabs.Content>
              ))}
          </Tabs.Root>
        </Box>
      )}
    </Box>
  );
});

export default CategoriesPage;
