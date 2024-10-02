import {
  Box,
  Flex,
  FormatNumber,
  Heading,
  Icon,
  List,
  Text,
} from "@chakra-ui/react";
import BankList from "../../models/BankList";
import { LuLandmark, LuWalletCards } from "react-icons/lu";
import useInsights from "../../../common/hooks/useInsights";
import BarChartComponent from "../../../common/components/BarChartComponent";
import { RiHandCoinLine } from "react-icons/ri";
import { TbCoins } from "react-icons/tb";
interface Props {
  banks: BankList[];
}
const BanksKPIs = ({ banks }: Props) => {
  console.log(banks);
  const { getTransactionsTotalAmount } = useInsights();
  const totalBalance = banks.reduce(
    (total, bank) => total + (bank.Balance ?? 0),
    0
  );
  const topBanks = [...banks]
    .sort((a, b) => (b.Balance ?? 0) - (a.Balance ?? 0))
    .slice(0, 3);

  const chartData = banks.map((bank) => {
    const totalSpent = bank.Accounts.reduce(
      (total, acc) =>
        total + getTransactionsTotalAmount(acc.Transactions, undefined, 0),
      0
    );
    const totalIncome = bank.Accounts.reduce(
      (total, acc) =>
        total + getTransactionsTotalAmount(acc.Transactions, undefined, 1),
      0
    );
    return {
      bank: bank.Name,
      totalSpent: totalSpent,
      totalIncome: totalIncome,
    };
  });

  return (
    <Flex direction={"row"} gap={2} mx={"10px"}>
      <Flex width={"70%"} bgColor={"white"} borderRadius={"md"}>
        <BarChartComponent
          chartData={chartData}
          xAxisDataKey="bank"
          data={[
            {
              dataKey: "totalSpent",
              label: "Total Spent",
            },
            { dataKey: "totalIncome", label: "Total Income" },
          ]}
        />
      </Flex>
      <Flex direction={"column"} gap={2} width={"30%"} h={"full"}>
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

          <Flex direction={"column"}>
            <Text fontSize={"sm"} color={"gray.500"}>
              Net Worth
            </Text>
            <Heading size={"2xl"}>
              <FormatNumber
                value={totalBalance}
                style="currency"
                currency="eur"
              />
            </Heading>
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
              Total Balance
            </Text>
            <Heading size={"2xl"}>
              <FormatNumber
                value={totalBalance}
                style="currency"
                currency="eur"
              />
            </Heading>
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
                as={RiHandCoinLine}
              />
            </Box>
          </Flex>

          <Flex direction={"column"}>
            <Text fontSize={"sm"} color={"gray.500"}>
              Total Debts
            </Text>
            <Heading size={"2xl"}>
              <FormatNumber
                value={totalBalance}
                style="currency"
                currency="eur"
              />
            </Heading>
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
                as={LuLandmark}
              />
            </Box>
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"sm"} color={"gray.500"}>
              Top Banks
            </Text>
            <List.Root as="ol" colorPalette={"teal"}>
              {topBanks.map((bank) => (
                <List.Item key={bank.Id + "-top"}>
                  <List.Indicator color={"teal.100"} />
                  {bank.Name}:{" "}
                  <FormatNumber
                    value={bank.Balance ?? 0}
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

export default BanksKPIs;
