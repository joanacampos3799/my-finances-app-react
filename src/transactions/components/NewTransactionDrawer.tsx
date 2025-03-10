import { useEffect, useRef, useState } from "react";
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
  Show,
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
import useAccounts from "../../accounts/hooks/useAccounts";
import AccountList from "../../accounts/models/AccountList";
import DatePicker from "../../common/components/DatePicker";
import { format } from "date-fns";
import TransactionFormObject from "../model/TransactionFormObject";
import Transaction from "../model/Transaction";
import { Checkbox } from "../../components/ui/checkbox";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction";
import useDateFilter from "../../common/hooks/useDateFilter";

interface Props {
  transaction?: Transaction;
  categoriesIds?: number[];
  accountId?: number;
  creditAccountId?: number;
}
const NewTransactionDrawer = ({
  transaction,
  categoriesIds,
  accountId,
  creditAccountId,
}: Props) => {
  const [isFixedTransaction, setIsFixedTransaction] = useState(false);
  const { userId } = useLoginData();
  const { data: categories } = useCategories();
  const { data: fixedTransactions } = useFixedTransactions();
  const { data: accounts } = useAccounts();
  const { parseDate } = useDateFilter();
  const [fixedList, setFixedList] = useState<FixedTransactionList[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [accountList, setAccountList] = useState<AccountList[]>([]);
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAccountList(accounts);
    }
    if (categories && categories.length > 0) {
      setCategoryList(categories);
    }
    if (fixedTransactions && fixedTransactions.length > 0) {
      setFixedList(fixedTransactions);
    }
  }, [categories, fixedTransactions, accounts]);
  const initialState = new HelperEntity<Category>().getMappedCheckboxEntity(
    categoryList,
    categoriesIds
  );
  const ref = useRef(null);
  const { values, resetForm, handleChange } = useForm<TransactionFormObject>({
    amount: transaction ? "" + transaction.Amount : "0",
    date: transaction ? parseDate(transaction.Date) : new Date(),
    description:
      transaction && transaction.Description ? transaction.Description : "",
    selectedTT: transaction
      ? movementTypes[transaction.transactionType].name
      : "",
    selectedAccount: accountId ? "" + accountId : "",
    Name: "",
    selectedFixedId: "",
    selectedCategories: initialState,
    isFee: false,
    isCreditCardPayment: creditAccountId !== undefined,
    selectedCreditCard: creditAccountId ? "" + creditAccountId : undefined,
  });
  const addTransaction = useAddTransaction(() => resetForm());
  const updateTransaction = useUpdateTransaction(() => resetForm());
  const fixedSelect =
    fixedList.length > 0
      ? new HelperEntity<FixedTransactionList>().getMappedRadioEntity(fixedList)
      : [];

  const accountsSelect = new HelperEntity<AccountList>().getMappedRadioEntity(
    accountList
  );

  const creditSelect = new HelperEntity<AccountList>().getMappedRadioEntity(
    accountList.filter((acc) => acc.Type === 1) ?? []
  );
  const [open, setOpen] = useState(false);
  return (
    <DrawerComponent
      placement={"end"}
      open={open}
      setOpen={setOpen}
      name={creditAccountId ? "Payment" : "Transaction"}
      formName="new-transaction-form"
      refElement={ref.current}
      update={transaction !== undefined}
    >
      <form
        id="new-transaction-form"
        onSubmit={(e) => {
          e.preventDefault();

          addTransaction({
            Name: values.Name,
            Amount: parseFloat(values.amount.replace(",", ".")),
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
            isFee: values.isFee,
            isCreditCardPayment: values.isCreditCardPayment,
            creditCardId: values.selectedCreditCard
              ? +values.selectedCreditCard
              : undefined,
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
                variant={"outline"}
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
                          .filter((cat) => fixed.categories.includes(cat))
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
                data={movementTypes.filter((m) => m.id !== 2)}
                placeholder="Transaction Type"
                selectedId={values.selectedTT}
                setSelectedId={(val) => handleChange("selectedTT", val)}
                variant={"outline"}
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
              variant={"outline"}
            />
          </Field>

          <Field label="Is Fee">
            <Checkbox
              checked={values.isFee}
              onCheckedChange={(e) => handleChange("isFee", e.checked)}
            />
          </Field>
          <Field label="">
            <Switch
              size="lg"
              colorPalette={"green"}
              thumbLabel={{ on: <LuCheck />, off: <LuX /> }}
              checked={values.isCreditCardPayment}
              onCheckedChange={(e) =>
                handleChange("isCreditCardPayment", e.checked)
              }
            >
              Is Credit Card Payment
            </Switch>
          </Field>
          <Show when={values.isCreditCardPayment}>
            <Field label="Credit Card">
              <RadioMenu
                hasArrow
                placeholder="credit card"
                data={creditSelect}
                selectedId={values.selectedCreditCard!!}
                setSelectedId={(value) =>
                  handleChange("selectedCreditCard", value)
                }
                variant={"outline"}
              />
            </Field>
          </Show>
        </Stack>
      </form>
    </DrawerComponent>
  );
};

export default NewTransactionDrawer;
