import { Flex, Heading } from "@chakra-ui/react";
import { BarChart } from "@mui/x-charts";

interface Props {
  title: string;
  chartData: { name: string; amount: number; color: string }[];
  width?: number;
  height?: number;
}
const HorizontalBarChart = ({ title, chartData, width, height }: Props) => {
  return (
    <Flex
      w={"100%"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={"md"}
      p={"10px"}
      flex={1}
    >
      <Heading color={"teal.700"}>{title}</Heading>
      <BarChart
        width={width ?? 600}
        height={height ?? 400}
        yAxis={[{ scaleType: "band", data: ["Top 3"] }]}
        series={chartData.map((d) => ({
          label: d.name,
          data: [d.amount],
          color: d.color,
          highlightScope: {
            highlight: "series",
            fade: "global",
          },
        }))}
        borderRadius={10}
        layout="horizontal"
        slotProps={{
          legend: { hidden: true },
        }}
        dataset={chartData}
      />
    </Flex>
  );
};

export default HorizontalBarChart;
