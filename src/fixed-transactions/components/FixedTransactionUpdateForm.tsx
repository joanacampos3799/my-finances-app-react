import FixedTransactionFormObject from "../model/FixedTransactionFormObject";
import { HStack, Input } from "@chakra-ui/react";
import IconPicker from "../../common/components/IconPicker";
import NumberInput from "../../common/components/NumberInput";
import RadioMenu from "../../common/components/RadioMenu";
import { movementTypes } from "../../common/constants";
import CheckBoxMenu from "../../common/components/CheckBoxMenu";
interface Props {
  handleChange: (name: string, value: string | number | object) => void;
  values: FixedTransactionFormObject;
}
const FixedTransactionUpdateForm = ({ handleChange, values }: Props) => {
  return (
    <>
      <HStack>
        <IconPicker
          iconParam={values.icon}
          iconSize={4}
          setIconParam={(i) => handleChange("icon", i)}
        />
        <Input
          value={values.Name}
          onChange={(e) => handleChange("Name", e.target.value)}
        />
      </HStack>
      <NumberInput
        number={values.amount}
        setNumber={(v) => handleChange("amount", v)}
        isCurrency
      />
      <NumberInput
        number={values.paymentDay}
        setNumber={(v) => handleChange("paymentDay", v)}
        helperText="Day of the month"
        isCurrency={false}
      />
      <NumberInput
        number={values.periodicity}
        setNumber={(v) => handleChange("periodicity", v)}
        helperText="In months"
        isCurrency={false}
      />
      <RadioMenu
        data={movementTypes.filter((m) => m.id !== 0)}
        placeholder="Transaction Type"
        selectedId={values.selectedTT}
        setSelectedId={(v) => handleChange("selectedTT", v)}
      />
      <CheckBoxMenu
        name="Category"
        items={values.selectedCategories}
        setItems={(e) => handleChange("selectedCategories", e)}
      />
    </>
  );
};

export default FixedTransactionUpdateForm;
