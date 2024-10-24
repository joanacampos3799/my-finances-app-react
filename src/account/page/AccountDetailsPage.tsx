import { useParams } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import {
  Box,
  Flex,
  FormatNumber,
  Heading,
  Show,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import TransactionTable from "../../transactions/components/TransactionTable";
import DebtsTable from "../../debts/components/DebtsTable";
import NewTransactionDrawer from "../../transactions/components/NewTransactionDrawer";
import AccountHeader from "../components/AccountHeader";
import BreadCrumb from "../components/BreadCrumb";
import useAccountStore from "../hooks/useAccountStore";
import { useEffect } from "react";
import AccountKPIs from "../components/AccountKPIs";
import { accountTypes } from "../../common/constants";
import CreditKPIs from "../components/CreditKPIs";
import PaymentsTable from "../components/PaymentsTable";

const AccountDetailsPage = () => {
  const { id } = useParams();

  const { account: acc, isLoading, error } = useAccount(+id!);
  const { account, setAccount } = useAccountStore();

  useEffect(() => {
    if (acc !== undefined) setAccount(acc);
  }, [acc, setAccount]);
  if (isLoading) return <Spinner />;

  if (error || !account) return <Text>No data</Text>;
  console.log(account.Transactions);
  return (
    <Box>
      <AccountHeader name={account.Name} />
      <Box padding={"15px"}>
        <BreadCrumb name={account.Name} />
        <Flex direction={"column"} gap={4} mt={4}>
          <Heading color={"teal.700"} size={"4xl"}>
            <FormatNumber
              value={account.Balance}
              style="currency"
              currency="Eur"
            />
          </Heading>
          {accountTypes[account.Type].name === "Credit" ? (
            <CreditKPIs />
          ) : (
            <AccountKPIs />
          )}

          <Flex direction={{ base: "column", md: "row" }} w="100%" gap={4}>
            <Show when={accountTypes[account.Type].name === "Credit"}>
              <Flex
                direction={"column"}
                bgColor={"white"}
                borderRadius={"md"}
                flex="1"
                p={"10px"}
                justifyContent={"space-between"}
              >
                <Stack>
                  <Heading size="md" color={"teal.700"}>
                    Credit Card Payments
                  </Heading>
                  <PaymentsTable />
                </Stack>
                <Flex justifyContent={"flex-end"} alignItems={"flex-end"}>
                  <NewTransactionDrawer creditAccountId={account.Id} />
                </Flex>
              </Flex>
            </Show>
            <Flex
              direction={"column"}
              bgColor={"white"}
              borderRadius={"md"}
              p={"10px"}
              flex="1"
              justifyContent={"space-between"}
            >
              <Stack>
                <Heading size="md" color={"teal.700"}>
                  Transactions
                </Heading>
                <TransactionTable data={account.Transactions} fromAccount />
              </Stack>
              <Flex justifyContent={"flex-end"} alignItems={"flex-end"}>
                <NewTransactionDrawer accountId={account.Id} />
              </Flex>
            </Flex>

            <Flex
              direction={"column"}
              bgColor={"white"}
              borderRadius={"md"}
              p={"10px"}
              flex="1"
            >
              <Heading size="md" color={"teal.700"}>
                Debts
              </Heading>
              <DebtsTable data={account.Debts} />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default AccountDetailsPage;
