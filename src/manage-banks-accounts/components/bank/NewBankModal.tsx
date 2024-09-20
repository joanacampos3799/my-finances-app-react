import { useRef } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "../../../components/ui/field";
import useAddBank from "../../hooks/useAddBank";
import { useLoginData } from "../../../auth/contexts/AuthContext";
import FormDialog from "../../../common/components/FormDialog";

interface Props {
  isEmpty: boolean;
}
const NewBankModal = ({ isEmpty }: Props) => {
  const { userId } = useLoginData();
  const addBank = useAddBank(() => {
    if (ref.current) ref.current.value = "";
  });
  const ref = useRef<HTMLInputElement>(null);
  return (
    <FormDialog
      isEmpty={isEmpty}
      label={"Bank"}
      initialEl={ref.current}
      formName={"new-bank-form"}
    >
      <form
        id="new-bank-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current && ref.current.value) {
            addBank({
              Name: ref.current?.value,
              userId: userId!!,
            });
          }
        }}
      >
        <Field label="Name">
          <Input ref={ref} placeholder="Add your bank's name" />
        </Field>
      </form>
    </FormDialog>
  );
};

export default NewBankModal;
