import { Box, Flex, HStack, Icon, Tabs } from "@chakra-ui/react";
import useBanks from "../hooks/useBanks";
import { queryKeys } from "../../common/constants";
import { useMutationState } from "@tanstack/react-query";

import { HelperEntity } from "../../common/helper";
import { EmptyState } from "../../components/ui/empty-state";
import NewBankModal from "../components/bank/NewBankModal";
import BanksList from "../components/bank/BanksList";
import useAccounts from "../hooks/useAccounts";
import NewAccountDrawer from "../components/account/NewAccountDrawer";
import AccountsGrid from "../components/account/AccountsGrid";
import AccountList from "../models/AccountList";
import BankList from "../models/BankList";
import CollapsibleTitle from "../../common/components/CollapsibleTitle";
import { LuLandmark, LuWallet } from "react-icons/lu";
import { useState } from "react";
import BanksTab from "../components/bank/BanksTab";

const BanksAccountsPage = () => {
  const banks = useBanks();
  const accounts = useAccounts();
  const [value, setValue] = useState<string>("Accounts");
  const pendingBankData = useMutationState({
    filters: {
      mutationKey: [queryKeys.banks],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as BankList;
    },
  });
  const pendingBank = pendingBankData ? pendingBankData[0] : null;
  let bankData = banks.data;
  let bankCount = banks.count;

  const bankHelper = new HelperEntity<BankList>();
  if (pendingBank) {
    const { tCount, tData } = bankHelper.getPendingData(banks, pendingBank);
    bankCount = tCount;
    bankData = tData;
  }

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
    <Box padding={"5px"}>
      <Box>
        <HStack
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          justifyItems={"flex-end"}
        >
          <CollapsibleTitle
            title={"Banks & Accounts"}
            description={
              "On the Banks & Accounts page, you can easily manage all the financial institutions you use and the accounts you hold with them. This page provides a simple and organized way to keep track of your banks and the associated accounts like checking, savings, or credit accounts."
            }
          />
          <Flex
            direction={"row"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            {value === "Accounts" ? <NewAccountDrawer /> : <NewBankModal />}
          </Flex>
        </HStack>

        <Tabs.Root
          colorPalette={"teal"}
          defaultValue={"Accounts"}
          value={value}
          onValueChange={(e) => setValue(e.value)}
        >
          <Tabs.List>
            <Tabs.Trigger value={"Accounts"}>
              <Icon color={"teal.500"} as={LuWallet} />
              Accounts
            </Tabs.Trigger>
            <Tabs.Trigger value={"Banks"}>
              <Icon color={"teal.500"} as={LuLandmark} />
              Banks
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="Accounts">
            {!accountData || accountCount === 0 ? (
              <EmptyState
                bgColor={"gray.100"}
                icon={<LuWallet />}
                p="10%"
                title="Start adding your accounts"
                description="Add one of your accounts to get started"
              >
                <NewAccountDrawer />
              </EmptyState>
            ) : (
              <Box>
                <NewAccountDrawer />
                <AccountsGrid key={"accounts"} accounts={accountData} />
              </Box>
            )}
          </Tabs.Content>
          <Tabs.Content value="Banks">
            {!bankData || bankCount === 0 ? (
              <EmptyState
                icon={<LuLandmark />}
                bgColor={"gray.100"}
                p="10%"
                title="Start adding your banks"
                description="Add one of your banks to get started"
              >
                <NewBankModal />
              </EmptyState>
            ) : (
              <BanksTab banks={bankData} />
            )}
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default BanksAccountsPage;
