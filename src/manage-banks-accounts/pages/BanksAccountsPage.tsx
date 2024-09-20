import { Box, Center, Heading } from "@chakra-ui/react";
import useBanks from "../hooks/useBanks";
import { queryKeys } from "../../common/constants";
import { useMutationState } from "@tanstack/react-query";

import { HelperEntity } from "../../common/helper";
import { EmptyState } from "../../components/ui/empty-state";
import { FaBuildingColumns } from "react-icons/fa6";
import NewBankModal from "../components/bank/NewBankModal";
import BanksGrid from "../components/bank/BanksGrid";
import useAccounts from "../hooks/useAccounts";
import { HiWallet } from "react-icons/hi2";
import NewAccountDrawer from "../components/account/NewAccountDrawer";
import AccountsGrid from "../components/account/AccountsGrid";
import AccountList from "../models/AccountList";
import BankList from "../models/BankList";

const BanksAccountsPage = () => {
  const banks = useBanks();
  const accounts = useAccounts();

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
    <Box>
      <Box>
        <Center>
          <Heading size={"3xl"}>Accounts</Heading>
        </Center>
        {!accountData || accountCount === 0 ? (
          <EmptyState
            icon={<HiWallet />}
            title="Start adding your accounts"
            description="Add one of your accounts to get started"
          >
            <NewAccountDrawer isEmpty={true} />
          </EmptyState>
        ) : (
          <Box>
            <AccountsGrid key={"accounts"} accounts={accountData} />
          </Box>
        )}
      </Box>
      <Box paddingTop={4}>
        <Center>
          <Heading size={"3xl"}>Banks</Heading>
        </Center>
        {!bankData || bankCount === 0 ? (
          <EmptyState
            icon={<FaBuildingColumns />}
            title="Start adding your banks"
            description="Add one of your banks to get started"
          >
            <NewBankModal isEmpty={true} />
          </EmptyState>
        ) : (
          <Box>
            <BanksGrid key={"banks"} banks={bankData} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BanksAccountsPage;
