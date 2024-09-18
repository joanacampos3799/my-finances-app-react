import { GridItem, Show, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { FaCheck } from "react-icons/fa6";
import FixedTransaction from "../FixedTransaction";
import { useDeleteFixedTransaction } from "../hooks/useUpdateActiveFixedTransaction";
import FixedTransactionsCard from "./FixedTransactionsCard";
import NewFixedTransactionDrawer from "./NewFixedTransactionDrawer";
import DeleteFixedTransactionCard from "./DeleteFixedTransactionCard";

interface Props {
  fixedTransactions: FixedTransaction[];
}
const FixedTransactionsGrid = ({ fixedTransactions }: Props) => {
  const [toDelete, setToDelete] = useState<FixedTransaction[]>([]);
  const [deleting, setDeleting] = useState(false);
  const deleteFixedTransactions = useDeleteFixedTransaction();
  const handleDelete = () => {
    debugger;
    toDelete.forEach((element) => {
      element.deleted = true;
      deleteFixedTransactions(element);
    });
    setToDelete([]);
    setDeleting(false);
  };
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 5 }} gap={6} padding="10px">
      <GridItem colSpan={{ sm: 0, md: 1, lg: 3, xl: 4 }}></GridItem>
      <GridItem>
        {deleting ? (
          <Button float={"right"} onClick={handleDelete}>
            {" "}
            <FaCheck />
          </Button>
        ) : (
          <Button float={"right"} onClick={() => setDeleting(true)}>
            {" "}
            Delete Fixed Transactions
          </Button>
        )}
      </GridItem>

      {fixedTransactions.map((fixed) => (
        <GridItem key={fixed.Id}>
          {!deleting ? (
            <FixedTransactionsCard fixed={fixed} />
          ) : (
            <DeleteFixedTransactionCard
              fixed={fixed}
              toDelete={toDelete}
              setToDelete={setToDelete}
            />
          )}
        </GridItem>
      ))}
      <Show when={!deleting}>
        <NewFixedTransactionDrawer isEmpty={false} />
      </Show>
    </SimpleGrid>
  );
};

export default FixedTransactionsGrid;
