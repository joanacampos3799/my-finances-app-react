import { useEffect, useRef, useState } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { accountTypes } from "../../common/constants";
import { Input, Show, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import useAddAccount from "../hooks/useAddAccount";
import useInstitutions from "../../institutions/hooks/useInstitutions";
import { HelperEntity } from "../../common/helper";
import InstitutionList from "../../institutions/model/InstitutionList";
import DrawerComponent from "../../common/components/DrawerComponent";
import RadioMenu from "../../common/components/RadioMenu";
import useForm from "../../common/hooks/useForm";
import AccountFormObject from "../models/AccountFormObject";
import NumberInput from "../../common/components/NumberInput";
import AccountList from "../models/AccountList";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import Account from "../../account/Model/Account";
import useDateFilter from "../../common/hooks/useDateFilter";
import DatePicker from "../../common/components/DatePicker";
import { format } from "date-fns";

interface Props {
  account?: AccountList | Account;
  institutionId?: number;
}
const NewAccountDrawer = ({ account, institutionId }: Props) => {
  const { userId } = useLoginData();
  const { data } = useInstitutions();
  const { parseDate } = useDateFilter();
  const [institutions, setInstitutions] = useState<InstitutionList[]>([]);
  useEffect(() => {
    if (data && data.length > 0) setInstitutions(data);
  }, [data]);
  const { values, handleChange, resetForm } = useForm<AccountFormObject>({
    Name: account ? account.Name : "",
    ib: account ? account.InitialBalance : 0,
    limit: account ? account.InitialBalance : 0,
    selectedInstitution: institutionId
      ? "" + institutionId
      : account && account.Institution
        ? "" + account.Institution.Id
        : "0",
    selectedAccountTypeId: account ? "" + account.Type : "-1",
    interest: account ? account.Interest : 0,
    paymentDate:
      account && account.PaymentDueDate
        ? parseDate(account.PaymentDueDate)
        : new Date(),
    jointUsername: account?.JointUserName ?? undefined,
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const addAccount = useAddAccount(() => resetForm());
  const updateAccount = useUpdateAccount(() => resetForm());
  const institutionsSelect =
    new HelperEntity<InstitutionList>().getMappedRadioEntity(institutions);
  const showSpendingLimit =
    +values.selectedAccountTypeId === 0 ||
    +values.selectedAccountTypeId === 1 ||
    +values.selectedAccountTypeId === 3 ||
    +values.selectedAccountTypeId === 6 ||
    +values.selectedAccountTypeId === 7 ||
    +values.selectedAccountTypeId === 8;
  const [open, setOpen] = useState(false);
  return (
    <DrawerComponent
      placement={"end"}
      name={"Account"}
      update={account !== undefined}
      formName={"new-account-form"}
      refElement={nameRef.current}
      open={open}
      setOpen={setOpen}
    >
      <form
        id="new-account-form"
        onSubmit={(e) => {
          e.preventDefault();

          if (account) {
            updateAccount({
              Name: values.Name,
              institutionId: +values.selectedInstitution,
              Type: +values.selectedAccountTypeId,
              userId: userId!!,
              InitialBalance: values.ib,
              Id: account.Id,
              SpendingLimit: values.limit,
              Transactions: account.Transactions,
              jointUserId: values.jointUsername,
              paymentDueDate: values.paymentDate
                ? format(values.paymentDate, "dd/MM/yyyy")
                : undefined,
              interest: values.interest,
            });
          } else {
            addAccount({
              Name: values.Name,
              institutionId: +values.selectedInstitution,
              Type: +values.selectedAccountTypeId,
              userId: userId!!,
              InitialBalance: values.ib,
              SpendingLimit: values.limit,
              Transactions: [],
              jointUserId: values.jointUsername,
              paymentDueDate: values.paymentDate
                ? format(values.paymentDate, "dd/MM/yyyy")
                : undefined,
              interest: values.interest,
            });
          }
        }}
      >
        <Stack gap={2}>
          <Field label="Name" required>
            <Input
              ref={nameRef}
              value={values.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
              id="name"
              placeholder="Please enter Account name"
            />
          </Field>

          <Field label="Initial Account Balance">
            <NumberInput
              number={values.ib}
              setNumber={(e) => handleChange("ib", e)}
              isCurrency
            />
          </Field>

          <Field label="Institution">
            <RadioMenu
              hasArrow
              data={institutionsSelect}
              selectedId={values.selectedInstitution}
              setSelectedId={(v) => handleChange("selectedInstitution", v)}
              placeholder="a institution"
            />
          </Field>
          <Field label="Account Type">
            <RadioMenu
              placeholder="account type"
              data={accountTypes}
              selectedId={values.selectedAccountTypeId}
              setSelectedId={(v) => handleChange("selectedAccountTypeId", v)}
              hasArrow
            />
          </Field>

          <Show when={showSpendingLimit}>
            <Field label="Spending Limit">
              <NumberInput
                number={values.limit}
                setNumber={(e) => handleChange("limit", e)}
                isCurrency
              />
            </Field>
          </Show>
          <Field label="Interest">
            <NumberInput
              number={values.interest}
              setNumber={(e) => handleChange("interest", e)}
              isCurrency={false}
            />
          </Field>
          <Field label="Payment Due Date">
            <DatePicker
              selectedDate={values.paymentDate}
              setSelectedDate={(d) => handleChange("paymentDate", d)}
            />
          </Field>

          <Field label="Joint User Account"></Field>
        </Stack>
      </form>
    </DrawerComponent>
  );
};

export default NewAccountDrawer;
