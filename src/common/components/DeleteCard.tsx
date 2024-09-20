import { PropsWithChildren, useState } from "react";
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "../../components/ui/checkbox-card";
import { Box, HStack, Icon, Stack } from "@chakra-ui/react";
import { useIconPack } from "../hooks/useIconPack";

interface Props<T> {
  data: T;
  icon: string;
  toDelete: T[];
  setToDelete: React.Dispatch<React.SetStateAction<T[]>>;
}

interface Entity {
  Id: number;
  Name: string;
}

const DeleteCard = <T extends Entity>({
  data,
  icon,
  toDelete,
  setToDelete,
  children,
}: PropsWithChildren<Props<T>>) => {
  const [checked, setChecked] = useState(false);
  const iconPack = useIconPack();
  const handleCheck = (check: boolean) => {
    if (check) setToDelete([...toDelete, data]);
    else setToDelete(toDelete.filter((a) => a.Id !== data.Id));
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
                as={iconPack?.find((i) => i.name === icon)?.icon}
              ></Icon>

              {data.Name}
            </HStack>
          </CheckboxCardLabel>

          <Box paddingTop={6}>{children}</Box>
        </Stack>
      </CheckboxCardControl>
    </CheckboxCardRoot>
  );
};

export default DeleteCard;
