import { FormatNumber, HStack } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import { movementTypes } from "../../common/constants";
import useCategories from "../../categories/hooks/useCategories";
import useFixedTransaction from "../hooks/useFixedTransaction";
import DialogComponent from "../../common/components/DialogComponent";
import TagComponent from "../../common/components/TagComponent";

interface Props {
  id: number;
}

const FixedTransactionDetails = ({ id }: Props) => {
  const categories = useCategories();
  const fixedTransaction = useFixedTransaction(id);
  return (
    <DialogComponent
      size={"xl"}
      icon={fixedTransaction.Icon}
      name={fixedTransaction.Name}
      isAlert={false}
    >
      <DataListRoot>
        <DataListItem label="Name" value={fixedTransaction.Name} />

        <DataListItem label="Amount" value={""}>
          <FormatNumber
            value={fixedTransaction.Amount}
            style="currency"
            currency="EUR"
          />
        </DataListItem>

        <DataListItem label="Total Spent" value={""}>
          <FormatNumber
            value={fixedTransaction.TotalSpent}
            style="currency"
            currency="EUR"
          />
        </DataListItem>

        <DataListItem label="Payment Day" value={fixedTransaction.PaymentDay} />
        <DataListItem
          label="Periodicity"
          value={
            "Every" +
            (fixedTransaction.Periodicity === 1
              ? " month"
              : fixedTransaction.Periodicity + " months")
          }
        />

        <DataListItem
          label="Transaction Type"
          value={
            movementTypes.find(
              (mt) => mt.id === fixedTransaction.transactionType
            )?.name
          }
        />

        <DataListItem label="Categories(s)" value={""}>
          <HStack>
            {categories.data
              .filter((cat) => fixedTransaction.categories.includes(cat.Id!!))
              .map((i) => (
                <TagComponent key={i.Id} name={i.Name} icon={i.Icon} />
              ))}
          </HStack>
        </DataListItem>
      </DataListRoot>
    </DialogComponent>
  );
};

export default FixedTransactionDetails;
