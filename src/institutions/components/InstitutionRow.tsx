import InstitutionList from "../model/InstitutionList";
import { FormatNumber, HStack, Table } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import InstitutionDetails from "./InstitutionDetails";
import NewInstitutionModal from "./NewInstitutionModal";
import { LuTrash2 } from "react-icons/lu";
import { institutionTypes } from "../../common/constants";
interface Props {
  institution: InstitutionList;
  onDelete: (institution: InstitutionList) => void;
}
const InstitutionRow = ({ institution, onDelete }: Props) => {
  return (
    <Table.Row key={institution.Id + "-row"}>
      <Table.Cell>{institution.Name}</Table.Cell>
      <Table.Cell>{institutionTypes[institution.Type].name}</Table.Cell>
      <Table.Cell>
        <FormatNumber
          value={institution.Balance ?? 0}
          style={"currency"}
          currency="EUR"
        />
      </Table.Cell>

      <Table.Cell>{institution.Accounts.length}</Table.Cell>

      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
          <InstitutionDetails institution={institution} />
          <NewInstitutionModal institution={institution} />
          <Button
            h="40px"
            w="40px"
            bgColor="red.500"
            onClick={() => onDelete(institution)}
          >
            <LuTrash2 />
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

export default InstitutionRow;
