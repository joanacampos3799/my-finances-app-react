import {
  Box,
  FormatNumber,
  Heading,
  HStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "../../components/ui/checkbox-card";
import { FaBuildingColumns } from "react-icons/fa6";
import { Bank } from "../Bank";
import { useState } from "react";

interface Props {
  bank: Bank;
  toDelete: Bank[];
  setToDelete: React.Dispatch<React.SetStateAction<Bank[]>>;
}
const DeleteBankCard = ({ bank, setToDelete, toDelete }: Props) => {
  const [checked, setChecked] = useState(false);
  const handleCheck = (check: boolean) => {
    if (check) setToDelete([...toDelete, bank]);
    else setToDelete(toDelete.filter((b) => b.Id !== bank.Id));
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
                <FaBuildingColumns />
              </Icon>
              {bank.Name}
            </HStack>
          </CheckboxCardLabel>

          <Box paddingTop={6}>
            <FormatNumber
              value={bank.Balance ?? 0}
              style="currency"
              currency="EUR"
            />
          </Box>
        </Stack>
      </CheckboxCardControl>
    </CheckboxCardRoot>
  );
};

export default DeleteBankCard;
