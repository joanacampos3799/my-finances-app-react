import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Show,
  Tabs,
} from "@chakra-ui/react";
import BankList from "../banks/components/BankList";
import AccountList from "../accounts/components/AccountList";
import { EmptyState } from "../../components/ui/empty-state";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import useTransactions from "../transactions/hooks/useTransactions";
import { useMutationState } from "@tanstack/react-query";
import { queryKeys } from "../../common/constants";
import Transaction from "../transactions/Transaction";
import { HelperEntity } from "../../common/helper";
import TabContent from "../transactions/components/TabContent";
import NewTransactionDialog from "../transactions/components/NewTransactionDialog";

export default function DashboardPage() {
  const transactions = useTransactions();
  const pendingData = useMutationState({
    filters: {
      mutationKey: [queryKeys.transactions],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as Transaction;
    },
  });
  const pendingTransaction = pendingData ? pendingData[0] : null;
  let transData = transactions.data;
  let transCount = transactions.count;

  const helper = new HelperEntity<Transaction>();
  if (pendingTransaction) {
    const { tCount, tData } = helper.getPendingData(
      transactions,
      pendingTransaction
    );
    transData = tData;
    transCount = tCount;
  }
  let years: string[] = [];
  if (transData && transCount > 0)
    years = transData
      .map((s) => s.Date.getFullYear().toString())
      .sort((a, b) => +b - +a);
  return (
    <Box>
      <Center>
        <Heading> My Finances Tracker</Heading>
      </Center>
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <Show when="lg">
          <GridItem area="aside" paddingX={5}>
            <AccountList />
            <BankList />
          </GridItem>
        </Show>
        <GridItem area="main">
          {!transData || transCount === 0 ? (
            <EmptyState
              paddingTop="10%"
              paddingEnd={"20%"}
              icon={<FaMoneyBillTransfer />}
              title="Start adding transactions"
              description="Add a new transaction to get started"
            >
              <NewTransactionDialog isEmpty={true} />
            </EmptyState>
          ) : (
            <Tabs.Root defaultValue={years[0]} variant="plain">
              <Tabs.List>
                {years.map((year) => (
                  <Tabs.Trigger value={year}>{year}</Tabs.Trigger>
                ))}

                <Tabs.Indicator />
              </Tabs.List>
              {years.map((year) => (
                <Tabs.Content value={year}>
                  <TabContent
                    transactions={transData.filter(
                      (t) => t.Date.getFullYear().toString() === year
                    )}
                  />
                </Tabs.Content>
              ))}
            </Tabs.Root>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}
