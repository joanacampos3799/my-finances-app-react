import { Flex, FormatNumber, Heading, HStack, Text } from "@chakra-ui/react";
import { movementTypes } from "../../common/constants";
import useFixedTransaction from "../hooks/useFixedTransaction";
import DialogComponent from "../../common/components/DialogComponent";
import CategoryTag from "../../transactions/components/CategoryTag";
import { addMonths, format, isBefore, setDate, startOfDay } from "date-fns";
import TransactionTable from "../../transactions/components/TransactionTable";

interface Props {
  id: number;
}

const FixedTransactionDetails = ({ id }: Props) => {
  const fixedTransaction = useFixedTransaction(id);

  function getNextDate(day: number) {
    const today = new Date();
    let targetDate = setDate(new Date(), day);

    if (isBefore(targetDate, startOfDay(today))) {
      targetDate = setDate(addMonths(new Date(), 1), day);
    }

    return format(targetDate, "dd/MM/yyyy");
  }
  return (
    <DialogComponent
      size="xl"
      icon={fixedTransaction.Icon}
      title={fixedTransaction.Name}
    >
      <Flex direction={"column"} gap={5} mb={3}>
        <Flex direction={"row"} gap={10}>
          <HStack>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Amount
            </Heading>
            <FormatNumber
              value={fixedTransaction.Amount}
              style="currency"
              currency="Eur"
            />
          </HStack>

          <HStack>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Next Payment
            </Heading>
            <Text>{getNextDate(fixedTransaction.PaymentDay)}</Text>
          </HStack>
          <HStack>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Periodicity
            </Heading>
            <Text>{`Every ${fixedTransaction.Periodicity > 1 ? fixedTransaction.Periodicity : ""} month${fixedTransaction.Periodicity > 1 ? "s" : ""}`}</Text>
          </HStack>
          <HStack>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Total Spent
            </Heading>
            <FormatNumber
              value={fixedTransaction.TotalSpent}
              style="currency"
              currency="Eur"
            />
          </HStack>
        </Flex>
        <Flex direction={"row"} gap={10}>
          <HStack>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Transaction Type
            </Heading>
            <Text>{movementTypes[fixedTransaction.transactionType].name}</Text>
          </HStack>
          <HStack>
            <Heading color={"teal.700"} size={"sm"}>
              {" "}
              Categories
            </Heading>
            {fixedTransaction.categories.map((i) => (
              <CategoryTag key={i.Id} category={i} />
            ))}
          </HStack>
        </Flex>
      </Flex>
      <TransactionTable data={fixedTransaction.Transactions} />
    </DialogComponent>
  );
};

export default FixedTransactionDetails;
