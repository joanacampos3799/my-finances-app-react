import Category from "../model/Category";
import DonutChart from "../../common/components/DonutChart";
import { Flex } from "@chakra-ui/react";
import { movementTypes } from "../../common/constants";
import useInsights from "../../common/hooks/useInsights";

interface Props {
  period: string;
  data: Category[];
}
const CategoryKPIs = ({ data, period }: Props) => {
  const { getTransactionsTotalAmount } = useInsights();

  const getChartData = (filtered: Category[], type: number) => {
    return filtered.map((f) => ({
      label: f.Name,
      value: getTransactionsTotalAmount(f.Transactions, period, type),
      color: f.Color,
    }));
  };

  return (
    <Flex direction={"row"} gap={4} justifyContent={"center"} pt={1}>
      {movementTypes.map((catType) => (
        <DonutChart
          key={catType.id + "-kpi"}
          data={getChartData(
            data.filter((f) => f.CategoryType === catType.id),
            catType.id
          )}
          caption={catType.id === 2 ? "Net Balance" : catType.name}
        />
      ))}
    </Flex>
  );
};

export default CategoryKPIs;
