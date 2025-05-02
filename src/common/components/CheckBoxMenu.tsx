import {
  MenuCheckboxItem,
  MenuContent,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import { Button } from "../../components/ui/button";
import { LuCheck, LuChevronDown } from "react-icons/lu";

export interface TObj {
  Id?: number;
  Name: string;
}

export interface checkObj<T extends TObj> {
  checked: boolean;
  data: T;
}
interface Props<T extends TObj> {
  name: string;
  items: checkObj<T>[];
  setItems: (value: checkObj<T>[]) => void;
}
const CheckBoxMenu = <T extends TObj>({ name, items, setItems }: Props<T>) => {
  return (
    <MenuRoot closeOnSelect={false}>
      <MenuTrigger asChild>
        <Button
          fontWeight={"normal"}
          variant={"outline"}
          borderColor={"teal.500"}
          justifyContent={"space-between"}
          width={"full"}
        >
          Select {name}
          <LuChevronDown />
        </Button>
      </MenuTrigger>
      <MenuContent
        minW="25rem"
        zIndex="dropdown"
        maxHeight={"30vh"}
        overflowY={"auto"}
        portalled={false}
        width={"full"}
      >
        {items.map((item) => (
          <MenuCheckboxItem
            justifyContent={"space-between"}
            key={item.data.Id + "-checkMenu"}
            value={"" + item.data.Id}
            checked={item.checked}
            onCheckedChange={() =>
              setItems(
                items.map((selected) =>
                  selected.data.Id === item.data.Id
                    ? { ...selected, checked: !item.checked }
                    : selected
                )
              )
            }
          >
            {item.data.Name}
            {item.checked && <LuCheck />}
          </MenuCheckboxItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};

export default CheckBoxMenu;
