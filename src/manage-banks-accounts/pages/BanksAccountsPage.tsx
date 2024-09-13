import { Box, Center, Heading } from "@chakra-ui/react";
import useBanks from "../hooks/useBanks";
import { queryKeys } from "../../common/constants";
import { useMutationState } from "@tanstack/react-query";
import { Bank } from "../Bank";
import Helper from "../../common/helper";
import { EmptyState } from "../../components/ui/empty-state";
import { FaBuildingColumns } from "react-icons/fa6";
import NewBankModal from "../components/NewBankModal";
import BanksGrid from "../components/BanksGrid";

const BanksAccountsPage = () => {
  const banks = useBanks();

  const pendingData = useMutationState({
    filters: {
      mutationKey: [queryKeys.banks],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as Bank;
    },
  });
  const pendingBank = pendingData ? pendingData[0] : null;
  let bankData = banks.data;
  let bankCount = banks.count;
  const helper = new Helper<Bank>();
  if (pendingBank) {
    const { tCount, tData } = helper.getPendingData(banks, pendingBank);
    bankCount = tCount;
    bankData = tData;
  }

  return (
    <Box>
      <Box>
        <Center>
          <Heading>Banks</Heading>
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
            <BanksGrid banks={bankData} />
          </Box>
        )}
      </Box>
      <Box paddingTop={4}>
        <Center>
          <Heading>Accounts</Heading>
        </Center>
      </Box>
    </Box>
  );
};

export default BanksAccountsPage;
