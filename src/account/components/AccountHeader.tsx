import { Box, Flex, Show, Text } from "@chakra-ui/react";
import TimePeriodMenu from "../../common/components/TimePeriodMenu";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useAccountStore from "../hooks/useAccountStore";
import NewAccountDrawer from "../../accounts/components/NewAccountDrawer";
import MonthlyMenu from "../../common/components/MonthlyMenu";
import useMonthStore from "../../common/hooks/useMonthStore";

interface Props {
  name: string;
}
const AccountHeader = ({ name }: Props) => {
  const { period, setPeriod } = usePeriodStore();
  const { month, setMonth } = useMonthStore();
  const { account } = useAccountStore();
  return (
    <Box borderRadius={"md"} px={4} pt={4}>
      <Flex align="center" justify="space-between">
        {/* Logo and Page Title */}
        <Flex align="center">
          <Text fontSize="2xl" fontWeight="bold" color="teal.700">
            {name}
          </Text>
        </Flex>

        <Flex
          direction={"row"}
          gap={2}
          alignItems={"flex-start"}
          justifyItems={"flex-end"}
        >
          <NewAccountDrawer account={account} />
          <TimePeriodMenu period={period} setPeriod={setPeriod} />
          <Show when={period === "Monthly"}>
            <MonthlyMenu month={month} setMonth={setMonth} />
          </Show>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AccountHeader;
