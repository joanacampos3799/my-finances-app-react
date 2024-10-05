import { BarChart } from "@mui/x-charts";
import { DatasetType } from "@mui/x-charts/internals";

interface Props {
  xAxisDataKey: string;
  chartData: DatasetType;
  data: { label: string; dataKey: string }[];
  width?: number;
  height?: number;
}
const BarChartComponent = ({
  xAxisDataKey,
  chartData,
  data,
  width,
  height,
}: Props) => {
  const highlightedScope = { highlight: "series", fade: "global" };
  const mappedData = data.map((s) => ({ ...s, highlightedScope }));
  return (
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
  );
};

export default BarChartComponent;
