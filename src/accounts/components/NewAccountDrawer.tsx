import { useEffect, useRef, useState } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { accountTypes } from "../../common/constants";
import { HStack, Input, Show, Stack } from "@chakra-ui/react";
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
  const { institutions: data } = useInstitutions();
  const { parseDate } = useDateFilter();
  const [institutions, setInstitutions] = useState<InstitutionList[]>([]);

  const { values, handleChange, resetForm } = useForm<AccountFormObject>({
    Name: account ? account.Name : "",
    ib: account ? "" + account.InitialBalance : "0",
    limit: account ? "" + account.SpendingLimit : "0",
    selectedInstitution: institutionId
      ? "" + institutionId
      : account && account.Institution
        ? "" + account.Institution.Id
        : "0",
    selectedAccountTypeId: account ? "" + account.Type : "-1",
    interest: account && account.Interest ? "" + account.Interest : "0",
    paymentDate:
      account && account.PaymentDueDate
        ? parseDate(account.PaymentDueDate)
        : new Date(),
    statementDate:
      account && account.StatementDate
        ? parseDate(account.StatementDate)
        : new Date(),
    goal: account && account.Goal ? "" + account.Goal : "0",
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (data && data.data.length > 0) setInstitutions(data.data);
  }, [data]);
  useEffect(() => {
    if (account) {
      handleChange("Name", account.Name || "");
      handleChange("ib", account.InitialBalance?.toString() || "0");
      handleChange("limit", account.SpendingLimit?.toString() || "0");
      handleChange(
        "selectedInstitution",
        account.Institution?.Id?.toString() || "0"
      );
      handleChange("selectedAccountTypeId", account.Type?.toString() || "-1");
      handleChange("interest", account.Interest?.toString() || "0");
      handleChange(
        "paymentDate",
        account.PaymentDueDate ? parseDate(account.PaymentDueDate) : new Date()
      );
      handleChange(
        "statementDate",
        account.StatementDate ? parseDate(account.StatementDate) : new Date()
      );
      handleChange("goal", account.Goal?.toString() || "0");
      setOpen(open);
    }
  }, [account]);
  const nameRef = useRef<HTMLInputElement>(null);
  const addAccount = useAddAccount(() => resetForm());
  const updateAccount = useUpdateAccount(() => resetForm());
  const institutionsSelect =
    new HelperEntity<InstitutionList>().getMappedRadioEntity(institutions);
  const showSpendingLimit = +values.selectedAccountTypeId !== 2;
  const showGoal = +values.selectedAccountTypeId === 2;
  const isCreditCard = +values.selectedAccountTypeId === 1;

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
              InitialBalance: parseFloat(
                values.ib.replace(",", ".").replace(/[^\d.,]/g, "")
              ),
              Id: account.Id,
              SpendingLimit: parseFloat(
                values.limit
                  ? values.limit.replace(",", ".").replace(/[^\d.,]/g, "")
                  : "0"
              ),
              Transactions: account.Transactions,
              paymentDate: values.paymentDate
                ? format(values.paymentDate, "dd/MM/yyyy")
                : undefined,
              statementDate: values.statementDate
                ? format(values.statementDate, "dd/MM/yyyy")
                : undefined,
              interest: values.interest
                ? parseFloat(
                    values.interest.replace(",", ".").replace(/[^\d.,]/g, "")
                  )
                : undefined,
              active: account.active,
              goal: values.goal
                ? parseFloat(
                    values.goal.replace(",", ".").replace(/[^\d.,]/g, "")
                  )
                : undefined,
            });
          } else {
            addAccount({
              Name: values.Name,
              institutionId: +values.selectedInstitution,
              Type: +values.selectedAccountTypeId,
              userId: userId!!,
              InitialBalance: parseFloat(
                values.ib.replace(",", ".").replace(/[^\d.,]/g, "")
              ),
              SpendingLimit: parseFloat(
                values.limit
                  ? values.limit.replace(",", ".").replace(/[^\d.,]/g, "")
                  : "0"
              ),
              Transactions: [],
              paymentDate: values.paymentDate
                ? format(values.paymentDate, "dd/MM/yyyy")
                : undefined,
              statementDate: values.statementDate
                ? format(values.statementDate, "dd/MM/yyyy")
                : undefined,
              interest: values.interest
                ? parseFloat(
                    values.interest.replace(",", ".").replace(/[^\d.,]/g, "")
                  )
                : undefined,
              active: true,
              goal: values.goal
                ? parseFloat(
                    values.goal.replace(",", ".").replace(/[^\d.,]/g, "")
                  )
                : undefined,
            });
          }
          setOpen(false);
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
              number={"" + values.ib}
              setNumber={(e) => handleChange("ib", e)}
              isCurrency
            />
          </Field>
          <HStack>
            <Field label="Institution">
              <RadioMenu
                hasArrow
                data={institutionsSelect}
                selectedId={values.selectedInstitution}
                setSelectedId={(v) => handleChange("selectedInstitution", v)}
                placeholder="a institution"
                variant={"outline"}
              />
            </Field>
            <Field label="Account Type">
              <RadioMenu
                placeholder="account type"
                data={accountTypes}
                selectedId={values.selectedAccountTypeId}
                setSelectedId={(v) => handleChange("selectedAccountTypeId", v)}
                hasArrow
                variant={"outline"}
              />
            </Field>
          </HStack>
          <Show when={showSpendingLimit}>
            <Field label="Spending Limit">
              <NumberInput
                number={"" + values.limit}
                setNumber={(e) => handleChange("limit", e)}
                isCurrency
              />
            </Field>
          </Show>
          <Show when={isCreditCard}>
            <Field label="Interest">
              <NumberInput
                number={"" + values.interest}
                setNumber={(e) => handleChange("interest", e)}
                isCurrency={false}
              />
            </Field>
            <HStack>
              <Field label="Statement Date">
                <DatePicker
                  selectedDate={values.statementDate!!}
                  setSelectedDate={(d) => handleChange("statementDate", d)}
                  allowFutureDates
                />
              </Field>
              <Field label="Payment Due Date">
                <DatePicker
                  selectedDate={values.paymentDate!!}
                  setSelectedDate={(d) => handleChange("paymentDate", d)}
                  allowFutureDates
                />
              </Field>
            </HStack>
          </Show>
          <Show when={showGoal}>
            <Field label="Saving Goal">
              <NumberInput
                number={"" + values.goal}
                setNumber={(e) => handleChange("goal", e)}
                isCurrency
              />
            </Field>
          </Show>
        </Stack>
      </form>
    </DrawerComponent>
  );
};

export default NewAccountDrawer;
