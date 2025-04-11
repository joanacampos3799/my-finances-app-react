import { Box, Flex, HStack } from "@chakra-ui/react";
import InstitutionsKPIs from "../components/InstitutionsKPIs";
import InstitutionsList from "../components/InstitutionsList";
import useInstitutions from "../hooks/useInstitutions";
import { HelperEntity } from "../../common/helper";
import InstitutionList from "../model/InstitutionList";
import { useMutationState } from "@tanstack/react-query";
import { queryKeys } from "../../common/constants";
import NewInstitutionModal from "../components/NewInstitutionModal";
import CollapsibleTitle from "../../common/components/CollapsibleTitle";
import { EmptyState } from "../../components/ui/empty-state";
import { LuLandmark } from "react-icons/lu";
import TimePeriodMenu from "../../common/components/TimePeriodMenu";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import LoadingPage from "../../common/components/LoadingPage";

const InstitutionsPage = () => {
  const { period, setPeriod } = usePeriodStore();
  const { institutions, isLoading } = useInstitutions();
  const pendingInstiutionData = useMutationState({
    filters: {
      mutationKey: [queryKeys.institutions],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as InstitutionList;
    },
  });
  const pendingInstitution = pendingInstiutionData
    ? pendingInstiutionData[0]
    : null;
  let instData = institutions.data;
  let instCount = institutions.count;

  const institutionHelper = new HelperEntity<InstitutionList>();
  if (pendingInstitution) {
    const { tCount, tData } = institutionHelper.getPendingData(
      institutions,
      pendingInstitution
    );
    instCount = tCount;
    instData = tData;
  }
  if (isLoading || !institutions.isValueSet) return <LoadingPage />;
  return (
    <Box padding={"15px"}>
      <HStack
        px="10px"
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        justifyItems={"flex-end"}
      >
        <CollapsibleTitle
          title={"Institutions"}
          description={
            "On the Institutions page, you can easily manage all the financial institutions. This page provides a simple and organized way to keep track of your institutions."
          }
        />
        <Flex
          direction={"row"}
          gap={2}
          alignItems={"flex-start"}
          justifyItems={"flex-end"}
        >
          <TimePeriodMenu period={period} setPeriod={setPeriod} />
          <NewInstitutionModal />
        </Flex>
      </HStack>
      {!instData || instCount === 0 ? (
        <EmptyState
          icon={<LuLandmark />}
          bgColor={"gray.100"}
          p="10%"
          title="Start adding your institutions"
          description="Add one of your institutions to get started"
        >
          <NewInstitutionModal />
        </EmptyState>
      ) : (
        <Flex direction={"column"} gap={2}>
          <InstitutionsKPIs institutions={instData} />
          <InstitutionsList institutions={instData} />
        </Flex>
      )}
    </Box>
  );
};

export default InstitutionsPage;
