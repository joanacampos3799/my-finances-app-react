import React from "react";
import BankList from "../../models/BankList";
import { FormatNumber, HStack, Table } from "@chakra-ui/react";
import { Button } from "../../../components/ui/button";
import BankDetails from "./BankDetails";
import NewBankModal from "./NewBankModal";
import { LuTrash2 } from "react-icons/lu";
interface Props {
  bank: BankList;
  onDelete: (bank: BankList) => void;
}
const BankRow = ({ bank, onDelete }: Props) => {
  return (
    <Table.Row key={bank.Id + "-row"}>
      <Table.Cell w="150px">{bank.Name}</Table.Cell>

      <Table.Cell>
        <FormatNumber
          value={bank.Balance ?? 0}
          style={"currency"}
          currency="EUR"
        />
      </Table.Cell>

      <Table.Cell>{bank.Accounts.length}</Table.Cell>

      <Table.Cell textAlign={"end"}>
        <HStack justifyContent={"flex-end"}>
          <BankDetails bank={bank} />
          <NewBankModal bank={bank} />
          <Button
            h="40px"
            w="40px"
            bgColor="red.500"
            onClick={() => onDelete(bank)}
          >
            <LuTrash2 />
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

export default BankRow;
