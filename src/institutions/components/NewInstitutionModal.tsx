import { useRef, useState } from "react";
import { Flex, Input } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import useAddInstitution from "../hooks/useAddInstitution";
import { useLoginData } from "../../auth/contexts/AuthContext";
import FormDialog from "../../common/components/FormDialog";
import InstitutionList from "../model/InstitutionList";
import { useUpdateInstitution } from "../hooks/useUpdateInstitution";
import RadioMenu from "../../common/components/RadioMenu";
import { institutionTypes } from "../../common/constants";

interface Props {
  institution?: InstitutionList;
}
const NewInstitutionModal = ({ institution }: Props) => {
  const { userId } = useLoginData();
  const addInstitution = useAddInstitution(() => {
    if (ref.current) ref.current.value = "";
  });
  const [type, setType] = useState(institution ? "" + institution?.Type : "-1");
  const updateInstitution = useUpdateInstitution();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <FormDialog
      label={institution ? institution.Name : "Add Institution"}
      initialEl={ref.current}
      formName={"new-institution-form"}
      update={institution !== undefined}
    >
      <form
        id="new-institution-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current && ref.current.value) {
            if (institution) {
              updateInstitution({
                Id: institution.Id,
                Name: ref.current?.value,
                userId: userId!!,
                Type: +type,
                Accounts: institution.Accounts,
              });
            } else {
              addInstitution({
                Name: ref.current?.value,
                Type: +type,
                userId: userId!!,
                Accounts: [],
              });
            }
          }
        }}
      >
        <Flex direction={"column"} gap={2}>
          <Field label="Name">
            <Input
              defaultValue={institution?.Name}
              ref={ref}
              placeholder="Add your institution's name"
            />
          </Field>
          <Field label="Select Institution Type">
            <RadioMenu
              variant={"outline"}
              placeholder=" institution type"
              data={institutionTypes}
              selectedId={type}
              setSelectedId={setType}
              color
              hasArrow
            />
          </Field>
        </Flex>
      </form>
    </FormDialog>
  );
};

export default NewInstitutionModal;
