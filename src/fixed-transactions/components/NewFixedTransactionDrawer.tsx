import { useRef, useState } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import useAddFixedTransaction from "../hooks/useAddFixedTransaction";
import { movementTypes } from "../../common/constants";
import { Box, HStack, Input, Stack } from "@chakra-ui/react";
import IconPicker from "../../common/components/IconPicker";
import { Field } from "../../components/ui/field";
import useCategories from "../../categories/hooks/useCategories";
import DrawerComponent from "../../common/components/DrawerComponent";
import CategoryList from "../../categories/model/CategoryList";
import RadioMenu from "../../common/components/RadioMenu";
import CheckBoxMenu from "../../common/components/CheckBoxMenu";
import { HelperEntity } from "../../common/helper";
import NumberInput from "../../common/components/NumberInput";

interface Props {
  isEmpty: boolean;
  active: boolean;
}

const NewFixedTransactionDrawer = ({ isEmpty, active }: Props) => {
  const [icon, setIcon] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [paymentDay, setPaymentDay] = useState(1);
  const [periodicity, setPeriodicity] = useState(1);
  const [selectedTT, setSelectedTT] = useState<string>("");
  const { userId } = useLoginData();
  const ref = useRef<HTMLInputElement>(null);
  const { data: categories } = useCategories();
  const initialState = new HelperEntity<CategoryList>().getMappedCheckboxEntity(
    categories
  );
  const [selectedCategories, setSelectedCategories] = useState(initialState);

  const addFixedTransaction = useAddFixedTransaction(() => {
    setIcon("");
    setAmount(0.0);
    setPaymentDay(1);
    setPeriodicity(1);
    if (ref.current) ref.current.value = "";
    setSelectedTT("");
    setSelectedCategories(initialState);
  });

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
          if (ref.current && ref.current.value) {
            addFixedTransaction({
              Name: ref.current?.value,
              Icon: icon,
              Amount: amount,
              transactionType: movementTypes[+selectedTT].id,
              userId: userId!!,
              PaymentDay: paymentDay,
              Periodicity: periodicity,
              active: active,
              categories: selectedCategories
                .filter((cat) => cat.checked)
                .map((cat) => cat.data.Id!!),
            });
          }
        }}
      >
        <Stack>
          <HStack width={"full"}>
            <Box paddingBottom={2} width={"10rem"}>
              <Field label="Choose an Icon" required>
                <Box paddingTop={"2px"} paddingStart={4}>
                  <IconPicker
                    iconSize={7}
                    iconParam={icon}
                    setIconParam={setIcon}
                  />
                </Box>
              </Field>
            </Box>

            <Box width={"full"}>
              <Field label="Name" required>
                <Input
                  ref={ref}
                  id="name"
                  placeholder="Please enter fixed transaction name"
                />
              </Field>
            </Box>
          </HStack>
          <NumberInput
            number={amount}
            setNumber={setAmount}
            isCurrency={true}
            label={"Amount"}
          />
          <Box paddingTop="5px">
            <RadioMenu
              data={movementTypes.filter((m) => m.id !== 0)}
              placeholder="Transaction Type"
              selectedId={selectedTT}
              setSelectedId={setSelectedTT}
            />
          </Box>

          <Box>
            <Field label="Choose the categories">
              <CheckBoxMenu
                name={"Category"}
                items={selectedCategories}
                setItems={setSelectedCategories}
              />
            </Field>
          </Box>
          <HStack>
            <NumberInput
              number={paymentDay}
              setNumber={setPaymentDay}
              isCurrency={false}
              label="Payment Day"
              helperText="Day of the month"
            />
            <NumberInput
              number={periodicity}
              setNumber={setPeriodicity}
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
