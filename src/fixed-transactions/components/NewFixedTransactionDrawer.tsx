import { useRef } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import useAddFixedTransaction from "../hooks/useAddFixedTransaction";
import { movementTypes } from "../../common/constants";
import { Box, HStack, Input, Stack } from "@chakra-ui/react";
import IconPicker from "../../common/components/IconPicker";
import { Field } from "../../components/ui/field";
import useCategories from "../../categories/hooks/useCategories";
import DrawerComponent from "../../common/components/DrawerComponent";
import Category from "../../categories/model/Category";
import RadioMenu from "../../common/components/RadioMenu";
import CheckBoxMenu from "../../common/components/CheckBoxMenu";
import { HelperEntity } from "../../common/helper";
import NumberInput from "../../common/components/NumberInput";
import useForm from "../../common/hooks/useForm";
import FixedTransactionFormObject from "../model/FixedTransactionFormObject";

interface Props {
  isEmpty: boolean;
  active: boolean;
}

const NewFixedTransactionDrawer = ({ isEmpty, active }: Props) => {
  const { userId } = useLoginData();
  const ref = useRef<HTMLInputElement>(null);
  const { data: categories } = useCategories();
  const initialState = new HelperEntity<Category>().getMappedCheckboxEntity(
    categories
  );
  const { values, handleChange, resetForm } =
    useForm<FixedTransactionFormObject>({
      Name: "",
      icon: "",
      amount: 0,
      paymentDay: 1,
      periodicity: 1,
      selectedTT: "",
      selectedCategories: initialState,
    });
  const addFixedTransaction = useAddFixedTransaction(() => resetForm());

  return (
    <DrawerComponent
      isEmpty={isEmpty}
      placement={"end"}
      name="Fixed Transactions"
      formName="new-fixed-form"
      refElement={ref.current}
    >
      <form
        id="new-fixed-form"
        onSubmit={(e) => {
          e.preventDefault();

          addFixedTransaction({
            Name: values.Name,
            Icon: values.icon,
            Amount: values.amount,
            transactionType: movementTypes[+values.selectedTT].id,
            userId: userId!!,
            PaymentDay: values.paymentDay,
            Periodicity: values.periodicity,
            active: active,
            categories: values.selectedCategories
              .filter((cat) => cat.checked)
              .map((cat) => cat.data.Id!!),
          });
        }}
      >
        <Stack>
          <HStack width={"full"}>
            <Box paddingBottom={2} width={"10rem"}>
              <Field label="Choose an Icon" required>
                <Box paddingTop={"2px"} paddingStart={4}>
                  <IconPicker
                    iconSize={7}
                    iconParam={values.icon}
                    setIconParam={(i) => handleChange("icon", i)}
                  />
                </Box>
              </Field>
            </Box>

            <Box width={"full"}>
              <Field label="Name" required>
                <Input
                  ref={ref}
                  value={values.Name}
                  onChange={(e) => handleChange("Name", e.target.value)}
                  id="name"
                  placeholder="Please enter fixed transaction name"
                />
              </Field>
            </Box>
          </HStack>
          <NumberInput
            number={values.amount}
            setNumber={(val) => handleChange("amount", val)}
            isCurrency={true}
            label={"Amount"}
          />
          <RadioMenu
            hasArrow
            data={movementTypes.filter((m) => m.id !== 0)}
            placeholder="Transaction Type"
            selectedId={values.selectedTT}
            setSelectedId={(v) => handleChange("selectedTT", v)}
          />

          <Field label="Choose the categories">
            <CheckBoxMenu
              name={"Category"}
              items={values.selectedCategories}
              setItems={(val) => handleChange("selectedCategories", val)}
            />
          </Field>

          <HStack>
            <NumberInput
              number={values.paymentDay}
              setNumber={(e) => handleChange("paymentDay", e)}
              isCurrency={false}
              label="Payment Day"
              helperText="Day of the month"
            />
            <NumberInput
              number={values.periodicity}
              setNumber={(v) => handleChange("periodicity", v)}
              isCurrency={false}
              label="Periodicity"
              helperText="In months"
            />
          </HStack>
        </Stack>
      </form>
    </DrawerComponent>
  );
};

export default NewFixedTransactionDrawer;
