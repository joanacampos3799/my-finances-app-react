import { Heading } from "@chakra-ui/react";
import { List } from "@chakra-ui/react/list";
import AccountComponent from "./AccountComponent";
import useAccounts from "../../../manage-banks-accounts/hooks/useAccounts";

const AccountList = () => {
  const accounts = useAccounts();
  return (
    <>
      {accounts && accounts.count > 0 ? (
        <>
          <Heading size={"md"} paddingTop={6} paddingBottom={2}>
            Accounts
          </Heading>
          <List.Root gap="2" variant="plain" align="center">
            {accounts.data.map((account) => (
              <List.Item key={account.Id}>
                <AccountComponent account={account} />
              </List.Item>
            ))}
          </List.Root>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AccountList;
