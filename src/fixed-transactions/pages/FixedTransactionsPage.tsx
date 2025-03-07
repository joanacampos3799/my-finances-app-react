import { Box, Flex, HStack, Tabs } from "@chakra-ui/react";
import useFixedTransactions from "../hooks/useFixedTransactions";
import { useMutationState } from "@tanstack/react-query";
import { queryKeys } from "../../common/constants";
import { HelperEntity } from "../../common/helper";
import { EmptyState } from "../../components/ui/empty-state";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import NewFixedTransactionDrawer from "../components/NewFixedTransactionDrawer";
import FixedTransactionsList from "../components/FixedTransactionsList";
import CollapsibleTitle from "../../common/components/CollapsibleTitle";
import TimePeriodMenu from "../../common/components/TimePeriodMenu";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import FixedTransaction from "../model/FixedTransaction";
import FixedTransactionList from "../model/FixedTransactionsList";

const FixedTransactionsPage = () => {
  const fixedTransactions = useFixedTransactions();
  const { period, setPeriod } = usePeriodStore();
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
    <Box padding={"15px"}>
      <Box>
        <HStack
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          justifyItems={"flex-end"}
        >
          <CollapsibleTitle
            title="Fixed Transactions"
            description="Welcome to the Fixed transactions Page, where you can easily manage all your subscriptions, fixed bills and incomes"
          />
          <Flex
            direction={"row"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            <TimePeriodMenu period={period} setPeriod={setPeriod} />

            <NewFixedTransactionDrawer />
          </Flex>
        </HStack>
      </Box>
      {!fixedData || fixedCount === 0 ? (
        <EmptyState
          paddingTop="10%"
          icon={<FaMoneyBillTransfer />}
          title="Start adding fixed transactions"
          description="Add a new subscription, bill or fixed income"
        />
      ) : (
        <Box>
          <Tabs.Root
            defaultValue={"Active"}
            justify={"end"}
            colorPalette={"teal"}
          >
            <Tabs.List width={"full"} border={0}>
              <Tabs.Trigger key={"activeTabTrigger"} value={"Active"}>
                Active
              </Tabs.Trigger>
              <Tabs.Trigger key={"inactiveTabTrigger"} value={"Inactive"}>
                Inactive
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={"Active"}>
              <FixedTransactionsList
                fixedTransactions={fixedData.filter((f) => f.active)}
              />
            </Tabs.Content>
            <Tabs.Content value={"Inactive"}>
              <FixedTransactionsList
                fixedTransactions={fixedData.filter((f) => !f.active)}
              />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      )}
    </Box>
  );
};

export default FixedTransactionsPage;
