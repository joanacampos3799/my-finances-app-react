import { FormatNumber, HStack } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import { movementTypes } from "../../common/constants";
import useCategories from "../../categories/hooks/useCategories";
import useFixedTransaction from "../hooks/useFixedTransaction";
import DialogComponent from "../../common/components/DialogComponent";
import TagComponent from "../../common/components/TagComponent";
import { useState, useEffect } from "react";
import { HelperEntity } from "../../common/helper";
import { useUpdateFixedTransaction } from "../hooks/useUpdateFixedTransaction";
import useForm from "../../common/hooks/useForm";
import FixedTransactionFormObject from "../model/FixedTransactionFormObject";
import CategoryList from "../../categories/model/CategoryList";
import FixedTransactionUpdateForm from "./FixedTransactionUpdateForm";

interface Props {
  id: number;
}

interface CheckboxCategoryItem {
  checked: boolean;
  data: CategoryList;
}

const FixedTransactionDetails = ({ id }: Props) => {
  const categories = useCategories();
  const fixedTransaction = useFixedTransaction(id);
  const update = useUpdateFixedTransaction();

  // Initialize the useForm hook with the initial values
  const { values, handleChange, setValues } =
    useForm<FixedTransactionFormObject>({
      paymentDay: 0,
      periodicity: 1,
      selectedTT: "",
      selectedCategories: [] as CheckboxCategoryItem[],
      amount: 0,
      icon: "",
      Name: "",
    });
  const [updating, setUpdating] = useState(false);

  // Update state when fixedTransaction data is available
  useEffect(() => {
    if (fixedTransaction) {
      setValues({
        paymentDay: fixedTransaction.PaymentDay,
        periodicity: fixedTransaction.Periodicity,
        selectedTT: "" + fixedTransaction.transactionType,
        amount: fixedTransaction.Amount,
        icon: fixedTransaction.Icon,
        Name: fixedTransaction.Name,
        selectedCategories:
          new HelperEntity<CategoryList>().getMappedCheckboxEntity(
            categories.data,
            fixedTransaction.categories
          ),
      });
    }
  }, [fixedTransaction, categories, setValues]);

  const handleUpdate = () => {
    update({
      Id: fixedTransaction.Id,
      Name: values.Name,
      Icon: values.icon,
      Amount: values.amount,
      transactionType: +values.selectedTT,
      userId: fixedTransaction.userId!,
      PaymentDay: values.paymentDay,
      Periodicity: values.periodicity,
      active: fixedTransaction.active,
      categories: values.selectedCategories
        .filter((cat) => cat.checked)
        .map((cat) => cat.data.Id!),
    });
  };

  return (
    <DialogComponent
      size="xl"
      icon={fixedTransaction.Icon}
      name={fixedTransaction.Name}
      isAlert={false}
      updating={updating}
      setUpdating={setUpdating}
      handleUpdate={handleUpdate}
    >
      <DataListRoot>
        {updating ? (
          <FixedTransactionUpdateForm
            handleChange={handleChange}
            values={values}
          />
        ) : (
          <>
            <DataListItem label="Name" value={fixedTransaction.Name} />
            <DataListItem label="Amount" value={""}>
              <FormatNumber
                value={fixedTransaction.Amount}
                style="currency"
                currency="EUR"
              />
            </DataListItem>
            <DataListItem
              label="Payment Day"
              value={fixedTransaction.PaymentDay}
            />
            <DataListItem
              label="Periodicity"
              value={`Every ${fixedTransaction.Periodicity > 1 ? fixedTransaction.Periodicity : ""} month${fixedTransaction.Periodicity > 1 ? "s" : ""}`}
            />
            <DataListItem label="Transaction Type" value={""}>
              {
                movementTypes.find(
                  (mt) => mt.id === fixedTransaction.transactionType
                )?.name
              }
            </DataListItem>
            <DataListItem label="Categories" value={""}>
              <HStack>
                {categories.data
                  .filter((cat) => fixedTransaction.categories.includes(cat.Id))
                  .map((i) => (
                    <TagComponent key={i.Id} name={i.Name} icon={i.Icon} />
                  ))}
              </HStack>
            </DataListItem>
          </>
        )}
        <DataListItem label="Total Spent" value={""}>
          <FormatNumber
            value={fixedTransaction.TotalSpent}
            style="currency"
            currency="EUR"
          />
        </DataListItem>
      </DataListRoot>
    </DialogComponent>
  );
};

export default FixedTransactionDetails;
