import {
  Flex,
  Text,
  Badge,
  Button,
  HStack,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { LuArchiveRestore, LuTrash2 } from "react-icons/lu";
import { FormatNumber } from "@chakra-ui/react";
import NewAccountDrawer from "./NewAccountDrawer";
import useInsights from "../../common/hooks/useInsights";
import { accountTypes } from "../../common/constants";
import AccountList from "../models/AccountList";

interface Props {
  account: AccountList;
  fromInstitution?: boolean;
  onArquiveRestore: (account: AccountList) => void;
  onDelete: (account: AccountList) => void;
}

const AccountCard = ({
  account,
  fromInstitution,
  onArquiveRestore,
  onDelete,
}: Props) => {
  const { findMostRecentTransaction } = useInsights();

  return (
    <LinkBox bg="white" borderRadius="md" boxShadow="sm" p={3} mb={3} w="full">
      <LinkOverlay href={`/s/accounts/${account.Id}`}></LinkOverlay>
      <Flex align="center" mb={2} gap={2}>
        <Text fontWeight="bold" fontSize="lg">
          {account.Name}
        </Text>
        <Badge colorScheme="teal" ml={2}>
          {accountTypes[account.Type].name}
        </Badge>
        <HStack ml="auto">
          <NewAccountDrawer account={account} />
          <Button
            h="32px"
            w="32px"
            bgColor="red.500"
            onClick={() => onArquiveRestore(account)}
          >
            {account.active ? <LuTrash2 /> : <LuArchiveRestore />}
          </Button>
          {!account.active && (
            <Button
              h="32px"
              w="32px"
              bgColor="red.500"
              onClick={() => onDelete(account)}
            >
              <LuTrash2 />
            </Button>
          )}
        </HStack>
      </Flex>
      <Flex direction="column" gap={1}>
        {!fromInstitution && (
          <Text fontSize="sm" color="gray.600">
            <b>Institution:</b>{" "}
            {account.Institution ? account.Institution.Name : "—"}
          </Text>
        )}
        <Text fontSize="sm">
          <b>Balance:</b>{" "}
          <FormatNumber
            value={account.Balance ?? 0}
            style="currency"
            currency="EUR"
          />
        </Text>
        <Text fontSize="sm">
          <b>#Transactions:</b> {account.Transactions?.length ?? 0}
        </Text>
        <Text fontSize="sm">
          <b>Last Transaction:</b>{" "}
          {findMostRecentTransaction(account.Transactions)}
        </Text>
      </Flex>
    </LinkBox>
  );
};

export default AccountCard;
