import { Center, Flex } from "@chakra-ui/react";
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
      <LineChart
        width={500}
        height={400}
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
      <Center fontSize="sm" color="gray.500" mt={2} textAlign="center">
        {caption}
      </Center>
    </Flex>
  );
};
export default LineChartComponent;
