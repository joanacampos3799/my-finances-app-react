import { GridItem, Show, SimpleGrid } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import Account from "../Account";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import AccountCard from "./AccountCard";
import DeleteAccountCard from "./DeleteAccountCard";
import NewAccountDrawer from "./NewAccountDrawer";

interface Props {
  accounts: Account[];
}
const AccountsGrid = ({ accounts }: Props) => {
  const [toDelete, setToDelete] = useState<Account[]>([]);
  const [deleting, setDeleting] = useState(false);
  const deleteAccount = useDeleteAccount();
  const handleDelete = () => {
    toDelete.forEach((element) => {
      element.deleted = true;
      deleteAccount(element);
    });

    setDeleting(false);
  };
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 5 }} gap={6} padding="10px">
      <GridItem colSpan={{ sm: 0, md: 1, lg: 3, xl: 4 }}></GridItem>
      <GridItem>
        {deleting ? (
          <Button float={"right"} onClick={handleDelete}>
            {" "}
            <FaCheck />
          </Button>
        ) : (
          <Button float={"right"} onClick={() => setDeleting(true)}>
            {" "}
            Delete Accounts
          </Button>
        )}
      </GridItem>

      {accounts.map((account) => (
        <GridItem key={account.Id}>
          {!deleting ? (
            <AccountCard account={account} />
          ) : (
            <DeleteAccountCard
              account={account}
              toDelete={toDelete}
              setToDelete={setToDelete}
            />
          )}
        </GridItem>
      ))}
      <Show when={!deleting}>
        <NewAccountDrawer isEmpty={false} />
      </Show>
    </SimpleGrid>
  );
};

export default AccountsGrid;
