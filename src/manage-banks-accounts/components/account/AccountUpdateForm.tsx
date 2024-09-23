import { Input } from "@chakra-ui/react";
import AccountFormObject from "../../models/AccountFormObject";
import { Field } from "../../../components/ui/field";
import NumberInput from "../../../common/components/NumberInput";
import RadioMenu from "../../../common/components/RadioMenu";
import { HelperEntity } from "../../../common/helper";
import BankList from "../../models/BankList";
import CheckBoxMenu from "../../../common/components/CheckBoxMenu";

interface Props {
  values: AccountFormObject;
  banks: BankList[];
  handleChange: (name: string, value: string | number | object) => void;
}
const AccountUpdateForm = ({ values, handleChange, banks }: Props) => {
  return (
    <>
      <Field label="Name">
        <Input
          value={values.Name}
          onChange={(e) => handleChange("Name", e.target.value)}
        />
      </Field>
      <NumberInput
        number={values.ib}
        setNumber={(v) => handleChange("ib", v)}
        isCurrency
      />
      <RadioMenu
        hasArrow
        data={new HelperEntity().getMappedRadioEntity(banks)}
        selectedId={values.selectedBank}
        setSelectedId={(v) => handleChange("selectedBank", v)}
        placeholder="a bank"
      />
      <CheckBoxMenu
        items={values.selectedAccountTypes}
        setItems={(v) => handleChange("selectedAccountTypes", v)}
        name={"Account Types"}
      />
    </>
  );
};

export default AccountUpdateForm;
