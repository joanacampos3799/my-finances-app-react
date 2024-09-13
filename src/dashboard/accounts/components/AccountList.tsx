import { Heading } from "@chakra-ui/react";
import { List } from "@chakra-ui/react/list";
import useBanks from "../../../manage-banks-accounts/hooks/useBanks";
import AccountComponent from "./AccountComponent";

const AccountList = () => {
  const banks = useBanks();
  return (
    <>
      {banks && banks.count > 0 ? (
        <>
          <Heading paddingBottom={2}>Accounts</Heading>
          <List.Root gap="2" variant="plain" align="center">
            {banks.data.map((bank) => (
              <List.Item key={bank.Id}>
                <AccountComponent bank={bank} />
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
