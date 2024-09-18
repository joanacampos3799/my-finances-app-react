import FixedTransaction from "../FixedTransaction";
import { Card, FormatNumber, HStack, Icon } from "@chakra-ui/react";
import { useIconPack } from "../../common/hooks/useIconPack";
import { TbArrowBarDown, TbArrowBarUp } from "react-icons/tb";
import FixedTransactionDetails from "./FixedTransactionDetails";
import NewFixedTransactionDrawer from "./NewFixedTransactionDrawer";

interface Props {
  fixed: FixedTransaction;
}
const FixedTransactionsCard = ({ fixed }: Props) => {
  const iconPack = useIconPack();
  return (
    <Card.Root variant={"elevated"} width={"full"}>
      <Card.Header>
        <HStack justifyContent="space-between">
          <HStack justifyContent="center">
            <Icon
              boxSize={4}
              as={iconPack?.find((icon) => icon.name === fixed.Icon)?.icon}
            ></Icon>

            {fixed.Name}
          </HStack>
          <NewFixedTransactionDrawer isEmpty={false} fixed={fixed} />
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack width={"full"} justifyContent="space-between">
          <HStack>
            {fixed.transactionType === 1 ? (
              <Icon as={TbArrowBarUp} />
            ) : (
              <Icon as={TbArrowBarDown} />
            )}
            <FormatNumber
              value={fixed.Amount}
              style="currency"
              currency="EUR"
            />
          </HStack>
          <FixedTransactionDetails fixed={fixed} />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default FixedTransactionsCard;
