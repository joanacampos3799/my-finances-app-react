import { Card, FormatNumber, HStack, Icon } from "@chakra-ui/react";
import { FaMoneyBills } from "react-icons/fa6";
import { useState } from "react";
import Account from "../Account";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import AccountDetails from "./AccountDetails";

interface Props {
  account: Account;
}
const AccountCard = ({ account }: Props) => {
  return (
    <Card.Root variant={"elevated"} width={"full"}>
      <Card.Header>
        <HStack justifyContent="space-between">
          <HStack justifyContent="center">
            <Icon boxSize={4}>
              <FaMoneyBills />
            </Icon>
            {account.Name}
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack width={"full"} justifyContent="space-between">
          <FormatNumber
            value={account.Balance ?? 0}
            style="currency"
            currency="EUR"
          ></FormatNumber>
          <AccountDetails account={account} />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default AccountCard;
