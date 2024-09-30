import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "../../components/ui/progress";
import useInsights from "../../common/hooks/useInsights";
import { HStack } from "@chakra-ui/react";
interface Props {
  budget: number;
  spent: number;
}
const BudgetProgress = ({ budget, spent }: Props) => {
  const { getPercentage } = useInsights();
  const perc = getPercentage(spent, budget);
  let color = "teal";

  if (perc >= 100) color = "red";
  else if (perc > 75 && perc < 100) color = "orange";
  else if (perc > 50 && perc <= 75) color = "yellow";
  return (
    <ProgressRoot min={0} max={budget} value={spent} colorPalette={color}>
      <HStack gap="5">
        <ProgressBar flex="1" />
        <ProgressValueText>{perc}%</ProgressValueText>
      </HStack>
    </ProgressRoot>
  );
};

export default BudgetProgress;
