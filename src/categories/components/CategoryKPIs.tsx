import Category from "../model/Category";
import DonutChart from "../../common/components/DonutChart";
import { Flex } from "@chakra-ui/react";
import { movementTypes } from "../../common/constants";
import useInsights from "../../common/hooks/useInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useMonthStore from "../../common/hooks/useMonthStore";

interface Props {
  data: Category[];
}
const CategoryKPIs = ({ data }: Props) => {
  const { period } = usePeriodStore();
  const { month } = useMonthStore();
  const { getTransactionsTotalAmount } = useInsights();

  const getChartData = (filtered: Category[], type: number) => {
    return filtered.map((f) => ({
      label: f.Name,
      value: getTransactionsTotalAmount(
        f.Transactions.filter((t) => !t.isCreditCardPayment),
        period,
        month,
        type
      ),
      color: f.Color,
    }));
  };

  return (
    <Flex
      px="10px"
      direction={{ base: "column", md: "row" }}
      gap={2}
      justifyContent={"center"}
      pt={1}
    >
      {movementTypes
        .filter((mt) => mt.id !== 2)
        .map((catType) => (
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
