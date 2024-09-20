import { FormatNumber, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import AccountCard from "./AccountCard";
import NewAccountDrawer from "./NewAccountDrawer";
import Grid from "../../../common/components/Grid";
import DeleteCard from "../../../common/components/DeleteCard";
import AccountList from "../../models/AccountList";

interface Props {
  accounts: AccountList[];
}
const AccountsGrid = ({ accounts }: Props) => {
  const [toDelete, setToDelete] = useState<AccountList[]>([]);
  const [deleting, setDeleting] = useState(false);
  const deleteAccount = useDeleteAccount();
  const handleDelete = () => {
    toDelete.forEach((element) => {
      element.deleted = true;
      deleteAccount(element);
    });
    setToDelete([]);
    setDeleting(false);
  };
  return (
    <Grid
      key={"account-grid"}
      action={"Delete"}
      name={"Accounts"}
      handleDelete={handleDelete}
      addComponent={<NewAccountDrawer isEmpty={false} />}
      deleting={deleting}
      setDeleting={setDeleting}
    >
      {accounts.map((account) => (
        <GridItem key={account.Id}>
          {!deleting ? (
            <AccountCard account={account} />
          ) : (
            <DeleteCard
              data={account}
              icon={"FaMoneyBills"}
              toDelete={toDelete}
              setToDelete={setToDelete}
            >
              <FormatNumber
                value={account.Balance ?? 0}
                style="currency"
                currency="EUR"
              />
            </DeleteCard>
          )}
        </GridItem>
      ))}
    </Grid>
  );
};

export default AccountsGrid;
