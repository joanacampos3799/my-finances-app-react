import DialogComponent from "../../common/components/DialogComponent";

import TransactionTable from "../../transactions/components/TransactionTable";
import {
  Badge,
  Editable,
  Flex,
  FormatNumber,
  Heading,
  HStack,
  Separator,
  Show,
  Text,
} from "@chakra-ui/react";
import NewTransactionDrawer from "../../transactions/components/NewTransactionDrawer";
import { useState } from "react";

import useInsights from "../../common/hooks/useInsights";
import { Tag } from "../../components/ui/tag";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import AccountList from "../models/AccountList";
import { LineChart } from "@mui/x-charts";
import DonutChart from "../../common/components/DonutChart";
import useAccountInsights from "../../common/hooks/useAccountInsights";
import { LinkButton } from "../../components/ui/link-button";

interface Props {
  account: AccountList;
}

const AccountDetails = ({ account }: Props) => {
  const { period } = usePeriodStore();

  const { getTransactionsAverageAmount, budgetInsight, spendingTrendInsight } =
    useInsights();
  const { calculateAssetsAndDebts } = useAccountInsights();
  const { getTransactionsTotalAmount } = useInsights();

  const { totalAssets, totalDebts } = calculateAssetsAndDebts([account]);

  const totalSpent = getTransactionsTotalAmount(
    account.Transactions,
    undefined,
    0
  );

  const totalIncome = getTransactionsTotalAmount(
    account.Transactions,
    undefined,
    1
  );

  return (
    <DialogComponent
      size="xl"
      title={
        account.Name + `'${account.Name.endsWith("s") ? "" : "s"} Transactions`
      }
      footer={
        <LinkButton href={"/s/accounts/" + account.Id} bgColor={"teal.500"}>
          View Full Details
        </LinkButton>
      }
    >
      <Flex direction={"column"} gap={5} mb={3}>
        <Flex direction="row" gap={10}>
          <Flex gap={2} w="100%">
            <Heading color="teal.800" size="sm">
              Current Balance
            </Heading>
            <FormatNumber
              value={account.Balance}
              style="currency"
              currency="EUR"
            />
          </Flex>

          <Flex gap={2} w="100%">
            <Heading color="teal.800" size="sm">
              Account Type
            </Heading>
            <Badge colorScheme="teal">{account.Type}</Badge>
          </Flex>
        </Flex>

        {/* Insights */}
        <Flex direction="row" gap={10}>
          <Flex gap={2} w="100%">
            <Heading color="teal.800" size="sm">
              Total Income
            </Heading>
            <FormatNumber value={totalIncome} style="currency" currency="EUR" />
          </Flex>

          <Flex gap={2} w="100%">
            <Heading color="teal.800" size="sm">
              Total Expenses
            </Heading>
            <FormatNumber value={totalSpent} style="currency" currency="EUR" />
          </Flex>

          <Flex gap={2} w="100%">
            <Heading color="teal.800" size="sm">
              Net Savings
            </Heading>
            <FormatNumber
              value={totalIncome - totalSpent}
              style="currency"
              currency="EUR"
            />
          </Flex>
        </Flex>
      </Flex>
    </DialogComponent>
  );
};

export default AccountDetails;
