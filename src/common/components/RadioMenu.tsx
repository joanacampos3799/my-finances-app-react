import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import { Button } from "../../components/ui/button";
import { LuChevronDown } from "react-icons/lu";
import { ConditionalValue } from "@chakra-ui/react";

interface obj {
  id: number;
  name: string;
}

interface Props<T extends obj> {
  data: T[];
  selectedId: string;
  setSelectedId: (value: string) => void;
  placeholder?: string;
  width?: string;
  minW?: string;
  color?: boolean;
  hasArrow: boolean;
  variant?: ConditionalValue<
    "outline" | "solid" | "subtle" | "surface" | "ghost" | "plain" | undefined
  >;
}
const RadioMenu = <T extends obj>({
  data,
  selectedId,
  setSelectedId,
  placeholder,
  variant,
  width,
  minW,
  color,
  hasArrow,
}: Props<T>) => {
  return (
    <MenuRoot closeOnSelect={true}>
      <MenuTrigger asChild>
        <Button
          padding={!hasArrow ? -1 : 4}
          fontWeight={"normal"}
          variant={variant ?? "outline"}
          justifyContent={"space-between"}
          width={width ?? "full"}
          colorPalette={color ? "teal" : undefined}
          color={color ? "teal.600" : undefined}
        >
          {data.find((d) => d.id === +selectedId)?.name ??
            `Select ${placeholder}`}
          {hasArrow && <LuChevronDown />}
        </Button>
      </MenuTrigger>
      <MenuContent
        minW={minW ?? width ?? "25rem"}
        portalled={false}
        width={width ?? "full"}
      >
        <MenuRadioItemGroup
          zIndex="dropdown"
          maxHeight={"30vh"}
          overflowY={"auto"}
          value={selectedId}
          onValueChange={(e) => setSelectedId(e.value)}
        >
          {data.map((b) => (
            <MenuRadioItem key={b.id + "-radioItem"} value={"" + b.id}>
              {b.name}
            </MenuRadioItem>
          ))}
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  );
};

export default RadioMenu;
