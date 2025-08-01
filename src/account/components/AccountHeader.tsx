import { Box, Flex, Show, Text, useBreakpointValue } from "@chakra-ui/react";
import TimePeriodMenu from "../../common/components/TimePeriodMenu";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useAccountStore from "../hooks/useAccountStore";
import NewAccountDrawer from "../../accounts/components/NewAccountDrawer";
import MonthlyMenu from "../../common/components/MonthlyMenu";
import useMonthStore from "../../common/hooks/useMonthStore";
import NavbarMobile from "../../hero/components/NavbarMobile";
import HamburgerMenu from "../../common/components/HamburgerMenu";

interface Props {
  name: string;
}
const AccountHeader = ({ name }: Props) => {
  const { period, setPeriod } = usePeriodStore();
  const { month, setMonth } = useMonthStore();
  const { account } = useAccountStore();
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Flex
      paddingTop={{ base: "0px", md: "15px" }}
      paddingX={{ base: "0px", md: "15px" }}
      flexDirection={"row"}
      alignItems={{ base: "stretch", md: "flex-start" }}
      justifyContent="space-between"
      gap={{ base: 4, md: 0 }}
    >
      {isMobile && <NavbarMobile />}
      <Flex align="center">
        <Text fontSize="2xl" fontWeight="bold" color="teal.700">
          {name}
        </Text>
      </Flex>
      {isMobile ? (
        <HamburgerMenu>
          <Flex
            direction={"column"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            <TimePeriodMenu period={period} setPeriod={setPeriod} />
            <Show when={period === "Monthly"}>
              <MonthlyMenu month={month} setMonth={setMonth} />
            </Show>
            <NewAccountDrawer account={account} />
          </Flex>
        </HamburgerMenu>
      ) : (
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
      )}
    </Flex>
  );
};

export default AccountHeader;
