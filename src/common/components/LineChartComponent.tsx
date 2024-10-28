import { Flex, Heading } from "@chakra-ui/react";
import { LineChart } from "@mui/x-charts";
import { format, parse } from "date-fns";

interface Props {
  data: { x: string; y: number }[];
  caption: string;
}
const LineChartComponent = ({ data, caption }: Props) => {
  let interval = 1;
  if (data.length > 7 && data.length <= 30) interval = 4;
  else if (data.length > 30 && data.length <= 100) interval = 8;
  else if (data.length > 100) interval = 20;

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
            tickInterval: (value, index) => {
              return index % interval == 0;
            },
          },
        ]}
        yAxis={[{ min: 0 }]}
      />
    </Flex>
  );
};
export default LineChartComponent;
