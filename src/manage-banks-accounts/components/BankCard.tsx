import { Card, Editable, FormatNumber, HStack, Icon } from "@chakra-ui/react";
import { FaBuildingColumns } from "react-icons/fa6";
import { Bank } from "../Bank";
import { useState } from "react";
import { useUpdateBank } from "../hooks/useUpdateBank";

interface Props {
  bank: Bank;
}
const BankCard = ({ bank }: Props) => {
  const [name, setName] = useState("");
  const updateBank = useUpdateBank();
  const handleUpdate = () => {
    updateBank({
      Id: bank.Id,
      userId: bank.userId,
      Balance: bank.Balance,
      Name: name && name !== "" ? name : bank.Name,
    });
  };

  return (
    <Card.Root variant={"elevated"}>
      <Card.Header>
        <HStack justifyContent="space-between">
          <HStack justifyContent="center">
            <Icon boxSize={4}>
              <FaBuildingColumns />
            </Icon>
            <Editable.Root
              value={name}
              onValueChange={(e) => setName(e.value)}
              onBlur={handleUpdate}
              placeholder={bank.Name}
            >
              <Editable.Preview />
              <Editable.Input />
            </Editable.Root>
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack width={"full"} justifyContent="space-between">
          <FormatNumber
            value={bank.Balance ?? 0}
            style="currency"
            currency="EUR"
          ></FormatNumber>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default BankCard;
