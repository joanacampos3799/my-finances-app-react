import { FormatNumber, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import FixedTransactionsCard from "./FixedTransactionsCard";
import NewFixedTransactionDrawer from "./NewFixedTransactionDrawer";
import Grid from "../../common/components/Grid";
import DeleteCard from "../../common/components/DeleteCard";
import FixedTransactionList from "../model/FixedTransactionsList";
import { useUpdateFixedTransaction } from "../hooks/useUpdateFixedTransaction";

interface Props {
  fixedTransactions: FixedTransactionList[];
}
const FixedTransactionsGrid = ({ fixedTransactions }: Props) => {
  const [toDelete, setToDelete] = useState<FixedTransactionList[]>([]);
  const [deleting, setDeleting] = useState(false);
  const updateFixedTransactions = useUpdateFixedTransaction();
  const handleDelete = () => {
    toDelete.forEach((element) => {
      element.active = !element.active;
      updateFixedTransactions(element);
    });
    setToDelete([]);
    setDeleting(false);
  };
  const buttonAction = fixedTransactions[0].active ? "Delete" : "Restore";

  return (
    <Grid
      action={buttonAction}
      key={buttonAction}
      name={"Fixed Transactions"}
      handleDelete={handleDelete}
      deleting={deleting}
      setDeleting={setDeleting}
    >
      {fixedTransactions.map((fixed) => (
        <GridItem key={fixed.Id}>
          {!deleting ? (
            <FixedTransactionsCard key={fixed.Id + "card"} fixed={fixed} />
          ) : (
            <DeleteCard
              data={fixed}
              toDelete={toDelete}
              setToDelete={setToDelete}
              icon={fixed.Icon}
            >
              <FormatNumber
                value={fixed.Amount}
                style="currency"
                currency="EUR"
              />
            </DeleteCard>
          )}
        </GridItem>
      ))}
    </Grid>
  );
};

export default FixedTransactionsGrid;
