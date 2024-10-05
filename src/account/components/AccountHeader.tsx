import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { LuBell, LuSearch } from "react-icons/lu";
import { Tooltip } from "../../components/ui/tooltip";
import TimePeriodMenu from "../../common/components/TimePeriodMenu";
import usePeriodStore from "../../common/hooks/usePeriodStore";

interface Props {
  name: string;
}
const AccountHeader = ({ name }: Props) => {
  const { period, setPeriod } = usePeriodStore();
  return (
    <Box borderRadius={"md"} px={4} pt={4}>
      <Flex align="center" justify="space-between">
        {/* Logo and Page Title */}
        <Flex align="center">
          <Text fontSize="2xl" fontWeight="bold" color="teal.700">
            {name}
          </Text>
        </Flex>

        {/* Search Bar */}
        <Flex flex="1" mx={4} justify="center">
          <Input
            placeholder="Search transactions..."
            size="md"
            borderRadius="md"
            variant="outline"
            mr={2}
          />
          <Button aria-label="Search" variant="outline">
            <LuSearch />
          </Button>
        </Flex>

        {/* Notifications and Profile Menu */}
        <Flex align="center">
          <Tooltip showArrow content="Notifications">
            <Button aria-label="Notifications" variant="outline" mr={4}>
              <LuBell />
            </Button>
          </Tooltip>
        </Flex>
        <Flex
          direction={"row"}
          gap={2}
          alignItems={"flex-start"}
          justifyItems={"flex-end"}
        >
          <TimePeriodMenu period={period} setPeriod={setPeriod} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default AccountHeader;
