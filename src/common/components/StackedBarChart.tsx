import { Flex, Heading } from "@chakra-ui/react";
import { BarChart } from "@mui/x-charts";
import { DatasetType } from "@mui/x-charts/internals";

interface Props {
  xAxisDataKey: string;
  chartData: DatasetType;
  data: { label: string; dataKey: string }[];
  title: string;
  width?: number;
  height?: number;
}
const StackedBarChart = ({
  xAxisDataKey,
  chartData,
  data,
  title,
  width,
  height,
}: Props) => {
  const highlightedScope = { highlight: "series", fade: "global" };

  const mappedData = data.map((s) => ({
    ...s,
    highlightedScope,
    stack: "total",
  }));

  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={"md"}
      flex={1}
    >
      <Heading color={"teal.700"}>{title}</Heading>
      <BarChart
        width={width ?? 600}
        height={height ?? 400}
        xAxis={[{ scaleType: "band", dataKey: xAxisDataKey }]}
        series={mappedData}
        borderRadius={10}
        slotProps={{
          legend: { hidden: true },
        }}
        dataset={chartData}
      />
    </Flex>
  );
};

export default StackedBarChart;
