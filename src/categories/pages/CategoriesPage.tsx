import { Box, Flex, HStack, Icon, Tabs } from "@chakra-ui/react";
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

const CategoriesPage = React.memo(() => {
  const categories = useCategories();
  const { period, setPeriod } = usePeriodStore();

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
                {movementTypes.map((ct) => (
                  <Tabs.Trigger key={ct.id + "-movTypesTab"} value={ct.name}>
                    <Icon color={"teal.500"}>{ct.MovementIcon}</Icon>
                    {ct.name}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {/* Align the ExportDrawer button trigger here */}
            </Flex>

            {/* Render Tabs content */}
            {movementTypes.map((ct) => (
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
