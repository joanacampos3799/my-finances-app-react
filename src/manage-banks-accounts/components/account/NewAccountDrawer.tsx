import { useRef, useState } from "react";
import { useLoginData } from "../../../auth/contexts/AuthContext";
import { accountTypes } from "../../../common/constants";
import { Box, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../../components/ui/field";
import useAddAccount from "../../hooks/useAddAccount";
import useBanks from "../../hooks/useBanks";
import { HelperEntity, HelperEnum } from "../../../common/helper";
import EnumType from "../../../common/EnumType";
import BankList from "../../models/BankList";
import DrawerComponent from "../../../common/components/DrawerComponent";
import CheckBoxMenu from "../../../common/components/CheckBoxMenu";
import RadioMenu from "../../../common/components/RadioMenu";
import useForm from "../../../common/hooks/useForm";
import AccountFormObject from "../../models/AccountFormObject";
import NumberInput from "../../../common/components/NumberInput";

const NewAccountDrawer = () => {
  const { userId } = useLoginData();
  const { data: banks } = useBanks();
  const initialState = new HelperEnum<EnumType>().getMappedCheckboxEnum(
    accountTypes
  );
  const { values, handleChange, resetForm } = useForm<AccountFormObject>({
    Name: "",
    ib: 0,
    selectedBank: "0",
    selectedAccountTypes: initialState,
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const addAccount = useAddAccount(() => resetForm());
  const banksSelect = new HelperEntity<BankList>().getMappedRadioEntity(banks);
  const [open, setOpen] = useState(false);
  return (
    <DrawerComponent
      placement={"end"}
      name={"Account"}
      formName={"new-account-form"}
      refElement={nameRef.current}
      open={open}
      setOpen={setOpen}
    >
      <form
        id="new-account-form"
        onSubmit={(e) => {
          e.preventDefault();

          const bank =
            banks.find((b) => b.Id === +values.selectedBank) ?? undefined;

          addAccount({
            Name: values.Name,
            bankId: bank?.Id,
            bankName: bank?.Name,
            Types: values.selectedAccountTypes
              .filter((t) => t.checked)
              .map((at) => at.data.Id),
            userId: userId!!,
            InitialBalance: values.ib,
            Balance: values.ib,
          });
        }}
      >
        <Stack>
          <Box>
            <Field label="Name" required>
              <Input
                ref={nameRef}
                value={values.Name}
                onChange={(e) => handleChange("Name", e.target.value)}
                id="name"
                placeholder="Please enter Account name"
              />
            </Field>
          </Box>
          <Box>
            <NumberInput
              number={values.ib}
              setNumber={(e) => handleChange("ib", e)}
              isCurrency
            />
          </Box>

          <Box paddingTop="5px">
            <RadioMenu
              hasArrow
              data={banksSelect}
              selectedId={values.selectedBank}
              setSelectedId={(v) => handleChange("selectedBank", v)}
              placeholder="a bank"
            />
          </Box>
          <Field label="Account Types">
            <CheckBoxMenu
              name={"Choose Account types"}
              items={values.selectedAccountTypes}
              setItems={(v) => handleChange("selectedAccountTypes", v)}
            />
          </Field>
        </Stack>
      </form>
    </DrawerComponent>
  );
};

export default NewAccountDrawer;
