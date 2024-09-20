import { Box, FormatNumber, HStack, Icon } from "@chakra-ui/react";
import { FaBuildingColumns } from "react-icons/fa6";
import BankList from "../../../manage-banks-accounts/models/BankList";

interface Props {
  bank: BankList;
}
const BankComponent = ({ bank }: Props) => {
  return (
    <Box>
      <HStack>
        <Icon boxSize={4}>
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
