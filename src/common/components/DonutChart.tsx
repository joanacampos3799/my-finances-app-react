import { Center, Flex, FormatNumber } from "@chakra-ui/react";
import { PieChart } from "@mui/x-charts/PieChart";
export interface PieObject {
  label: string;
  value: number;
  color?: string;
}
interface Props {
  data: PieObject[];
  caption: string;
}
const DonutChart = ({ data, caption }: Props) => {
  const total = data.map((d) => d.value).reduce((acc, val) => acc + val, 0);
  const valueFormatter = (item: { value: number }) =>
    `${item.value.toFixed(2)}€`;
  return (
    <>
      {data.length > 0 && total > 0 && (
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          bgColor={"white"}
          borderRadius={"md"}
          p={1}
        >
          <PieChart
            series={[
              {
                data: data,
                innerRadius: 40,
                outerRadius: 80,
                cornerRadius: 5,
                cx: 150,
                cy: 100,
                valueFormatter,
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            slotProps={{
              legend: { hidden: true }, // Hides the legend
            }}
            width={300}
            height={200}
          >
            <svg
              width="300"
              height="200"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none", // Prevent interaction with the SVG overlay
              }}
            >
              <text
                x="155" // X position (centered)
                y="105" // Y position (centered)
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="24"
                fill="black" // Change color as needed
              >
                <FormatNumber value={total} style={"currency"} currency="EUR" />
              </text>
            </svg>
          </PieChart>
          <Center fontSize="sm" color="gray.500" mt={2} textAlign="center">
            {caption}
          </Center>
        </Flex>
      )}
    </>
  );
};

export default DonutChart;
