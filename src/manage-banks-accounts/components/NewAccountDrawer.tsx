import { useRef, useState } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { accountTypes } from "../../common/constants";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Box, Button, Card, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";
import { FaPlus } from "react-icons/fa6";
import useAddAccount from "../hooks/useAddAccount";
import {
  NumberInputField,
  NumberInputRoot,
} from "../../components/ui/number-input";
import useBanks from "../hooks/useBanks";
import { HelperEntity } from "../../common/helper";
import { Bank } from "../Bank";
import EnumType from "../../common/EnumType";
import {
  MenuCheckboxItem,
  MenuContent,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import { LuCheck, LuChevronDown } from "react-icons/lu";

interface Props {
  isEmpty: boolean;
}

interface AccountTypeSelected {
  accountType: EnumType;
  checked: boolean;
}
const NewAccountDrawer = ({ isEmpty }: Props) => {
  const { userId } = useLoginData();
  const { data: banks } = useBanks();
  const nameRef = useRef<HTMLInputElement>(null);
  const [ib, setIb] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedBank, setSelectedBank] = useState(["0"]);
  const initialState: AccountTypeSelected[] = accountTypes.map((at) => {
    const mapped: AccountTypeSelected = { accountType: at, checked: false };
    return mapped;
  });
  const [selectedAccountTypes, setSelectedAccountTypes] =
    useState(initialState);
  const addAccount = useAddAccount(() => {
    if (nameRef.current) nameRef.current.value = "";
    setOpenDrawer(false);
  });
  const banksSelect = new HelperEntity<Bank>().getMappedEntity(banks);

  return (
    <DrawerRoot
      open={openDrawer}
      size="sm"
      placement="end"
      initialFocusEl={() => nameRef.current}
      onOpenChange={(e) => setOpenDrawer(e.open)}
    >
      <DrawerBackdrop position="fixed" />
      <DrawerTrigger asChild>
        {isEmpty ? (
          <Button>Add Account</Button>
        ) : (
          <Card.Root variant={"elevated"}>
            <Card.Body>
              <Button variant={"plain"} width={"full"} height={"full"}>
                <FaPlus />
              </Button>
            </Card.Body>
          </Card.Root>
        )}
      </DrawerTrigger>
      <DrawerContent offset="4" rounded="md">
        <DrawerCloseTrigger />
        <DrawerHeader>Add a new Account</DrawerHeader>

        <DrawerBody>
          <form
            id="new-account-form"
            onSubmit={(e) => {
              e.preventDefault();

              const bank =
                +selectedBank[0] > 0
                  ? banks.find((b) => b.Id === +selectedBank[0])
                  : undefined;

              if (nameRef.current && nameRef.current.value) {
                addAccount({
                  Name: nameRef.current?.value,
                  bankId: bank?.Id,
                  bankName: bank?.Name,
                  Types: selectedAccountTypes
                    .filter((t) => t.checked)
                    .map((at) => at.accountType.id),
                  userId: userId!!,
                  InitialBalance: ib,
                  Balance: ib,
                });
              }
            }}
          >
            <Stack>
              <Box>
                <Field label="Name" required>
                  <Input
                    ref={nameRef}
                    id="name"
                    placeholder="Please enter Account name"
                  />
                </Field>
              </Box>
              <Box>
                <Field label="Initial Balance">
                  <NumberInputRoot
                    pattern="[0-9]*(,[0-9]+)?&nbsp;€"
                    locale="pt-PT"
                    width={"full"}
                    value={"" + ib}
                    onValueChange={(e) => setIb(e.valueAsNumber)}
                    defaultValue="0"
                    formatOptions={{
                      style: "currency",
                      currency: "EUR",
                    }}
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Field>
              </Box>

              <Box paddingTop="5px">
                <SelectRoot
                  items={banksSelect}
                  variant="outline"
                  value={selectedBank}
                  onValueChange={(e) => setSelectedBank(e.value)}
                  positioning={{ sameWidth: true, placement: "bottom" }}
                >
                  <SelectLabel>Select a Bank </SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select account's bank" />
                  </SelectTrigger>
                  <SelectContent portalled={false} width="full">
                    {banksSelect?.map((b) => (
                      <SelectItem item={b} key={b.value}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Box>
              <Field label="Account Types">
                <MenuRoot closeOnSelect={false}>
                  <MenuTrigger asChild>
                    <Button
                      fontWeight={"normal"}
                      variant={"outline"}
                      justifyContent={"space-between"}
                      width={"full"}
                    >
                      Choose the account types
                      <LuChevronDown />
                    </Button>
                  </MenuTrigger>
                  <MenuContent minW="10rem" portalled={false} width={"full"}>
                    {selectedAccountTypes.map((sat) => (
                      <MenuCheckboxItem
                        justifyContent={"space-between"}
                        key={sat.accountType.id}
                        value={"" + sat.accountType.id}
                        checked={sat.checked}
                        onCheckedChange={() =>
                          setSelectedAccountTypes(
                            selectedAccountTypes.map((selected) =>
                              selected.accountType.id === sat.accountType.id
                                ? { ...selected, checked: !sat.checked }
                                : selected
                            )
                          )
                        }
                      >
                        {sat.accountType.name}
                        {sat.checked && <LuCheck />}
                      </MenuCheckboxItem>
                    ))}
                  </MenuContent>
                </MenuRoot>
              </Field>
            </Stack>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => setOpenDrawer(false)}>
            Cancel
          </Button>
          <Button type="submit" form="new-account-form">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default NewAccountDrawer;
