import { Box, Flex, HStack, Tabs } from "@chakra-ui/react";
import { queryKeys } from "../common/constants";
import { useMutationState } from "@tanstack/react-query";
import { HelperEntity } from "../common/helper";
import useAccounts from "./hooks/useAccounts";
import NewAccountDrawer from "./components/NewAccountDrawer";
import AccountList from "./models/AccountList";
import CollapsibleTitle from "../common/components/CollapsibleTitle";

import AccountsEmptyState from "./components/AccountsEmptyState";
import AccountsKPIs from "./components/AccountsKPIs";
import AccountsTable from "./components/AccountsTable";
import usePeriodStore from "../common/hooks/usePeriodStore";
import TimePeriodMenu from "../common/components/TimePeriodMenu";
import React from "react";

const AccountsPage = React.memo(() => {
  const { period, setPeriod } = usePeriodStore();
  const accounts = useAccounts();

  const pendingAccountData = useMutationState({
    filters: {
      mutationKey: [queryKeys.accounts],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as AccountList;
    },
  });

  const pendingAccount = pendingAccountData ? pendingAccountData[0] : null;
  let accountData = accounts.data;
  let accountCount = accounts.count;
  const accountHelper = new HelperEntity<AccountList>();
  if (pendingAccount) {
    const { tCount, tData } = accountHelper.getPendingData(
      accounts,
      pendingAccount
    );
    accountCount = tCount;
    accountData = tData;
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
            title={"Accounts"}
            description={
              "On the Accounts page, you can easily manage all the accounts you hold with institutions. This page provides a simple and organized way to keep track of your associated accounts like checking, savings, or credit accounts."
            }
          />
          <Flex
            direction={"row"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            <TimePeriodMenu period={period} setPeriod={setPeriod} />
            <NewAccountDrawer />
          </Flex>
        </HStack>

        {!accountData || accountCount === 0 ? (
          <AccountsEmptyState bgColor="gray.100" />
        ) : (
          <Flex direction={"column"} gap={2}>
            <AccountsKPIs accounts={accountData} />
            <Tabs.Root
              defaultValue={"Active"}
              justify={"end"}
              colorPalette={"teal"}
            >
              <Tabs.List width={"full"} border={0}>
                <Tabs.Trigger value={"Active"}>Active</Tabs.Trigger>
                <Tabs.Trigger value={"Inactive"}>Inactive</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value={"Active"}>
                <AccountsTable accounts={accountData.filter((a) => a.active)} />
              </Tabs.Content>
              <Tabs.Content value={"Inactive"}>
                <AccountsTable
                  accounts={accountData.filter((a) => !a.active)}
                />
              </Tabs.Content>
            </Tabs.Root>
          </Flex>
        )}
      </Box>
    </Box>
  );
});

export default AccountsPage;
