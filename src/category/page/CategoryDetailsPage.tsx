import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import {
  Flex,
  useBreakpointValue,
  Text,
  Show,
  HStack,
  Heading,
  FormatNumber,
  Separator,
  Editable,
  Box,
} from "@chakra-ui/react";
import LoadingPage from "../../common/components/LoadingPage";
import TransactionTable from "../../transactions/components/TransactionTable";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useMonthStore from "../../common/hooks/useMonthStore";
import useInsights from "../../common/hooks/useInsights";
import { useUpdateCategory } from "../../categories/hooks/useUpdateCategory";
import { Tag } from "../../components/ui/tag";
import useCategoryStore from "../hooks/useCategoryStore";
import CategoryHeader from "../components/CategoryHeader";
import BreadCrumb from "../components/BreadCrumb";
import CategoryKpis from "../components/CategoryKpis";

const CategoryDetailsPage = () => {
  const { id } = useParams();

  const { category: cat, isLoading, error } = useCategory(+id!);
  const { category, setCategory, isValueSet } = useCategoryStore();

  useEffect(() => {
    if (cat !== undefined) setCategory(cat);
  }, [cat, setCategory]);
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isLoading || !isValueSet) return <LoadingPage />;
  if (error || !category) return <Text>No data</Text>;

  return (
    <Box>
      <CategoryHeader />
      <Box padding={{ base: "8px", md: "15px" }}>
        {!isMobile && <BreadCrumb name={category.Name} />}
        <Flex
          direction={"column"}
          gap={{ base: 2, md: 4 }}
          mt={{ base: 0, md: 4 }}
        >
          <CategoryKpis />
        </Flex>
        <TransactionTable data={category.Transactions} fromCategory size={5} />
      </Box>
    </Box>
  );
};

export default CategoryDetailsPage;
