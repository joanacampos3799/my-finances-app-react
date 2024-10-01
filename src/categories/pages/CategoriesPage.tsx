import { Box, Flex, HStack, Icon, Tabs } from "@chakra-ui/react";
import CategoriesList from "../components/CategoriesList";
import NewCategoryDrawer from "../components/NewCategoryDrawer";
import useCategories from "../hooks/useCategories";
import { useMutationState } from "@tanstack/react-query";
import { movementTypes, queryKeys, timePeriods } from "../../common/constants";
import { HelperEntity } from "../../common/helper";
import RadioMenu from "../../common/components/RadioMenu";
import { useState } from "react";
import CategoryKPIs from "../components/CategoryKPIs";
import CategoryEmptyState from "../components/CategoryEmptyState";
import Category from "../model/Category";
import CollapsibleTitle from "../components/CollapsibleTitle";
import ExportDrawer from "../components/ExportDrawer";
const CategoriesPage = () => {
  const categories = useCategories();
  const [period, setPeriod] = useState("0");

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
    <Box padding={"5px"}>
      <Box>
        <HStack
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          justifyItems={"flex-end"}
        >
          <CollapsibleTitle />
          <Flex
            direction={"row"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            <RadioMenu
              color
              width="fit-content"
              data={timePeriods}
              selectedId={period}
              setSelectedId={setPeriod}
              hasArrow
            />
            <ExportDrawer period={period} />
            <NewCategoryDrawer />
          </Flex>
        </HStack>

        <CategoryKPIs period={timePeriods[+period].name} data={catData} />
      </Box>

      {!catData || catCount === 0 ? (
        <CategoryEmptyState keyname={"mainEmpty"} />
      ) : (
        <Tabs.Root
          defaultValue={"Expenses"}
          justify={"end"}
          colorPalette={"teal"}
        >
          <Tabs.List width={"full"} border={0}>
            {movementTypes.map((ct) => (
              <Tabs.Trigger key={ct.id + "-movTypesTab"} value={ct.name}>
                <Icon color={"teal.500"} as={ct.icon!!} />
                {ct.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {movementTypes.map((ct) => (
            <Tabs.Content key={ct.name + "-contentTab"} value={ct.name}>
              <CategoriesList
                key={ct.name + "-grid"}
                categories={catData.filter((c) => c.CategoryType === ct.id)}
                period={timePeriods[+period].name}
                categoryTypeId={ct.id}
              />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      )}
    </Box>
  );
};

export default CategoriesPage;
