import React, { Dispatch, SetStateAction } from "react";
import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import { Button } from "../../components/ui/button";
import { LuChevronDown } from "react-icons/lu";

interface obj {
  id: number;
  name: string;
}

interface Props<T extends obj> {
  data: T[];
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}
const RadioMenu = <T extends obj>({
  data,
  selectedId,
  setSelectedId,
  placeholder,
}: Props<T>) => {
  return (
    <MenuRoot closeOnSelect={true}>
      <MenuTrigger asChild>
        <Button
          fontWeight={"normal"}
          variant={"outline"}
          justifyContent={"space-between"}
          width={"full"}
        >
          {data.find((d) => d.id === +selectedId)?.name ??
            `Select ${placeholder}`}
          <LuChevronDown />
        </Button>
      </MenuTrigger>
      <MenuContent minW="25rem" portalled={false} width={"full"}>
        <MenuRadioItemGroup
          value={selectedId}
          onValueChange={(e) => setSelectedId(e.value)}
        >
          {data.map((b) => (
            <MenuRadioItem key={b.id} value={"" + b.id}>
              {b.name}
            </MenuRadioItem>
          ))}
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  );
};

export default RadioMenu;
