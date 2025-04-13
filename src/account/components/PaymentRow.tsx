import { Payment } from "../Model/Account";
import { FormatNumber, Table } from "@chakra-ui/react";

interface Props {
  payment: Payment;
}
const PaymentRow = ({ payment }: Props) => {
  return (
    <Table.Row key={payment.Id + "-payment-row"}>
      <Table.Cell w="150px">
        {new Date(
          payment.Date.year,
          payment.Date.month - 1,
          payment.Date.day
        ).toDateString()}
      </Table.Cell>
      <Table.Cell>
        <FormatNumber
          value={payment.Amount}
          style={"currency"}
          currency="EUR"
        />
      </Table.Cell>
      <Table.Cell>{payment.AccountName}</Table.Cell>
    </Table.Row>
  );
};

export default PaymentRow;
