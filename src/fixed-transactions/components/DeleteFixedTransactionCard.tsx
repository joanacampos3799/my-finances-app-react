import React, { useState } from "react";
import FixedTransaction from "../FixedTransaction";
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "../../components/ui/checkbox-card";
import { Box, FormatNumber, HStack, Icon, Stack } from "@chakra-ui/react";
import { useIconPack } from "../../common/hooks/useIconPack";

interface Props {
  fixed: FixedTransaction;
  toDelete: FixedTransaction[];
  setToDelete: React.Dispatch<React.SetStateAction<FixedTransaction[]>>;
}
const DeleteFixedTransactionCard = ({
  fixed,
  toDelete,
  setToDelete,
}: Props) => {
  const [checked, setChecked] = useState(false);
  const iconPack = useIconPack();
  const handleCheck = (check: boolean) => {
    if (check) setToDelete([...toDelete, fixed]);
    else setToDelete(toDelete.filter((a) => a.Id !== fixed.Id));
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
              <Icon
                boxSize={4}
                as={iconPack?.find((icon) => icon.name === fixed.Icon)?.icon}
              ></Icon>

              {fixed.Name}
            </HStack>
          </CheckboxCardLabel>

          <Box paddingTop={6}>
            <FormatNumber
              value={fixed.Amount}
              style="currency"
              currency="EUR"
            />
          </Box>
        </Stack>
      </CheckboxCardControl>
    </CheckboxCardRoot>
  );
};

export default DeleteFixedTransactionCard;
