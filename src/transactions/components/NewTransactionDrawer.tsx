import { useRef, useState } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import useCategories from "../../categories/hooks/useCategories";
import { HelperEntity } from "../../common/helper";
import Category from "../../categories/model/Category";
import useAddTransaction from "../hooks/useAddTransaction";
import DrawerComponent from "../../common/components/DrawerComponent";
import { movementTypes } from "../../common/constants";

import {
  Box,
  FormatNumber,
  HStack,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import NumberInput from "../../common/components/NumberInput";
import RadioMenu from "../../common/components/RadioMenu";
import CheckBoxMenu from "../../common/components/CheckBoxMenu";
import FixedTransactionList from "../../fixed-transactions/model/FixedTransactionsList";
import { Switch } from "../../components/ui/switch";
import { LuCheck, LuX } from "react-icons/lu";
import useFixedTransactions from "../../fixed-transactions/hooks/useFixedTransactions";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import TagComponent from "../../common/components/TagComponent";
import useForm from "../../common/hooks/useForm";
import useAccounts from "../../manage-banks-accounts/hooks/useAccounts";
import AccountList from "../../manage-banks-accounts/models/AccountList";
import DatePicker from "../../common/components/DatePicker";
import { format } from "date-fns";
import TransactionFormObject from "../model/TransactionFormObject";

interface Props {
  isEmpty: boolean;
}

const NewTransactionDrawer = ({ isEmpty }: Props) => {
  const [isFixedTransaction, setIsFixedTransaction] = useState(false);
  const { userId } = useLoginData();
  const { data: categories } = useCategories();
  const { data: fixedTransactions } = useFixedTransactions();
  const { data: accounts } = useAccounts();
  const initialState = new HelperEntity<Category>().getMappedCheckboxEntity(
    categories
  );
  const ref = useRef(null);
  const { values, resetForm, handleChange } = useForm<TransactionFormObject>({
    amount: 0,
    date: new Date(),
    description: "",
    selectedTT: "",
    selectedAccount: "",
    Name: "",
    selectedFixedId: "",
    selectedCategories: initialState,
  });
  const addTransaction = useAddTransaction(() => resetForm());

  const fixedSelect =
    new HelperEntity<FixedTransactionList>().getMappedRadioEntity(
      fixedTransactions
    );

  const accountsSelect = new HelperEntity<AccountList>().getMappedRadioEntity(
    accounts
  );

  return (
    <DrawerComponent
      isEmpty={isEmpty}
      placement={"end"}
      name="Transaction"
      formName="new-transaction-form"
      refElement={ref.current}
    >
      <form
        id="new-transaction-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(values);
          addTransaction({
            Name: values.Name,
            Amount: values.amount,
            transactionType: movementTypes[+values.selectedTT].id,
            userId: userId!!,
            Date: format(values.date, "dd/MM/yyyy"),
            fixedTransactionId:
              values.selectedFixedId !== ""
                ? +values.selectedFixedId
                : undefined,
            Description: values.description,
            accountId: +values.selectedAccount,
            categories: values.selectedCategories
              .filter((cat) => cat.checked)
              .map((cat) => cat.data.Id!!),
          });
        }}
      >
        <Switch
          size="lg"
          colorPalette={"green"}
          thumbLabel={{ on: <LuCheck />, off: <LuX /> }}
          checked={isFixedTransaction}
          onCheckedChange={(e) => setIsFixedTransaction(e.checked)}
        >
          Fixed Transaction
        </Switch>
        <Field label="Date">
          <DatePicker
            selectedDate={values.date}
            setSelectedDate={(d) => handleChange("date", d)}
          />
        </Field>
        {isFixedTransaction ? (
          <Box>
            <Field label={"Fixed transaction"}>
              <RadioMenu
                hasArrow
                data={fixedSelect}
                placeholder="fixed transaction"
                selectedId={values.selectedFixedId}
                setSelectedId={(val) => handleChange("selectedFixedId", val)}
              />
            </Field>
            {values.selectedFixedId !== "" &&
              fixedTransactions
                .filter((f) => f.Id === +values.selectedFixedId)
                .map((fixed) => (
                  <DataListRoot key={fixed.Id}>
                    <DataListItem label="Name" value={fixed.Name} />
                    <DataListItem label="Amount" value={""}>
                      <FormatNumber
                        value={fixed.Amount}
                        style="currency"
                        currency="EUR"
                      />
                    </DataListItem>
                    <DataListItem
                      label="Transaction Type"
                      value={
                        movementTypes.find(
                          (mt) => mt.id === fixed.transactionType
                        )?.name
                      }
                    />
                    <DataListItem label="Categories" value={""}>
                      <HStack>
                        {categories
                          .filter((cat) => fixed.categories.includes(cat.Id))
                          .map((i) => (
                            <TagComponent
                              key={i.Id}
                              name={i.Name}
                              icon={i.Icon}
                            />
                          ))}
                      </HStack>
                    </DataListItem>
                  </DataListRoot>
                ))}
          </Box>
        ) : (
          <Stack>
            <Box width={"full"}>
              <Field label="Name" required>
                <Input
                  ref={ref}
                  id="name"
                  value={values.Name}
                  onChange={(e) => handleChange("Name", e.target.value)}
                  placeholder="Please enter transaction name"
                />
              </Field>
              <NumberInput
                number={values.amount}
                setNumber={(val) => handleChange("amount", val)}
                isCurrency={true}
                label={"Amount"}
              />
            </Box>
            <Box paddingTop="5px">
              <RadioMenu
                hasArrow
                data={movementTypes.filter((m) => m.id !== 0)}
                placeholder="Transaction Type"
                selectedId={values.selectedTT}
                setSelectedId={(val) => handleChange("selectedTT", val)}
              />
            </Box>
            <Box>
              <Field label="Choose the categories">
                <CheckBoxMenu
                  name={"Category"}
                  items={values.selectedCategories}
                  setItems={(val) => handleChange("selectedCategories", val)}
                />
              </Field>
            </Box>
          </Stack>
        )}
        <Stack>
          <Field label="Description">
            <Textarea
              value={values.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Start typing..."
            />
          </Field>
          <Field label="Account">
            <RadioMenu
              hasArrow
              placeholder="account"
              data={accountsSelect}
              selectedId={values.selectedAccount}
              setSelectedId={(value) => handleChange("selectedAccount", value)}
            />
          </Field>
        </Stack>
      </form>
    </DrawerComponent>
  );
};

export default NewTransactionDrawer;
