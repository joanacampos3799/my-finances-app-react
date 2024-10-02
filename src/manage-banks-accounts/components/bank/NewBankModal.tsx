import { useRef } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "../../../components/ui/field";
import useAddBank from "../../hooks/useAddBank";
import { useLoginData } from "../../../auth/contexts/AuthContext";
import FormDialog from "../../../common/components/FormDialog";
import BankList from "../../models/BankList";
import { useUpdateBank } from "../../hooks/useUpdateBank";

interface Props {
  bank?: BankList;
}
const NewBankModal = ({ bank }: Props) => {
  const { userId } = useLoginData();
  const addBank = useAddBank(() => {
    if (ref.current) ref.current.value = "";
  });
  const updateBank = useUpdateBank();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <FormDialog
      label={bank ? bank.Name : "Bank"}
      initialEl={ref.current}
      formName={"new-bank-form"}
      update={bank !== undefined}
    >
      <form
        id="new-bank-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current && ref.current.value) {
            if (bank) {
              updateBank({
                Name: ref.current?.value,
                userId: userId!!,
                Accounts: bank.Accounts,
              });
            } else {
              addBank({
                Name: ref.current?.value,
                userId: userId!!,
                Accounts: [],
              });
            }
          }
        }}
      >
        <Field label="Name">
          <Input
            defaultValue={bank?.Name}
            ref={ref}
            placeholder="Add your bank's name"
          />
        </Field>
      </form>
    </FormDialog>
  );
};

export default NewBankModal;
