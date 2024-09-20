import { useRef, useState } from "react";

import { FormatNumber, HStack, Input } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../../../components/ui/data-list";
import { accountTypes } from "../../../common/constants";
import { Tag } from "../../../components/ui/tag";
import { useUpdateAccount } from "../../hooks/useUpdateAccount";
import { HelperEntity, HelperEnum } from "../../../common/helper";

import useBanks from "../../hooks/useBanks";
import EnumType from "../../../common/EnumType";
import useAccount from "../../hooks/useAccount";
import BankList from "../../models/BankList";
import DialogComponent from "../../../common/components/DialogComponent";
import RadioMenu from "../../../common/components/RadioMenu";
import CheckBoxMenu from "../../../common/components/CheckBoxMenu";
import NumberInput from "../../../common/components/NumberInput";

interface Props {
  id: number;
}

const AccountDetails = ({ id }: Props) => {
  const account = useAccount(id);
  const [accountAux, setAccountAux] = useState(account);
  const [updating, setUpdating] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const [initialBalance, setInitialBalance] = useState(
    account.InitialBalance ?? 0
  );
  const updateAccount = useUpdateAccount();
  const { data: banks } = useBanks();
  const [selectedBank, setSelectedBank] = useState("" + (account.bankId ?? 0));
  const banksSelect = new HelperEntity<BankList>().getMappedRadioEntity(banks);

  const [selectedAccountTypes, setSelectedAccountTypes] = useState(
    new HelperEnum<EnumType>().getMappedCheckboxEnum(
      accountTypes,
      account.Types
    )
  );

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
        .map((at) => at.data.Id),
    });
    setUpdating(false);
    setAccountAux(account);
  };
  return (
    <DialogComponent
      size={"lg"}
      name={account.Name}
      isAlert={false}
      updating={updating}
      handleUpdate={handleUpdate}
      setUpdating={setUpdating}
    >
      <DataListRoot>
        {!updating ? (
          <DataListItem label="Account Name" value={account.Name} />
        ) : (
          <DataListItem label="Account Name" value={""}>
            <Input ref={nameRef} placeholder={account.Name} />
          </DataListItem>
        )}

        <DataListItem label="Current Balance" value={""}>
          <FormatNumber
            value={account.Balance ?? 0}
            style="currency"
            currency="EUR"
          />
        </DataListItem>

        <DataListItem label="Initial Balance" value={""}>
          {!updating ? (
            <FormatNumber
              value={account.InitialBalance ?? 0}
              style="currency"
              currency="EUR"
            />
          ) : (
            <NumberInput
              number={initialBalance}
              setNumber={setInitialBalance}
              isCurrency={true}
            />
          )}
        </DataListItem>
        {!updating ? (
          account.bankId !== undefined &&
          account.bankId > 0 &&
          account.bankName && (
            <DataListItem label="Associated Bank" value={account.bankName} />
          )
        ) : (
          <DataListItem label="Associated Bank" value={""}>
            <RadioMenu
              data={banksSelect}
              selectedId={selectedBank}
              setSelectedId={setSelectedBank}
              placeholder="a bank"
            />
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
            <CheckBoxMenu
              name={"Account Type(s)"}
              items={selectedAccountTypes}
              setItems={setSelectedAccountTypes}
            />
          </DataListItem>
        )}
      </DataListRoot>
    </DialogComponent>
  );
};

export default AccountDetails;
