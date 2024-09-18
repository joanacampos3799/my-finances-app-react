import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import useFixedTransactions from "../hooks/useFixedTransactions";
import { useMutationState } from "@tanstack/react-query";
import { queryKeys } from "../../common/constants";
import FixedTransaction from "../FixedTransaction";
import { HelperEntity } from "../../common/helper";
import { EmptyState } from "../../components/ui/empty-state";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import NewFixedTransactionDrawer from "../components/NewFixedTransactionDrawer";
import FixedTransactionsGrid from "../components/FixedTransactionsGrid";

const FixedTransactionsPage = () => {
  const fixedTransactions = useFixedTransactions();
  const pendingData = useMutationState({
    filters: {
      mutationKey: [queryKeys.fixedTransactions],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as FixedTransaction;
    },
  });
  const pendingFixed = pendingData ? pendingData[0] : null;
  let fixedData = fixedTransactions.data;
  let fixedCount = fixedTransactions.count;

  const helper = new HelperEntity<FixedTransaction>();
  if (pendingFixed) {
    const { tCount, tData } = helper.getPendingData(
      fixedTransactions,
      pendingFixed
    );
    fixedData = tData;
    fixedCount = tCount;
  }
  return (
    <Box>
      <Center>
        <Heading size="3xl">Fixed Transactions</Heading>
      </Center>
      {!fixedData || fixedCount === 0 ? (
        <EmptyState
          paddingTop="10%"
          icon={<FaMoneyBillTransfer />}
          title="Start adding fixed transactions"
          description="Add a new Fixed transaction to get started"
        >
          <NewFixedTransactionDrawer isEmpty={true} />
        </EmptyState>
      ) : (
        <FixedTransactionsGrid fixedTransactions={fixedData} />
      )}
    </Box>
  );
};

export default FixedTransactionsPage;
