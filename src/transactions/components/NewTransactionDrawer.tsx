import { useEffect, useMemo, useRef, useState } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import useCategories from "../../categories/hooks/useCategories";
import { HelperEntity } from "../../common/helper";
import Category from "../../categories/model/Category";
import useAddTransaction from "../hooks/useAddTransaction";
import DrawerComponent from "../../common/components/DrawerComponent";
import { movementTypes } from "../../common/constants";
import { Box, Input, Show, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import NumberInput from "../../common/components/NumberInput";
import RadioMenu from "../../common/components/RadioMenu";
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
  categoryId?: number;
  creditAccountId?: number;
  isMobile?: boolean;
}

const NewTransactionDrawer = ({
  transaction,
  accountId,
  categoryId,
  creditAccountId,
  isMobile = false,
}: Props) => {
  const { userId } = useLoginData();
  const { categories } = useCategories();
  const { accounts } = useAccounts();
  const { parseDate } = useDateFilter();

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
    selectedCategory: transaction?.category?.Id
      ? "" + transaction?.category?.Id
      : categoryId
        ? "" + categoryId
        : "",
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
    selectedTransferAccount:
      transaction != null && transaction.transferAccountId
        ? "" + transaction.transferAccountId
        : undefined,
  });

  const accountList = useMemo(() => accounts.data ?? [], [accounts]);
  const categoryList = useMemo(() => categories.data ?? [], [categories]);
  const [categoriesData, setCategoriesData] =
    useState<Category[]>(categoryList);

  const memoizedAccountId = useMemo(() => accountId, [accountId]);
  useEffect(() => {
    if (memoizedAccountId !== undefined) {
      handleChange("selectedAccount", "" + memoizedAccountId);
    }
  }, [memoizedAccountId]);

  useEffect(() => {
    if (
      !categoryList.length ||
      +values.selectedTT < 0 ||
      +values.selectedTT > 1
    )
      return;

    const filtered = categoryList.filter(
      (cat) => cat.CategoryType === +values.selectedTT
    );
    setCategoriesData(filtered);
  }, [values.selectedTT, categoryList]);

  const addTransaction = useAddTransaction(() => resetForm());
  const updateTransaction = useUpdateTransaction(() => resetForm());

  const accountsSelect = new HelperEntity<AccountList>().getMappedRadioEntity(
    accountList
  );
  const creditSelect = new HelperEntity<AccountList>().getMappedRadioEntity(
    accountList.filter((acc) => acc.Type === 1) ?? []
  );

  const categoriesSelect = new HelperEntity<Category>().getMappedRadioEntity(
    categoriesData
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
      isMobile={isMobile}
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
            category: +values.selectedCategory,
            isCreditCardPayment: values.isCreditCardPayment,
            creditCardId: values.selectedCreditCard
              ? +values.selectedCreditCard
              : undefined,
            transferAccountId: values.selectedTransferAccount
              ? +values.selectedTransferAccount
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
              data={movementTypes.filter((m) => {
                if (isGiftCard) return m.id === 0;
                else return m;
              })}
              placeholder="Transaction Type"
              selectedId={values.selectedTT}
              setSelectedId={(val) => handleChange("selectedTT", val)}
              variant={"outline"}
            />
          </Box>
          <Show when={+values.selectedTT !== 2}>
            <Box>
              <Field label="Choose the Category">
                <RadioMenu
                  placeholder={"Category"}
                  data={categoriesSelect}
                  selectedId={values.selectedCategory}
                  setSelectedId={(val) => handleChange("selectedCategory", val)}
                  hasArrow
                  variant={"outline"}
                />
              </Field>
            </Box>
          </Show>
          <Show when={+values.selectedTT === 2}>
            <Box>
              <Field label="Transfer Account">
                <RadioMenu
                  hasArrow
                  placeholder="Transfer account"
                  data={accountsSelect}
                  selectedId={values.selectedTransferAccount ?? ""}
                  setSelectedId={(value) =>
                    handleChange("selectedTransferAccount", value)
                  }
                  variant="outline"
                />
              </Field>
            </Box>
          </Show>
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
