import { FaMoneyBillTransfer } from "react-icons/fa6";
import { EmptyState } from "../../components/ui/empty-state";

const TransactionEmptyState = () => {
  return (
    <EmptyState
      icon={<FaMoneyBillTransfer />}
      title="Start adding transactions"
      description="Add a new transaction to get started"
    />
  );
};

export default TransactionEmptyState;
