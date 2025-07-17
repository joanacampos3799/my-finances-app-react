import {
  Box,
  Flex,
  FormatNumber,
  Heading,
  Icon,
  List,
  Text,
} from "@chakra-ui/react";
import DonutChart from "../../common/components/DonutChart";
import useInsights from "../../common/hooks/useInsights";
import AccountList from "../models/AccountList";
import {
  LuArrowDownFromLine,
  LuArrowUpFromLine,
  LuLineChart,
  LuPiggyBank,
  LuWallet,
  LuWalletCards,
} from "react-icons/lu";
import { TbCoins } from "react-icons/tb";
import useAccountInsights from "../../common/hooks/useAccountInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useMonthStore from "../../common/hooks/useMonthStore";
import ValueKPIComponent from "../../common/components/ValueKPIComponent";

interface Props {
  accounts: AccountList[];
}
const AccountsKPIs = ({ accounts }: Props) => {
  const { period } = usePeriodStore();
  const { month } = useMonthStore();
  const { calculateAccountTypeBalances } = useInsights();
  const { getProjectedSavings } = useAccountInsights();
  const accountTypeBalances = calculateAccountTypeBalances(accounts);
  const donutData = Object.entries(accountTypeBalances).map(
    ([type, balance]) => ({
      label: type,
      value: balance,
    })
  );

  const totalBalance = accounts.reduce((totalBalance, account) => {
    if (account.Type !== 1) return (totalBalance += account.Balance);
    else return totalBalance;
  }, 0);

  const totalSavings = accounts.reduce((totalSavings, account) => {
    if (account.Type === 2) return (totalSavings += account.Balance);
    else return totalSavings;
  }, 0);

  const totalInvestements = accounts.reduce((totalInv, account) => {
    if (account.Type === 4) return (totalInv += account.Balance);
    else return totalInv;
  }, 0);

  const totalExpenses = accounts.reduce((totalExpenses, account) => {
    return (totalExpenses += account.Transactions.reduce((acc, transaction) => {
      if (transaction.transactionType === 0) return acc + transaction.Amount;
      else return acc;
    }, 0));
  }, 0);

  const totalIncome = accounts.reduce((totalIncome, account) => {
    return (totalIncome += account.Transactions.reduce((acc, transaction) => {
      if (transaction.transactionType === 1) return acc + transaction.Amount;
      else return acc;
    }, 0));
  }, 0);

  const topAccounts = accounts
    .sort((a, b) => b.Balance - a.Balance)
    .slice(0, 3);

  return (
    <Flex flexDir={"row"} gap={2} p={"10px"} w="100%">
      <DonutChart data={donutData} caption={"Accounts Distribution"} />

      <Flex flexDir={"column"} gap={2} w="25%">
        <ValueKPIComponent
          title="Savings"
          IconEl={LuPiggyBank}
          value={totalSavings}
        />
        <ValueKPIComponent
          title="Investements"
          IconEl={LuLineChart}
          value={totalInvestements}
        />
        <ValueKPIComponent
          title="Total Expenses"
          IconEl={LuArrowUpFromLine}
          value={totalExpenses}
        />

        <ValueKPIComponent
          title="Total Income"
          IconEl={LuArrowDownFromLine}
          value={totalIncome}
        />
      </Flex>

      <Flex flexDir={"column"} gap={2} w="25%">
        <ValueKPIComponent
          title="Total Balance"
          IconEl={LuWallet}
          value={totalBalance}
        />
        <ValueKPIComponent
          title={`Projected ${period} Savings`}
          IconEl={TbCoins}
          value={getProjectedSavings(accounts, period, month)}
        />

        <Flex
          h={"full"}
          bgColor={"white"}
          direction={"row"}
          borderRadius={"md"}
          gap={2}
          p={4}
        >
          <Flex alignItems={"center"}>
            <Box
              borderRadius={"full"}
              bgColor={"teal.100"}
              boxSize={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                alignItems={"center"}
                justifyContent={"center"}
                color={"teal.700"}
                boxSize={6}
              >
                <LuWalletCards />
              </Icon>
            </Box>
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"sm"} color={"gray.500"}>
              Top Institutions
            </Text>
            <List.Root as="ol" colorPalette={"teal"}>
              {topAccounts.map((Account) => (
                <List.Item key={Account.Id + "-top"}>
                  <List.Indicator color={"teal.100"} />
                  {Account.Name}:{" "}
                  <FormatNumber
                    value={Account.Balance ?? 0}
                    style="currency"
                    currency="eur"
                  />
                </List.Item>
              ))}
            </List.Root>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountsKPIs;
