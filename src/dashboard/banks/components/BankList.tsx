import { Heading } from "@chakra-ui/react";
import { List } from "@chakra-ui/react/list";
import useBanks from "../../../manage-banks-accounts/hooks/useBanks";
import BankComponent from "./BankComponent";

const BankList = () => {
  const banks = useBanks();
  return (
    <>
      {banks && banks.count > 0 ? (
        <>
          <Heading size="md" paddingBottom={2}>
            Banks
          </Heading>
          <List.Root gap="2" variant="plain" align="center">
            {banks.data.map((bank) => (
              <List.Item key={bank.Id}>
                <BankComponent bank={bank} />
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

export default BankList;
