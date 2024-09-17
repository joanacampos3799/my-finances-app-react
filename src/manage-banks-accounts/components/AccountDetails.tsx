import { useRef, useState } from "react";
import Account from "../Account";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { LuCheck, LuChevronDown, LuMaximize2 } from "react-icons/lu";
import {
  DrawerFooter,
  FormatNumber,
  Heading,
  HStack,
  Icon,
  Input,
} from "@chakra-ui/react";
import { FaMoneyBills, FaPen } from "react-icons/fa6";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import { accountTypes } from "../../common/constants";
import { Tag } from "../../components/ui/tag";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import {
  NumberInputField,
  NumberInputRoot,
} from "../../components/ui/number-input";
import { HelperEntity } from "../../common/helper";
import { Bank } from "../Bank";
import useBanks from "../hooks/useBanks";
import {
  MenuCheckboxItem,
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import EnumType from "../../common/EnumType";

interface Props {
  account: Account;
}

interface AccountTypeSelected {
  accountType: EnumType;
  checked: boolean;
}
const AccountDetails = ({ account }: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [updating, setUpdating] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const [initialBalance, setInitialBalance] = useState(
    account.InitialBalance ?? 0
  );
  const updateAccount = useUpdateAccount();
  const { data: banks } = useBanks();
  const [selectedBank, setSelectedBank] = useState("" + (account.bankId ?? 0));
  const banksSelect = new HelperEntity<Bank>().getMappedEntity(banks);
  const initialState: AccountTypeSelected[] = accountTypes.map((at) => {
    const mapped: AccountTypeSelected = {
      accountType: at,
      checked: account.Types.includes(at.id),
    };
    return mapped;
  });
  const [selectedAccountTypes, setSelectedAccountTypes] =
    useState(initialState);

  const handleUpdate = () => {
    const bank =
      +selectedBank > 0
        ? banks.find((b) => b.Id === +selectedBank[0])
        : undefined;
    updateAccount({
      Id: account.Id,
      userId: account.userId,
      Balance: account.Balance,
      Name:
        nameRef.current?.value && nameRef.current.value !== ""
          ? nameRef.current.value
          : account.Name,
      bankId: bank?.Id,
      bankName: bank?.Name,
      InitialBalance: initialBalance,
      Types: selectedAccountTypes
        .filter((t) => t.checked)
        .map((at) => at.accountType.id),
    });
    setUpdating(false);
  };
  return (
    <DrawerRoot
      open={openDrawer}
      size="sm"
      placement="start"
      onOpenChange={(e) => setOpenDrawer(e.open)}
    >
      <DrawerBackdrop position="fixed" />
      <DrawerTrigger asChild>
        <Button variant={"ghost"}>
          <LuMaximize2 />
        </Button>
      </DrawerTrigger>
      <DrawerContent offset="4" rounded="md">
        <DrawerCloseTrigger />
        <DrawerHeader>
          <HStack>
            <Icon boxSize={4}>
              <FaMoneyBills />
            </Icon>
            <Heading>{account.Name}</Heading>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <DataListRoot>
            {!updating ? (
              <DataListItem label="Account Name" value={account.Name} />
            ) : (
              <DataListItem label="Account Name" value={""}>
                <Input ref={nameRef} placeholder={account.Name} />
              </DataListItem>
            )}
            {!updating && (
              <DataListItem label="Current Balance" value={""}>
                <FormatNumber
                  value={account.Balance ?? 0}
                  style="currency"
                  currency="EUR"
                />
              </DataListItem>
            )}
            <DataListItem label="Initial Balance" value={""}>
              {!updating ? (
                <FormatNumber
                  value={account.InitialBalance ?? 0}
                  style="currency"
                  currency="EUR"
                />
              ) : (
                <NumberInputRoot
                  pattern="[0-9]*(,[0-9]+)?&nbsp;€"
                  locale="pt-PT"
                  width={"full"}
                  value={"" + initialBalance}
                  onValueChange={(e) => setInitialBalance(e.valueAsNumber)}
                  defaultValue="0"
                  formatOptions={{
                    style: "currency",
                    currency: "EUR",
                  }}
                >
                  <NumberInputField />
                </NumberInputRoot>
              )}
            </DataListItem>
            {!updating ? (
              account.bankId &&
              account.bankName && (
                <DataListItem
                  label="Associated Bank"
                  value={account.bankName}
                />
              )
            ) : (
              <DataListItem label="Associated Bank" value={""}>
                <MenuRoot closeOnSelect={false}>
                  <MenuTrigger asChild>
                    <Button
                      fontWeight={"normal"}
                      variant={"outline"}
                      justifyContent={"space-between"}
                      width={"full"}
                    >
                      {(account.bankName ?? selectedBank)
                        ? banks.find((b) => +selectedBank === b.Id)?.Name
                        : "Select associated bank"}
                      <LuChevronDown />
                    </Button>
                  </MenuTrigger>
                  <MenuContent minW="25rem" portalled={false} width={"full"}>
                    <MenuRadioItemGroup
                      value={selectedBank}
                      onValueChange={(e) => setSelectedBank(e.value)}
                    >
                      {banksSelect.map((b) => (
                        <MenuRadioItem value={"" + b.value}>
                          {b.label}
                        </MenuRadioItem>
                      ))}
                    </MenuRadioItemGroup>
                  </MenuContent>
                </MenuRoot>
              </DataListItem>
            )}
            {!updating ? (
              account.Types &&
              account.Types.length > 0 && (
                <DataListItem label="Account Type(s)" value={""}>
                  <HStack>
                    {accountTypes
                      .filter((at) => account.Types.includes(at.id))
                      .map((i) => (
                        <Tag key={i.id} rounded="md" variant="solid" pe="2">
                          {i.name}
                        </Tag>
                      ))}
                  </HStack>
                </DataListItem>
              )
            ) : (
              <DataListItem label="Account Type(s)" value={""}>
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
                  <MenuContent minW="25rem" portalled={false} width={"full"}>
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
              </DataListItem>
            )}
          </DataListRoot>
        </DrawerBody>
        <DrawerFooter>
          {!updating ? (
            <Button onClick={() => setUpdating(true)} variant={"outline"}>
              <FaPen /> Update
            </Button>
          ) : (
            <Button variant={"outline"} onClick={handleUpdate}>
              <LuCheck /> Done
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default AccountDetails;
