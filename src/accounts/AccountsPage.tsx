import {
  Box,
  Flex,
  HStack,
  Show,
  Tabs,
  useBreakpointValue,
} from "@chakra-ui/react";
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
import LoadingPage from "../common/components/LoadingPage";
import MonthlyMenu from "../common/components/MonthlyMenu";
import useMonthStore from "../common/hooks/useMonthStore";
import NavbarMobile from "../hero/components/NavbarMobile";
import HamburgerMenu from "../common/components/HamburgerMenu";

const AccountsPage = React.memo(() => {
  const { period, setPeriod } = usePeriodStore();
  const { month, setMonth } = useMonthStore();
  const { accounts, isLoading } = useAccounts();

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
    pendingAccount.DailyBalances = [];
    const { tCount, tData } = accountHelper.getPendingData(
      accounts,
      pendingAccount
    );

    accountCount = tCount;
    accountData = tData;
  }

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isLoading || !accounts.isValueSet) return <LoadingPage />;
  return (
    <Box padding={{ base: "8px", md: "15px" }}>
      <Box>
        <HStack
          flexDirection={"row"}
          alignItems={{ base: "stretch", md: "flex-start" }}
          justifyContent="space-between"
          gap={{ base: 4, md: 0 }}
        >
          {isMobile && <NavbarMobile />}
          <CollapsibleTitle
            title={"Accounts"}
            description={
              "On the Accounts page, you can easily manage all the accounts you hold with institutions. This page provides a simple and organized way to keep track of your associated accounts like checking, savings, or credit accounts."
            }
          />
          {isMobile ? (
            <HamburgerMenu>
              <Flex
                direction={"column"}
                gap={2}
                alignItems={"flex-start"}
                justifyItems={"flex-end"}
              >
                <TimePeriodMenu period={period} setPeriod={setPeriod} />
                <Show when={period === "Monthly"}>
                  <MonthlyMenu month={month} setMonth={setMonth} />
                </Show>
                <NewAccountDrawer />
              </Flex>
            </HamburgerMenu>
          ) : (
            <Flex
              direction={"row"}
              gap={2}
              alignItems={"flex-start"}
              justifyItems={"flex-end"}
            >
              <TimePeriodMenu period={period} setPeriod={setPeriod} />
              <Show when={period === "Monthly"}>
                <MonthlyMenu month={month} setMonth={setMonth} />
              </Show>
              <NewAccountDrawer />
            </Flex>
          )}
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
