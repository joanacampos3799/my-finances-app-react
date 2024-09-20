import { FormatNumber, HStack, Icon } from "@chakra-ui/react";
import { TbArrowBarDown, TbArrowBarUp } from "react-icons/tb";
import FixedTransactionDetails from "./FixedTransactionDetails";
import FixedTransactionList from "../model/FixedTransactionsList";
import ListCard from "../../common/components/ListCard";

interface Props {
  fixed: FixedTransactionList;
}
const FixedTransactionsCard = ({ fixed }: Props) => {
  return (
    <ListCard data={fixed} icon={fixed.Icon}>
      <HStack>
        {fixed.transactionType === 1 ? (
          <Icon as={TbArrowBarUp} />
        ) : (
          <Icon as={TbArrowBarDown} />
        )}
        <FormatNumber value={fixed.Amount} style="currency" currency="EUR" />
      </HStack>
      {fixed.Id !== undefined && !fixed.deleted && (
        <FixedTransactionDetails id={fixed.Id} />
      )}
    </ListCard>
  );
};

export default FixedTransactionsCard;
