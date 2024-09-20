import { Box, Center, Heading } from "@chakra-ui/react";
import useFixedTransactions from "../hooks/useFixedTransactions";
import { useMutationState } from "@tanstack/react-query";
import { queryKeys } from "../../common/constants";
import { HelperEntity } from "../../common/helper";
import { EmptyState } from "../../components/ui/empty-state";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import NewFixedTransactionDrawer from "../components/NewFixedTransactionDrawer";
import FixedTransactionsGrid from "../components/FixedTransactionsGrid";
import FixedTransactionList from "../model/FixedTransactionsList";

const FixedTransactionsPage = () => {
  const fixedTransactions = useFixedTransactions();
  const pendingData = useMutationState({
    filters: {
      mutationKey: [queryKeys.fixedTransactions],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as FixedTransactionList;
    },
  });
  const pendingFixed = pendingData ? pendingData[0] : null;
  let fixedData = fixedTransactions.data;
  let fixedCount = fixedTransactions.count;

  const helper = new HelperEntity<FixedTransactionList>();
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
          <NewFixedTransactionDrawer isEmpty={true} active={true} />
        </EmptyState>
      ) : (
        <Box>
          {fixedData.filter((f) => f.active).length > 0 && (
            <Box key={"active-box"}>
              <Heading>Active</Heading>
              <FixedTransactionsGrid
                key={"active"}
                fixedTransactions={fixedData.filter((f) => f.active)}
              />
            </Box>
          )}
          {fixedData.filter((f) => !f.active).length > 0 && (
            <Box key={"inactive-box"}>
              <Heading>Inactive</Heading>
              <FixedTransactionsGrid
                key={"inactive"}
                fixedTransactions={fixedData.filter((f) => !f.active)}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FixedTransactionsPage;
