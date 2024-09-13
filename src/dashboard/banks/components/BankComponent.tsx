import { Box, FormatNumber, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { FaBuildingColumns } from "react-icons/fa6";
import { Bank } from "../../../manage-banks-accounts/Bank";

interface Props {
  bank: Bank;
}
const BankComponent = ({ bank }: Props) => {
  return (
    <Box>
      <HStack>
        <Icon asChild boxSize={4}>
          <FaBuildingColumns />
        </Icon>

        {bank.Name}
      </HStack>
      <HStack>
        <Box boxSize={4}></Box>
        <FormatNumber
          value={bank.Balance ?? 0}
          style="currency"
          currency="EUR"
        />
      </HStack>
    </Box>
  );
};

export default BankComponent;
