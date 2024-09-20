import { useRef, useState } from "react";
import { useLoginData } from "../../../auth/contexts/AuthContext";
import { accountTypes } from "../../../common/constants";
import { Box, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../../components/ui/field";
import useAddAccount from "../../hooks/useAddAccount";
import {
  NumberInputField,
  NumberInputRoot,
} from "../../../components/ui/number-input";
import useBanks from "../../hooks/useBanks";
import { HelperEntity, HelperEnum } from "../../../common/helper";
import EnumType from "../../../common/EnumType";
import BankList from "../../models/BankList";
import DrawerComponent from "../../../common/components/DrawerComponent";
import CheckBoxMenu from "../../../common/components/CheckBoxMenu";
import RadioMenu from "../../../common/components/RadioMenu";

interface Props {
  isEmpty: boolean;
}

const NewAccountDrawer = ({ isEmpty }: Props) => {
  const { userId } = useLoginData();
  const { data: banks } = useBanks();
  const nameRef = useRef<HTMLInputElement>(null);
  const [ib, setIb] = useState(0);
  const [selectedBank, setSelectedBank] = useState("0");
  const initialState = new HelperEnum<EnumType>().getMappedCheckboxEnum(
    accountTypes
  );
  const [selectedAccountTypes, setSelectedAccountTypes] =
    useState(initialState);
  const addAccount = useAddAccount(() => {
    if (nameRef.current) nameRef.current.value = "";
    setSelectedBank("0");
    setIb(0);
    setSelectedAccountTypes(initialState);
  });
  const banksSelect = new HelperEntity<BankList>().getMappedRadioEntity(banks);

  return (
    <DrawerComponent
      isEmpty={isEmpty}
      placement={"end"}
      name={"Account"}
      formName={"new-account-form"}
      refElement={nameRef.current}
    >
      <form
        id="new-account-form"
        onSubmit={(e) => {
          e.preventDefault();

          const bank =
            +selectedBank > 0
              ? banks.find((b) => b.Id === +selectedBank)
              : undefined;

          if (nameRef.current && nameRef.current.value) {
            addAccount({
              Name: nameRef.current?.value,
              bankId: bank?.Id,
              bankName: bank?.Name,
              Types: selectedAccountTypes
                .filter((t) => t.checked)
                .map((at) => at.data.Id),
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
            <RadioMenu
              data={banksSelect}
              selectedId={selectedBank}
              setSelectedId={setSelectedBank}
              placeholder="a bank"
            />
          </Box>
          <Field label="Account Types">
            <CheckBoxMenu
              name={"Choose Account types"}
              items={selectedAccountTypes}
              setItems={setSelectedAccountTypes}
            />
          </Field>
        </Stack>
      </form>
    </DrawerComponent>
  );
};

export default NewAccountDrawer;
