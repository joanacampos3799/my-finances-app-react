import { useEffect, useRef, useState } from "react";
import FormDialog from "../../common/components/FormDialog";
import useAccountStore from "../hooks/useAccountStore";
import { Button, DialogBody, Flex, Text } from "@chakra-ui/react";
import { useUpdateAccount } from "../../accounts/hooks/useUpdateAccount";
import { format } from "date-fns";
import useDateFilter from "../../common/hooks/useDateFilter";
import NumberInput from "../../common/components/NumberInput";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../../components/ui/dialog";

const SetUpGoal = () => {
  const { account } = useAccountStore();
  const { parseDate } = useDateFilter();
  const [goal, setGoal] = useState<string>("0");
  const [warning, setWarning] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const updateAccount = useUpdateAccount(() => {
    if (ref.current) ref.current.value = "";
    setGoal("0");
    setWarning("");
  });
  useEffect(() => {
    if (account.Goal && account.Goal > 0) {
      setGoal("" + account.Goal);
      setUpdate(true);
    }
  }, [account]);

  const handleUpdate = () => {
    if (goal === "0") {
      setWarning("Goal must be greater than 0");
      return;
    }
    updateAccount({
      Name: account.Name,
      institutionId: account.Institution.Id,
      Type: account.Type,
      userId: account.userId,
      InitialBalance: account.InitialBalance,
      Id: account.Id,
      SpendingLimit: account.SpendingLimit,
      Transactions: account.Transactions,
      paymentDueDate: account.PaymentDueDate
        ? format(parseDate(account.PaymentDueDate), "dd/MM/yyyy")
        : undefined,
      statementDate: account.StatementDate
        ? format(parseDate(account.StatementDate), "dd/MM/yyyy")
        : undefined,
      interest: account.Interest,
      active: account.active,
      goal: parseFloat(goal.replace(",", ".").replace(/[^\d.,]/g, "")),
    });
  };

  return (
    <DialogRoot
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <Button bgColor={"teal.500"} aria-label="Add">
          {update ? "Update" : "Set a"} Goal
        </Button>
      </DialogTrigger>
      <DialogContent colorPalette={"teal"}>
        <DialogHeader color={"teal.700"} fontSize="lg" fontWeight="bold">
          {update ? "Update" : "Set a"} Goal
        </DialogHeader>

        <DialogBody>
          <Flex direction={"column"} gap={2}>
            <NumberInput
              number={goal}
              setNumber={(val) => {
                setGoal(val);
                if (warning) setWarning("");
              }}
              isCurrency={true}
              label="Set a Goal"
            />
            {warning && (
              <Text color="red.500" fontSize="sm">
                {warning}
              </Text>
            )}
          </Flex>
        </DialogBody>

        <DialogFooter>
          <Button
            variant={"outline"}
            colorPalette={"teal"}
            borderColor={"teal.500"}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            bgColor={"teal.500"}
            onClick={() => {
              handleUpdate();
              setOpen(false);
            }}
            type="submit"
            form={"set-up-goal"}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default SetUpGoal;
