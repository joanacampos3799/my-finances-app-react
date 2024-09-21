import { useRef, useState, useEffect } from "react";
import { FormatNumber, HStack, Input } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../../../components/ui/data-list";
import { accountTypes } from "../../../common/constants";
import { Tag } from "../../../components/ui/tag";
import { useUpdateAccount } from "../../hooks/useUpdateAccount";
import useBanks from "../../hooks/useBanks";
import useAccount from "../../hooks/useAccount";
import DialogComponent from "../../../common/components/DialogComponent";
import RadioMenu from "../../../common/components/RadioMenu";
import CheckBoxMenu from "../../../common/components/CheckBoxMenu";
import NumberInput from "../../../common/components/NumberInput";
import { HelperEntity, HelperEnum } from "../../../common/helper";

interface checboxItem {
  data: {
    Id: number;
    Name: string;
  };
  checked: boolean;
}

interface Props {
  id: number;
}

const AccountDetails = ({ id }: Props) => {
  const account = useAccount(id); // Fetch the account data
  const updateAccount = useUpdateAccount();
  const { data: banks } = useBanks();

  const nameRef = useRef<HTMLInputElement>(null);

  // Initialize states with default values
  const [updating, setUpdating] = useState(false);
  const [initialBalance, setInitialBalance] = useState(0);
  const [selectedBank, setSelectedBank] = useState("0");
  const [selectedAccountTypes, setSelectedAccountTypes] = useState<
    checboxItem[]
  >([]);

  // useEffect to update states when the account data is fetched
  useEffect(() => {
    if (account) {
      setInitialBalance(account.InitialBalance ?? 0); // Update initial balance
      setSelectedBank("" + (account.bankId ?? 0)); // Set the selected bank
      setSelectedAccountTypes(
        new HelperEnum().getMappedCheckboxEnum(accountTypes, account.Types)
      ); // Set account types
    }
  }, [account]); // Runs whenever the account changes

  const handleUpdate = () => {
    const bank = banks.find((b) => b.Id === +selectedBank) ?? undefined;

    updateAccount({
      Id: account.Id,
      userId: account.userId,
      Balance: account.Balance,
      Name: nameRef.current?.value || account.Name,
      bankId: bank?.Id,
      bankName: bank?.Name,
      InitialBalance: initialBalance,
      Types: selectedAccountTypes
        .filter((t) => t.checked)
        .map((at) => at.data.Id),
    });

    setUpdating(false);
  };

  if (!account) return null; // Handle case where account data is not yet available

  return (
    <DialogComponent
      size="lg"
      name={account.Name}
      updating={updating}
      handleUpdate={handleUpdate}
      setUpdating={setUpdating}
      isAlert={false}
    >
      <DataListRoot>
        <DataListItem label="Account Name" value={updating ? "" : account.Name}>
          {updating && <Input ref={nameRef} placeholder={account.Name} />}
        </DataListItem>

        <DataListItem label="Current Balance" value="">
          <FormatNumber
            value={account.Balance ?? 0}
            style="currency"
            currency="EUR"
          />
        </DataListItem>

        <DataListItem label="Initial Balance" value="">
          {updating ? (
            <NumberInput
              number={initialBalance}
              setNumber={setInitialBalance}
              isCurrency
            />
          ) : (
            <FormatNumber
              value={account.InitialBalance ?? 0}
              style="currency"
              currency="EUR"
            />
          )}
        </DataListItem>

        <DataListItem label="Associated Bank" value="">
          {updating ? (
            <RadioMenu
              data={new HelperEntity().getMappedRadioEntity(banks)}
              selectedId={selectedBank}
              setSelectedId={setSelectedBank}
              placeholder="a bank"
            />
          ) : (
            account.bankName && <span>{account.bankName}</span>
          )}
        </DataListItem>

        <DataListItem label="Account Type(s)" value="">
          {updating ? (
            <CheckBoxMenu
              items={selectedAccountTypes}
              setItems={setSelectedAccountTypes}
              name={"Account Types"}
            />
          ) : (
            <HStack>
              {accountTypes
                .filter((at) => account.Types.includes(at.id))
                .map((i) => (
                  <Tag key={i.id} rounded="md" variant="solid" pe="2">
                    {i.name}
                  </Tag>
                ))}
            </HStack>
          )}
        </DataListItem>
      </DataListRoot>
    </DialogComponent>
  );
};

export default AccountDetails;
