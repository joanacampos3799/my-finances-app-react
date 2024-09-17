import { Box, FormatNumber, HStack, Icon, Stack } from "@chakra-ui/react";
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "../../components/ui/checkbox-card";
import { FaMoneyBills } from "react-icons/fa6";
import { useState } from "react";
import Account from "../Account";

interface Props {
  account: Account;
  toDelete: Account[];
  setToDelete: React.Dispatch<React.SetStateAction<Account[]>>;
}
const DeleteAccountCard = ({ account, setToDelete, toDelete }: Props) => {
  const [checked, setChecked] = useState(false);
  const handleCheck = (check: boolean) => {
    if (check) setToDelete([...toDelete, account]);
    else setToDelete(toDelete.filter((a) => a.Id !== account.Id));
    setChecked(check);
  };
  return (
    <CheckboxCardRoot
      colorPalette="red"
      checked={checked}
      onCheckedChange={(e) => handleCheck(!!e.checked)}
    >
      <CheckboxCardControl>
        <Stack padding={3}>
          <CheckboxCardLabel>
            <HStack>
              <Icon boxSize={4}>
                <FaMoneyBills />
              </Icon>
              {account.Name}
            </HStack>
          </CheckboxCardLabel>

          <Box paddingTop={6}>
            <FormatNumber
              value={account.Balance ?? 0}
              style="currency"
              currency="EUR"
            />
          </Box>
        </Stack>
      </CheckboxCardControl>
    </CheckboxCardRoot>
  );
};

export default DeleteAccountCard;
