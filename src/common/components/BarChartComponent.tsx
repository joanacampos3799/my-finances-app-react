import { BarChart } from "@mui/x-charts";
import { DatasetType } from "@mui/x-charts/internals";

interface Props {
  xAxisDataKey: string;
  chartData: DatasetType;
  data: { label: string; dataKey: string }[];
}
const BarChartComponent = ({ xAxisDataKey, chartData, data }: Props) => {
  const highlightedScope = { highlight: "series", fade: "global" };
  const mappedData = data.map((s) => ({ ...s, highlightedScope }));
  return (
    <BarChart
      width={600}
      height={400}
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
