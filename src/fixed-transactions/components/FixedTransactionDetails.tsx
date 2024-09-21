import { FormatNumber, HStack, Input } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import { movementTypes } from "../../common/constants";
import useCategories from "../../categories/hooks/useCategories";
import useFixedTransaction from "../hooks/useFixedTransaction";
import DialogComponent from "../../common/components/DialogComponent";
import TagComponent from "../../common/components/TagComponent";
import { useRef, useState, useEffect } from "react";
import NumberInput from "../../common/components/NumberInput";
import IconPicker from "../../common/components/IconPicker";
import RadioMenu from "../../common/components/RadioMenu";
import CheckBoxMenu from "../../common/components/CheckBoxMenu";
import { HelperEntity } from "../../common/helper";
import { useUpdateFixedTransaction } from "../hooks/useUpdateFixedTransaction";

interface Props {
  id: number;
}

interface CheckboxCategoryItem {
  checked: boolean;
  data: {
    Id?: number;
    Name: string;
  };
}

const FixedTransactionDetails = ({ id }: Props) => {
  const categories = useCategories();
  const fixedTransaction = useFixedTransaction(id);
  const update = useUpdateFixedTransaction();

  // State initialization
  const [paymentDay, setPaymentDay] = useState<number>(0);
  const [periodicity, setPeriodicity] = useState<number>(1);
  const [selectedTT, setSelectedTT] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<
    CheckboxCategoryItem[]
  >([]);
  const [amount, setAmount] = useState<number>(0);
  const [icon, setIcon] = useState<string>("");
  const [updating, setUpdating] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  // Update state when fixedTransaction data is available
  useEffect(() => {
    if (fixedTransaction) {
      setPaymentDay(fixedTransaction.PaymentDay);
      setPeriodicity(fixedTransaction.Periodicity);
      setSelectedTT("" + fixedTransaction.transactionType);
      setAmount(fixedTransaction.Amount);
      setIcon(fixedTransaction.Icon);
      setSelectedCategories(
        new HelperEntity().getMappedCheckboxEntity(
          categories.data,
          fixedTransaction.categories
        )
      );
    }
  }, [fixedTransaction, categories]);

  const handleUpdate = () => {
    update({
      Id: fixedTransaction.Id,
      Name: nameRef.current?.value || fixedTransaction.Name,
      Icon: icon,
      Amount: amount,
      transactionType: +selectedTT,
      userId: fixedTransaction.userId!,
      PaymentDay: paymentDay,
      Periodicity: periodicity,
      active: fixedTransaction.active,
      categories: selectedCategories
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
        <DataListItem label="Name" value={""}>
          {updating ? (
            <HStack>
              <IconPicker
                iconParam={icon}
                iconSize={4}
                setIconParam={setIcon}
              />
              <Input ref={nameRef} defaultValue={fixedTransaction.Name} />
            </HStack>
          ) : (
            fixedTransaction.Name
          )}
        </DataListItem>

        <DataListItem label="Amount" value={""}>
          {updating ? (
            <NumberInput number={amount} setNumber={setAmount} isCurrency />
          ) : (
            <FormatNumber
              value={fixedTransaction.Amount}
              style="currency"
              currency="EUR"
            />
          )}
        </DataListItem>

        <DataListItem label="Total Spent" value={""}>
          <FormatNumber
            value={fixedTransaction.TotalSpent}
            style="currency"
            currency="EUR"
          />
        </DataListItem>

        <DataListItem label="Payment Day" value={""}>
          {updating ? (
            <NumberInput
              number={paymentDay}
              setNumber={setPaymentDay}
              helperText="Day of the month"
              isCurrency={false}
            />
          ) : (
            fixedTransaction.PaymentDay
          )}
        </DataListItem>

        <DataListItem label="Periodicity" value={""}>
          {updating ? (
            <NumberInput
              number={periodicity}
              setNumber={setPeriodicity}
              helperText="In months"
              isCurrency={false}
            />
          ) : (
            `Every ${fixedTransaction.Periodicity > 1 ? fixedTransaction.Periodicity : ""} month${fixedTransaction.Periodicity > 1 ? "s" : ""}`
          )}
        </DataListItem>

        <DataListItem label="Transaction Type" value={""}>
          {updating ? (
            <RadioMenu
              data={movementTypes.filter((m) => m.id !== 0)}
              placeholder="Transaction Type"
              selectedId={selectedTT}
              setSelectedId={setSelectedTT}
            />
          ) : (
            movementTypes.find(
              (mt) => mt.id === fixedTransaction.transactionType
            )?.name
          )}
        </DataListItem>

        <DataListItem label="Categories" value={""}>
          {updating ? (
            <CheckBoxMenu
              name="Category"
              items={selectedCategories}
              setItems={setSelectedCategories}
            />
          ) : (
            <HStack>
              {categories.data
                .filter((cat) => fixedTransaction.categories.includes(cat.Id))
                .map((i) => (
                  <TagComponent key={i.Id} name={i.Name} icon={i.Icon} />
                ))}
            </HStack>
          )}
        </DataListItem>
      </DataListRoot>
    </DialogComponent>
  );
};

export default FixedTransactionDetails;
