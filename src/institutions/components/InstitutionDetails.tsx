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

interface Props {
  institution: InstitutionList;
}
const InstitutionDetails = ({ institution }: Props) => {
  const { period } = usePeriodStore();
  const {
    calculateAssetsAndDebts,
    calculateNetWorthChange,
    spendingTrend,
    calculateTotalFeesPaid,
  } = useAccountInsights();
  const { getTransactionsTotalAmount } = useInsights();
  const { totalAssets, totalDebts } = calculateAssetsAndDebts(
    institution.Accounts
  );
  const totalSpent = institution.Accounts.reduce(
    (total, acc) =>
      total + getTransactionsTotalAmount(acc.Transactions, undefined, 0),
    0
  );
  const initialBalance = institution.Accounts.reduce(
    (total, acc) => total + (acc.InitialBalance ?? 0),
    0
  );
  const totalIncome = institution.Accounts.reduce(
    (total, acc) =>
      total + getTransactionsTotalAmount(acc.Transactions, undefined, 1),
    0
  );
  return (
    <DialogComponent
      size="xl"
      title={institution.Name + "'s Accounts"}
      footer={<NewAccountDrawer institutionId={institution.Id} />}
    >
      <Flex direction={"column"} gap={5} mb={3}>
        <Flex direction={"row"} gap={10}>
          <Flex gap={2} w="100%">
            <Heading color={"teal.800"} size={"sm"}>
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
            <Heading color={"teal.800"} size={"sm"}>
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
            <Heading color={"teal.800"} size={"sm"}>
              {" "}
              Institution Type
            </Heading>
            <Badge colorPalette={"teal"}>
              {" "}
              {institutionTypes[institution.Type].name}
            </Badge>
          </Flex>
        </Flex>
        <Flex direction={"row"} gap={10}>
          <Flex gap={2} w="100%">
            <Heading color={"teal.800"} size={"sm"}>
              {" "}
              Total Assets
            </Heading>
            <FormatNumber value={totalAssets} style="currency" currency="Eur" />
          </Flex>
          <Flex gap={2} w="100%">
            <Heading color={"teal.800"} size={"sm"}>
              {" "}
              Total Debts
            </Heading>
            <FormatNumber value={totalDebts} style="currency" currency="Eur" />
          </Flex>
          <Flex gap={2} w="100%">
            <Heading color={"teal.800"} size={"sm"}>
              {" "}
              Total Fees
            </Heading>
            <FormatNumber
              value={calculateTotalFeesPaid(institution.Accounts, period)}
              style="currency"
              currency="Eur"
            />
          </Flex>
        </Flex>
        <Flex direction={"row"} gap={10}>
          <Flex gap={2} w="100%">
            <Heading color={"teal.800"} size={"sm"}>
              {" "}
              Total Earnings
            </Heading>
            <FormatNumber value={totalIncome} style="currency" currency="Eur" />
          </Flex>

          <Flex gap={2} w="100%">
            <Heading color={"teal.800"} size={"sm"}>
              {" "}
              Total Expenses
            </Heading>
            <FormatNumber value={totalSpent} style="currency" currency="Eur" />
          </Flex>
          <Flex gap={2} w="100%">
            <Heading color={"teal.800"} size={"sm"}>
              {" "}
              Number of Accounts
            </Heading>
            {institution.Accounts.length}
          </Flex>
        </Flex>
      </Flex>

      <Separator />
      <Flex direction={"column"} mt={3} gap={3}>
        <Text>{calculateNetWorthChange(institution.Accounts, period)}</Text>

        <Text>{spendingTrend(institution.Accounts, period)}</Text>
      </Flex>
      <AccountsTable fromInstitution accounts={institution.Accounts} />
    </DialogComponent>
  );
};

export default InstitutionDetails;
