import { FormatNumber, HStack } from "@chakra-ui/react";

import { useState } from "react";
import { useUpdateBank } from "../../hooks/useUpdateBank";
import ListCard from "../../../common/components/ListCard";
import BankList from "../../models/BankList";
import { useLoginData } from "../../../auth/contexts/AuthContext";

interface Props {
  bank: BankList;
}
const BankCard = ({ bank }: Props) => {
  const updateBank = useUpdateBank();
  const [name, setName] = useState("");

  const { userId } = useLoginData();
  const handleUpdate = () => {
    updateBank({
      Id: bank.Id,
      userId: userId!!,
      Name: name && name !== "" ? name : bank.Name,
    });
  };

  return (
    <ListCard
      name={name}
      setName={setName}
      editFn={handleUpdate}
      editable={true}
      data={bank}
      icon={"FaBuildingColumns"}
    >
      <HStack width={"full"} justifyContent="space-between">
        <FormatNumber
          value={bank.Balance ?? 0}
          style="currency"
          currency="EUR"
        ></FormatNumber>
      </HStack>
    </ListCard>
  );
};

export default BankCard;
