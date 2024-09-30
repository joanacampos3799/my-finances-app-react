import { useState, useEffect } from "react";
import { FormatNumber, HStack } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../../../components/ui/data-list";
import { accountTypes } from "../../../common/constants";
import { Tag } from "../../../components/ui/tag";
import { useUpdateAccount } from "../../hooks/useUpdateAccount";
import useBanks from "../../hooks/useBanks";
import useAccount from "../../hooks/useAccount";
import DialogComponent from "../../../common/components/DialogComponent";
import { HelperEnum } from "../../../common/helper";
import useForm from "../../../common/hooks/useForm";
import AccountFormObject from "../../models/AccountFormObject";
import AccountUpdateForm from "./AccountUpdateForm";

interface Props {
  id: number;
}

const AccountDetails = ({ id }: Props) => {
  const account = useAccount(id); // Fetch the account data
  const updateAccount = useUpdateAccount();
  const { data: banks } = useBanks();

  // Initialize states with default values
  const [updating, setUpdating] = useState(false);

  const { values, handleChange, setValues } = useForm<AccountFormObject>({
    Name: "",
    ib: 0,
    selectedBank: "0",
    selectedAccountTypes: [],
  });

  // useEffect to update states when the account data is fetched
  useEffect(() => {
    if (account) {
      setValues({
        ib: account.InitialBalance ?? 0,
        Name: account.Name,
        selectedBank: "" + (account.bankId ?? 0),
        selectedAccountTypes: new HelperEnum().getMappedCheckboxEnum(
          accountTypes,
          account.Types
        ),
      });
    }
  }, [account, setValues]); // Runs whenever the account changes

  const handleUpdate = () => {
    const bank = banks.find((b) => b.Id === +values.selectedBank) ?? undefined;

    updateAccount({
      Id: account.Id,
      userId: account.userId,
      Balance: account.Balance,
      Name: values.Name,
      bankId: bank?.Id,
      bankName: bank?.Name,
      InitialBalance: values.ib,
      Types: values.selectedAccountTypes
        .filter((t) => t.checked)
        .map((at) => at.data.Id),
    });

    setUpdating(false);
  };

  if (!account) return null; // Handle case where account data is not yet available

  return (
    <DialogComponent
      size="lg"
      title={account.Name}
      updating={updating}
      handleUpdate={handleUpdate}
      setUpdating={setUpdating}
      isAlert={false}
    >
      {updating ? (
        <AccountUpdateForm
          values={values}
          banks={banks}
          handleChange={handleChange}
        />
      ) : (
        <DataListRoot>
          <DataListItem label="Account Name" value={account.Name} />

          <DataListItem label="Current Balance" value="">
            <FormatNumber
              value={account.Balance ?? 0}
              style="currency"
              currency="EUR"
            />
          </DataListItem>

          <DataListItem label="Initial Balance" value="">
            <FormatNumber
              value={account.InitialBalance ?? 0}
              style="currency"
              currency="EUR"
            />
          </DataListItem>

          {account.bankName && (
            <DataListItem label="Associated Bank" value={account.bankName} />
          )}
          <DataListItem label="Account Type(s)" value="">
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
        </DataListRoot>
      )}
    </DialogComponent>
  );
};

export default AccountDetails;
