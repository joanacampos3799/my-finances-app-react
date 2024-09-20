import { Box, FormatNumber, HStack, Icon } from "@chakra-ui/react";
import { FaMoneyBills } from "react-icons/fa6";
import Account from "../../../manage-banks-accounts/models/Account";

interface Props {
  account: Account;
}
const AccountComponent = ({ account }: Props) => {
  return (
    <Box>
      <HStack>
        <Icon boxSize={4}>
          <FaMoneyBills />
        </Icon>

        {account.Name}
      </HStack>
      <HStack>
        <Box boxSize={4}></Box>
        <FormatNumber
          value={account.Balance ?? 0}
          style="currency"
          currency="EUR"
        />
      </HStack>
    </Box>
  );
};

export default AccountComponent;
