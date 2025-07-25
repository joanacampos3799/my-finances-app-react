import { useParams } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import {
  Box,
  Flex,
  FormatNumber,
  Heading,
  HStack,
  Show,
  Stack,
  Text,
} from "@chakra-ui/react";
import TransactionTable from "../../transactions/components/TransactionTable";
import NewTransactionDrawer from "../../transactions/components/NewTransactionDrawer";
import AccountHeader from "../components/AccountHeader";
import BreadCrumb from "../components/BreadCrumb";
import useAccountStore from "../hooks/useAccountStore";
import { useEffect } from "react";
import AccountKPIs from "../components/AccountKPIs";
import { accountTypes } from "../../common/constants";
import CreditKPIs from "../components/CreditKPIs";
import PaymentsTable from "../components/PaymentsTable";
import LoadingPage from "../../common/components/LoadingPage";

const AccountDetailsPage = () => {
  const { id } = useParams();

  const { account: acc, isLoading, error } = useAccount(+id!);
  const { account, setAccount, isValueSet } = useAccountStore();

  useEffect(() => {
    if (acc !== undefined) setAccount(acc);
  }, [acc, setAccount]);
  if (isLoading || !isValueSet) return <LoadingPage />;
  if (error || !account) return <Text>No data</Text>;
  return (
    <Box>
      <AccountHeader name={account.Name} />
      <Box padding={"15px"}>
        <BreadCrumb name={account.Name} />
        <Flex direction={"column"} gap={4} mt={4}>
          <Flex direction={"column"} gap={4} mt={4}>
            <Flex direction={{ base: "column", md: "row" }}>
              <Heading
                color={"teal.700"}
                size={"4xl"}
                w={"75%"}
                position={"relative"}
                alignContent={"center"}
              >
                <FormatNumber
                  value={account.Balance}
                  style="currency"
                  currency="Eur"
                />
              </Heading>
            </Flex>
            {accountTypes[account.Type].name === "Credit" ? (
              <CreditKPIs />
            ) : (
              <AccountKPIs />
            )}
          </Flex>

          <Flex direction={{ base: "column", lg: "row" }} w="100%" gap={4}>
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
                  <HStack justifyContent={"space-between"}>
                    <Heading size="md" color={"teal.700"}>
                      Credit Card Payments
                    </Heading>
                    <Flex justifyContent={"flex-end"} alignItems={"flex-end"}>
                      <NewTransactionDrawer creditAccountId={account.Id} />
                    </Flex>
                  </HStack>
                  <PaymentsTable />
                </Stack>
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
                <HStack justifyContent={"space-between"}>
                  <Heading size="md" color={"teal.700"}>
                    Transactions
                  </Heading>
                  <Flex justifyContent={"flex-end"} alignItems={"flex-end"}>
                    <NewTransactionDrawer accountId={account.Id} />
                  </Flex>
                </HStack>

                <TransactionTable
                  data={account.Transactions}
                  fromAccount
                  size={10}
                />
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default AccountDetailsPage;
