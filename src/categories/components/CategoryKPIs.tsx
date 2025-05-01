import Category from "../model/Category";
import DonutChart from "../../common/components/DonutChart";
import { Flex } from "@chakra-ui/react";
import { movementTypes } from "../../common/constants";
import useInsights from "../../common/hooks/useInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";

interface Props {
  data: Category[];
}
const CategoryKPIs = ({ data }: Props) => {
  const { period } = usePeriodStore();
  const { getTransactionsTotalAmount } = useInsights();

  const getChartData = (filtered: Category[], type: number) => {
    return filtered.map((f) => ({
      label: f.Name,
      value: getTransactionsTotalAmount(f.Transactions, period, type),
      color: f.Color,
    }));
  };

  return (
    <Flex px="10px" direction={"row"} gap={2} justifyContent={"center"} pt={1}>
      {movementTypes.map((catType) => (
        <DonutChart
          key={catType.id + "-kpi"}
          data={getChartData(
            data.filter((f) => f.CategoryType === catType.id),
            catType.id
          )}
          caption={catType.name}
        />
      ))}
    </Flex>
  );
};

export default CategoryKPIs;
