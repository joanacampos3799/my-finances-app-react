import { useEffect, useMemo, useRef, useState } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import useAddFixedTransaction from "../hooks/useAddFixedTransaction";
import { movementTypes } from "../../common/constants";
import { Box, HStack, Input, Show, Stack } from "@chakra-ui/react";
import IconPicker from "../../common/components/IconPicker";
import { Field } from "../../components/ui/field";
import useCategories from "../../categories/hooks/useCategories";
import DrawerComponent from "../../common/components/DrawerComponent";
import Category from "../../categories/model/Category";
import RadioMenu from "../../common/components/RadioMenu";
import CheckBoxMenu from "../../common/components/CheckBoxMenu";
import { EntitySelected, HelperEntity } from "../../common/helper";
import NumberInput from "../../common/components/NumberInput";
import useForm from "../../common/hooks/useForm";
import FixedTransactionFormObject from "../model/FixedTransactionFormObject";
import { useUpdateFixedTransaction } from "../hooks/useUpdateFixedTransaction";
import FixedTransactionList from "../model/FixedTransactionsList";
import AccountList from "../../accounts/models/AccountList";
import useAccounts from "../../accounts/hooks/useAccounts";

interface Props {
  fixedTransaction?: FixedTransactionList;
}

const NewFixedTransactionDrawer = ({ fixedTransaction }: Props) => {
  const { userId } = useLoginData();
  const ref = useRef<HTMLInputElement>(null);
  const { categories } = useCategories();
  const { accounts } = useAccounts();
  const { values, handleChange, resetForm } =
    useForm<FixedTransactionFormObject>({
      Name: fixedTransaction ? fixedTransaction.Name : "",
      icon: fixedTransaction ? fixedTransaction.Icon : "",
      amount: fixedTransaction ? "" + fixedTransaction.Amount : "0",
      paymentDay: fixedTransaction ? fixedTransaction.PaymentDay : 1,
      periodicity: fixedTransaction ? fixedTransaction.Periodicity : 1,
      selectedAccount: fixedTransaction ? "" + fixedTransaction.Account : "",
      selectedTT: fixedTransaction
        ? "" + movementTypes[fixedTransaction.transactionType].id
        : "-1",
      selectedCategoryId: fixedTransaction
        ? "" + fixedTransaction.category.Id
        : "",
    });

  const accountList = useMemo(() => accounts.data ?? [], [accounts]);
  const accountsSelect = new HelperEntity<AccountList>().getMappedRadioEntity(
    accountList
  );

  const categoryList = useMemo(() => categories.data ?? [], [categories]);
  const [categoriesData, setCategoriesData] =
    useState<Category[]>(categoryList);
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

  const categoriesSelect = new HelperEntity<Category>().getMappedRadioEntity(
    categoriesData
  );

  const addFixedTransaction = useAddFixedTransaction(() => resetForm());
  const updateFixedTransaction = useUpdateFixedTransaction();
  const [open, setOpen] = useState(false);
  return (
    <DrawerComponent
      placement={"end"}
      name="Fixed Transactions"
      formName="new-fixed-form"
      refElement={ref.current}
      open={open}
      setOpen={setOpen}
      update={fixedTransaction !== undefined}
    >
      <form
        id="new-fixed-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (fixedTransaction) {
            updateFixedTransaction({
              Id: fixedTransaction.Id,
              Name: values.Name,
              Icon: values.icon,
              Amount: parseFloat(values.amount.replace(",", ".")),
              transactionType: movementTypes[+values.selectedTT].id,
              userId: fixedTransaction.userId!!,
              PaymentDay: values.paymentDay,
              Periodicity: values.periodicity,
              active: fixedTransaction.active,
              category: +values.selectedCategoryId,
              account: +values.selectedAccount,
            });
          } else {
            addFixedTransaction({
              Name: values.Name,
              Icon: values.icon,
              Amount: parseFloat(values.amount.replace(",", ".")),
              transactionType: movementTypes[+values.selectedTT].id,
              userId: userId!!,
              PaymentDay: values.paymentDay,
              Periodicity: values.periodicity,
              active: true,
              category: +values.selectedCategoryId,
              account: +values.selectedAccount,
            });
          }
          setOpen(false);
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
              <Field label="Name">
                <Input
                  name="name"
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
            number={"" + values.amount}
            setNumber={(val) => handleChange("amount", val)}
            isCurrency
            label={"Amount"}
          />
          <RadioMenu
            hasArrow
            data={movementTypes.filter((m) => m.id !== 2)}
            placeholder="Transaction Type"
            selectedId={values.selectedTT}
            setSelectedId={(v) => handleChange("selectedTT", v)}
            variant={"outline"}
          />

          <RadioMenu
            hasArrow
            data={categoriesSelect}
            placeholder="Category"
            selectedId={values.selectedCategoryId}
            setSelectedId={(v) => handleChange("selectedCategoryId", v)}
            variant={"outline"}
          />

          <HStack>
            <NumberInput
              number={"" + values.paymentDay}
              setNumber={(e) => handleChange("paymentDay", +e)}
              isCurrency={false}
              label="Payment Day"
              helperText="Day of the month"
            />
            <NumberInput
              number={"" + values.periodicity}
              setNumber={(v) => handleChange("periodicity", +v)}
              isCurrency={false}
              label="Periodicity"
              helperText="In months"
            />
          </HStack>
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
        </Stack>
      </form>
    </DrawerComponent>
  );
};

export default NewFixedTransactionDrawer;
