import { FormatNumber, HStack } from "@chakra-ui/react";
import AccountDetails from "./AccountDetails";
import ListCard from "../../../common/components/ListCard";
import AccountList from "../../models/AccountList";

interface Props {
  account: AccountList;
}
const AccountCard = ({ account }: Props) => {
  return (
    <ListCard data={account} icon={"FaMoneyBills"}>
      <HStack width={"full"} justifyContent="space-between">
        <FormatNumber
          value={account.Balance ?? 0}
          style="currency"
          currency="EUR"
        ></FormatNumber>
        {account.Id !== undefined && !account.deleted && (
          <AccountDetails id={account.Id} />
        )}
      </HStack>
    </ListCard>
  );
};

export default AccountCard;
