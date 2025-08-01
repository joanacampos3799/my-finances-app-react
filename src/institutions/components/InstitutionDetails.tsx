import DialogComponent from "../../common/components/DialogComponent";
import InstitutionList from "../model/InstitutionList";
import AccountsTable from "../../accounts/components/AccountsTable";
import useInsights from "../../common/hooks/useInsights";
import {
  Badge,
  Flex,
  FormatNumber,
  Heading,
  Text,
  Separator,
} from "@chakra-ui/react";
import NewAccountDrawer from "../../accounts/components/NewAccountDrawer";
import useAccountInsights from "../../common/hooks/useAccountInsights";
import { institutionTypes } from "../../common/constants";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useMonthStore from "../../common/hooks/useMonthStore";

interface Props {
  institution: InstitutionList;
}
const InstitutionDetails = ({ institution }: Props) => {
  const { period } = usePeriodStore();
  const { month } = useMonthStore();
  const { calculateNetWorthChange, spendingTrend } = useAccountInsights();
  const { getTransactionsTotalAmount } = useInsights();

  const totalSpent = institution.Accounts.reduce(
    (total, acc) =>
      total +
      getTransactionsTotalAmount(acc.Transactions, undefined, undefined, 0),
    0
  );
  const initialBalance = institution.Accounts.reduce(
    (total, acc) => total + (acc.InitialBalance ?? 0),
    0
  );
  const totalIncome = institution.Accounts.reduce(
    (total, acc) =>
      total +
      getTransactionsTotalAmount(acc.Transactions, undefined, undefined, 1),
    0
  );
  return (
    <DialogComponent
      size={{ base: "full", md: "xl" }}
      title={institution.Name + "'s Accounts"}
      footer={<NewAccountDrawer institutionId={institution.Id} />}
    >
      <Flex direction={"column"} gap={5} mb={3}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 10 }}
        >
          <Flex gap={2} w="100%">
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Current Balance
            </Heading>
            <FormatNumber
              value={institution.Balance ?? 0}
              style="currency"
              currency="Eur"
            />
          </Flex>

          <Flex gap={2} w="100%">
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Initial Balance
            </Heading>
            <FormatNumber
              value={initialBalance}
              style="currency"
              currency="Eur"
            />
          </Flex>

          <Flex gap={2} w="100%">
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Institution Type
            </Heading>
            <Badge colorPalette={"teal"}>
              {" "}
              {institutionTypes[institution.Type].name}
            </Badge>
          </Flex>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 10 }}
        >
          <Flex gap={2} w="100%">
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Total Earnings
            </Heading>
            <FormatNumber value={totalIncome} style="currency" currency="Eur" />
          </Flex>

          <Flex gap={2} w="100%">
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Total Expenses
            </Heading>
            <FormatNumber value={totalSpent} style="currency" currency="Eur" />
          </Flex>
          <Flex gap={2} w="100%">
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Number of Accounts
            </Heading>
            {institution.Accounts.length}
          </Flex>
        </Flex>
      </Flex>

      <Separator />
      <Flex direction={"column"} mt={3} gap={3}>
        <Text>
          {calculateNetWorthChange(institution.Accounts, period, month)}
        </Text>

        <Text>{spendingTrend(institution.Accounts, period, month)}</Text>
      </Flex>
      <AccountsTable fromInstitution accounts={institution.Accounts} />
    </DialogComponent>
  );
};

export default InstitutionDetails;
