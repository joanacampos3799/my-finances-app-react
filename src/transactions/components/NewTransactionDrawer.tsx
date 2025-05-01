import { useEffect, useMemo, useRef, useState } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import useCategories from "../../categories/hooks/useCategories";
import { EntitySelected, HelperEntity } from "../../common/helper";
import Category from "../../categories/model/Category";
import useAddTransaction from "../hooks/useAddTransaction";
import DrawerComponent from "../../common/components/DrawerComponent";
import { movementTypes } from "../../common/constants";
import { Box, Input, Show, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import NumberInput from "../../common/components/NumberInput";
import RadioMenu from "../../common/components/RadioMenu";
import CheckBoxMenu from "../../common/components/CheckBoxMenu";
import { Switch } from "../../components/ui/switch";
import { LuCheck, LuX } from "react-icons/lu";
import useForm from "../../common/hooks/useForm";
import useAccounts from "../../accounts/hooks/useAccounts";
import AccountList from "../../accounts/models/AccountList";
import DatePicker from "../../common/components/DatePicker";
import { format } from "date-fns";
import TransactionFormObject from "../model/TransactionFormObject";
import Transaction from "../model/Transaction";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction";
import useDateFilter from "../../common/hooks/useDateFilter";

interface Props {
  transaction?: Transaction;
  accountId?: number;
  categoriesId?: number[];
  creditAccountId?: number;
}

const NewTransactionDrawer = ({
  transaction,
  accountId,
  categoriesId,
  creditAccountId,
}: Props) => {
  const { userId } = useLoginData();
  const { categories } = useCategories();
  const { accounts } = useAccounts();
  const { parseDate } = useDateFilter();
  const [initialState, setInitialState] = useState<EntitySelected<Category>[]>(
    []
  );
  const [allCategories, setAllCategories] = useState<
    EntitySelected<Category>[]
  >([]);

  const ref = useRef(null);

  const { values, resetForm, handleChange } = useForm<TransactionFormObject>({
    amount: transaction ? "" + transaction.Amount : "0",
    date: transaction ? parseDate(transaction.Date) : new Date(),
    description: transaction?.Description ?? "",
    selectedTT: transaction
      ? "" + movementTypes[transaction.transactionType].id
      : "-1",
    selectedAccount: accountId
      ? "" + accountId
      : transaction
        ? "" + transaction.accountId
        : "",
    Name: transaction?.Name ?? "",
    selectedCategories: initialState ?? [],
    isCreditCardPayment:
      transaction != null
        ? transaction.isCreditCardPayment
        : creditAccountId !== undefined,
    selectedCreditCard:
      transaction != null
        ? "" + transaction.creditCardId
        : creditAccountId
          ? "" + creditAccountId
          : undefined,
  });

  const [hasInitializedCategories, setHasInitializedCategories] =
    useState(false);
  const accountList = useMemo(() => accounts.data ?? [], [accounts]);

  useEffect(() => {
    if (!categories?.data.length || hasInitializedCategories) return;

    const helper = new HelperEntity<Category>();
    let init;

    if (transaction) {
      init = helper.getMappedCheckboxEntity(
        categories.data,
        transaction.categories.map((cat) => cat.Id!)
      );
    } else if (categoriesId) {
      init = helper.getMappedCheckboxEntity(categories.data, categoriesId);
    } else {
      init = helper.getMappedCheckboxEntity(categories.data);
    }

    setInitialState(init);
    setAllCategories(init);
    handleChange("selectedCategories", init);
    setHasInitializedCategories(true);
  }, [categories, transaction, categoriesId, hasInitializedCategories]);
  const memoizedAccountId = useMemo(() => accountId, [accountId]);
  useEffect(() => {
    if (memoizedAccountId !== undefined) {
      handleChange("selectedAccount", "" + memoizedAccountId);
    }
  }, [memoizedAccountId]);

  useEffect(() => {
    if (
      !allCategories.length ||
      +values.selectedTT < 0 ||
      +values.selectedTT > 1
    )
      return;

    const filtered = allCategories.filter(
      (cat) =>
        cat.data.CategoryType === +values.selectedTT ||
        cat.data.CategoryType === 2
    );

    setInitialState(filtered);
    handleChange("selectedCategories", filtered);
  }, [values.selectedTT, allCategories]);
  const addTransaction = useAddTransaction(() => resetForm());
  const updateTransaction = useUpdateTransaction(() => resetForm());

  const accountsSelect = new HelperEntity<AccountList>().getMappedRadioEntity(
    accountList
  );
  const creditSelect = new HelperEntity<AccountList>().getMappedRadioEntity(
    accountList.filter((acc) => acc.Type === 1) ?? []
  );

  const isGiftCard =
    accountList.find((acc) => acc.Id === +values.selectedAccount)?.Type === 6;

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

          const payload = {
            Name: values.Name,
            Amount: parseFloat(values.amount.replace(",", ".")),
            transactionType: movementTypes[+values.selectedTT].id,
            userId: userId!!,
            Date: format(values.date, "dd/MM/yyyy"),
            Description: values.description,
            accountId: +values.selectedAccount,
            categories: values.selectedCategories
              .filter((cat) => cat.checked)
              .map((cat) => cat.data.Id!!),
            isCreditCardPayment: values.isCreditCardPayment,
            creditCardId: values.selectedCreditCard
              ? +values.selectedCreditCard
              : undefined,
          };

          transaction
            ? updateTransaction({ Id: transaction.Id, ...payload })
            : addTransaction(payload);

          setOpen(false);
        }}
      >
        <Field label="Date">
          <DatePicker
            selectedDate={values.date}
            setSelectedDate={(d) => handleChange("date", d)}
            allowFutureDates={false}
          />
        </Field>

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
              data={movementTypes.filter((m) =>
                isGiftCard ? m.id === 0 : m.id !== 2
              )}
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
                items={values.selectedCategories ?? []}
                setItems={(val) => handleChange("selectedCategories", val)}
              />
            </Field>
          </Box>
        </Stack>

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
                selectedId={values.selectedCreditCard ?? ""}
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
