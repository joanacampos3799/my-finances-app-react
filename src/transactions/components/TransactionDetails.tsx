import DialogComponent from "../../common/components/DialogComponent";
import Transaction from "../model/Transaction";

interface Props {
  transaction: Transaction;
}
const TransactionDetails = ({ transaction }: Props) => {
  return <DialogComponent size="xl" title={transaction.Name}></DialogComponent>;
};

export default TransactionDetails;
