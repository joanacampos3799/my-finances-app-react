import { Flex, Heading } from "@chakra-ui/react";
import { LineChart } from "@mui/x-charts";
import { format, parse } from "date-fns";

interface Props {
  data: { x: string; y: number }[];
  caption: string;
}
const LineChartComponent = ({ data, caption }: Props) => {
  return (
    <Flex
      w={"100%"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={"md"}
      p={"10px"}
    >
      <Heading color={"teal.700"}>{caption}</Heading>
      <LineChart
        width={350}
        height={300}
        series={[
          {
            data: data.map((d) => d.y),
            showMark: false,
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: data.map((d) =>
              format(parse(d.x, "dd/MM/yyyy", new Date()), "MMM d")
            ),
          },
        ]}
        yAxis={[{ min: 0 }]}
      />
    </Flex>
  );
};
export default LineChartComponent;
