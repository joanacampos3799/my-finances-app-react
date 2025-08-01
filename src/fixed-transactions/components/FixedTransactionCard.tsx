import { Box, Flex, Text, Icon, Button, HStack } from "@chakra-ui/react";
import { FaPen } from "react-icons/fa6";
import { LuArchiveRestore, LuTrash2 } from "react-icons/lu";
import FixedTransactionDetails from "./FixedTransactionDetails";
import NewFixedTransactionDrawer from "./NewFixedTransactionDrawer";
import CategoryTag from "../../common/components/CategoryTag";
import { movementTypes } from "../../common/constants";
import { useIconPack } from "../../common/hooks/useIconPack";
import { FormatNumber } from "@chakra-ui/react";
import FixedTransactionList from "../model/FixedTransactionsList";

interface Props {
  fixed: FixedTransactionList;
  onDelete: (fixed: FixedTransactionList) => void;
}

const FixedTransactionCard = ({ fixed, onDelete }: Props) => {
  const iconPack = useIconPack();
  const FxIcon = iconPack?.find((i) => i.name === fixed.Icon)?.icon ?? FaPen;

  return (
    <Box bg="white" borderRadius="md" boxShadow="sm" p={3} mb={3} w="full">
      <Flex align="center" gap={2} mb={2}>
        <Icon color="teal.500">
          <FxIcon />
        </Icon>
        <Text fontWeight="bold" fontSize="lg">
          {fixed.Name}
        </Text>
        <HStack ml="auto">
          <FixedTransactionDetails id={fixed.Id!!} />
          <NewFixedTransactionDrawer fixedTransaction={fixed} />
          <Button
            h="32px"
            w="32px"
            bgColor="red.500"
            onClick={() => onDelete(fixed)}
          >
            {fixed.active ? <LuTrash2 /> : <LuArchiveRestore />}
          </Button>
        </HStack>
      </Flex>
      <Flex direction="column" gap={1}>
        <Text fontSize="sm">
          <b>Amount:</b>{" "}
          <FormatNumber value={fixed.Amount} style="currency" currency="EUR" />
        </Text>
        <Text fontSize="sm">
          <b>Type:</b>{" "}
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <span>{movementTypes[fixed.transactionType].name}</span>
          </span>
        </Text>
        <Text fontSize="sm">
          <b>Category:</b>{" "}
          <CategoryTag
            category={fixed.category}
            key={fixed.category.Id + "-cat_tag"}
          />
        </Text>
      </Flex>
    </Box>
  );
};

export default FixedTransactionCard;
