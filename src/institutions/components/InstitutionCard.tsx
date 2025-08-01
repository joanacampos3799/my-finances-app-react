import { Box, Flex, Icon, Text, Button, HStack } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { FormatNumber } from "@chakra-ui/react";
import { FaPen } from "react-icons/fa6";

import useInsights from "../../common/hooks/useInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useMonthStore from "../../common/hooks/useMonthStore";
import { institutionTypes, timePeriods } from "../../common/constants";
import { useIconPack } from "../../common/hooks/useIconPack";
import InstitutionList from "../model/InstitutionList";
import InstitutionDetails from "./InstitutionDetails";
import NewInstitutionModal from "./NewInstitutionModal";

interface Props {
  institution: InstitutionList;
  onDelete: (institution: InstitutionList) => void;
}
const InstitutionCard = ({ institution, onDelete }: Props) => {
  return (
    <Box bg="white" borderRadius="md" boxShadow="sm" p={3} mb={3} w="full">
      <Flex align="center" mb={2} gap={2}>
        <Text fontWeight="bold" fontSize="lg" color={"teal.700"}>
          {institution.Name}
        </Text>
        <HStack ml="auto">
          <InstitutionDetails institution={institution} />
          <NewInstitutionModal institution={institution} />
          <Button
            h="32px"
            w="32px"
            bgColor="red.500"
            onClick={() => onDelete(institution)}
          >
            <LuTrash2 />
          </Button>
        </HStack>
      </Flex>
      <Flex direction="column" gap={1}>
        <Text fontSize="sm">
          <b>Type:</b>
          {" " + institutionTypes[institution.Type].name}
        </Text>

        <Text fontSize="sm">
          <b>#Accounts:</b> {institution.Accounts?.length ?? 0}
        </Text>
        <Text fontSize="sm">
          <b>Balance:</b>{" "}
          <FormatNumber
            value={institution.Balance ?? 0}
            style="currency"
            currency="EUR"
          />
        </Text>
      </Flex>
    </Box>
  );
};
export default InstitutionCard;
