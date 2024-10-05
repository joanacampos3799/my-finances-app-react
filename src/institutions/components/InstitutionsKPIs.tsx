import {
  Box,
  Flex,
  FormatNumber,
  Heading,
  Icon,
  List,
  Text,
} from "@chakra-ui/react";
import InstitutionList from "../model/InstitutionList";
import { LuLandmark, LuWalletCards } from "react-icons/lu";
import useInsights from "../../common/hooks/useInsights";
import BarChartComponent from "../../common/components/BarChartComponent";
import { TbCoins, TbReceipt } from "react-icons/tb";
import useAccountInsights from "../../common/hooks/useAccountInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
interface Props {
  institutions: InstitutionList[];
}
const InstitutionsKPIs = ({ institutions }: Props) => {
  const { period } = usePeriodStore();
  const { getTransactionsTotalAmount } = useInsights();
  const { isAsset, calculateAssetsAndDebts } = useAccountInsights();
  const topInstitutions = [...institutions]
    .sort((a, b) => (b.Balance ?? 0) - (a.Balance ?? 0))
    .slice(0, 3);

  const chartData = institutions.map((institution) => {
    const totalSpent = institution.Accounts.reduce(
      (total, acc) =>
        total + getTransactionsTotalAmount(acc.Transactions, period, 0),
      0
    );
    const totalIncome = institution.Accounts.reduce(
      (total, acc) =>
        total + getTransactionsTotalAmount(acc.Transactions, period, 1),
      0
    );

    return {
      institution: institution.Name,
      totalSpent: totalSpent,
      totalIncome: totalIncome,
    };
  });

  const netWorth = institutions
    .map((institution) =>
      institution.Accounts.reduce(
        (total, acc) =>
          total + (isAsset(acc.Type) ? acc.Balance : -1 * acc.Balance),
        0
      )
    )
    .reduce((total, acc) => total + acc);
  const totalBalance = institutions
    .map((institution) =>
      institution.Accounts.reduce(
        (total, acc) => total + (isAsset(acc.Type) ? acc.Balance : 0),
        0
      )
    )
    .reduce((total, acc) => total + acc);

  const totalDebts = institutions.reduce(
    (total, acc) => total + calculateAssetsAndDebts(acc.Accounts).totalDebts,
    0
  );
  return (
    <Flex direction={"row"} gap={2} mx={"10px"}>
      <Flex width={"70%"} bgColor={"white"} borderRadius={"md"}>
        <BarChartComponent
          chartData={chartData}
          xAxisDataKey="institution"
          data={[
            {
              dataKey: "totalSpent",
              label: "Total Expenses",
            },
            { dataKey: "totalIncome", label: "Total Earnings" },
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
              <FormatNumber value={netWorth} style="currency" currency="eur" />
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
              Total Assets
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
                as={TbReceipt}
              />
            </Box>
          </Flex>

          <Flex direction={"column"}>
            <Text fontSize={"sm"} color={"gray.500"}>
              Total Debts
            </Text>
            <Heading size={"2xl"}>
              <FormatNumber
                value={totalDebts}
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
              Top Institutions
            </Text>
            <List.Root as="ol" colorPalette={"teal"}>
              {topInstitutions.map((institution) => (
                <List.Item key={institution.Id + "-top"}>
                  <List.Indicator color={"teal.100"} />
                  {institution.Name}:{" "}
                  <FormatNumber
                    value={institution.Balance ?? 0}
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

export default InstitutionsKPIs;
