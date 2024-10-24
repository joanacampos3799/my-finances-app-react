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
import GaugeChart from "../../common/components/GaugeChart";
import { LuWalletCards } from "react-icons/lu";
import { TbCoins, TbReceipt2 } from "react-icons/tb";
import useAccountInsights from "../../common/hooks/useAccountInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";

interface Props {
  accounts: AccountList[];
}
const AccountsKPIs = ({ accounts }: Props) => {
  const { period } = usePeriodStore();
  const { calculateAccountTypeBalances } = useInsights();
  const {
    calculateAssetsAndDebts,
    calculateTotalFeesPaid,
    getProjectedSavings,
  } = useAccountInsights();
  const accountTypeBalances = calculateAccountTypeBalances(accounts);
  const donutData = Object.entries(accountTypeBalances).map(
    ([type, balance]) => ({
      label: type,
      value: balance,
    })
  );

  const { totalAssets, totalDebts } = calculateAssetsAndDebts(accounts, period);
  const chartData = [
    { label: "Assets", value: totalAssets },
    { label: "Debts", value: totalDebts },
  ];

  const topAccounts = accounts
    .sort((a, b) => b.Balance - a.Balance)
    .slice(0, 3);

  return (
    <Flex flexDir={"row"} gap={2} p={"10px"} w="100%">
      <DonutChart data={donutData} caption={"Accounts Distribution"} />

      <GaugeChart data={chartData} caption={"Assets vs Debts"} />

      <Flex flexDir={"column"} gap={2} w="100%">
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
                as={TbCoins}
              />
            </Box>
          </Flex>

          {/* Vertically center text and heading */}
          <Flex direction={"column"} justifyContent={"center"}>
            <Box>
              <Text fontSize={"sm"} color={"gray.500"}>
                Projected {period} Savings
              </Text>
              <Heading size={"2xl"}>
                <FormatNumber
                  value={getProjectedSavings(accounts, period)}
                  style="currency"
                  currency="eur"
                />
              </Heading>
            </Box>
          </Flex>
        </Flex>

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
                as={LuWalletCards}
              />
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
                as={TbReceipt2}
              />
            </Box>
          </Flex>

          <Flex direction={"column"} justifyContent={"center"}>
            <Box>
              <Text fontSize={"sm"} color={"gray.500"}>
                Total Fees Paid
              </Text>
              <Heading size={"2xl"}>
                <FormatNumber
                  value={calculateTotalFeesPaid(accounts, period)}
                  style="currency"
                  currency="eur"
                />
              </Heading>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AccountsKPIs;
