import { Box, Flex, HStack, Show, useBreakpointValue } from "@chakra-ui/react";
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
import useMonthStore from "../../common/hooks/useMonthStore";
import MonthlyMenu from "../../common/components/MonthlyMenu";
import NavbarMobile from "../../hero/components/NavbarMobile";
import HamburgerMenu from "../../common/components/HamburgerMenu";

const InstitutionsPage = () => {
  const { period, setPeriod } = usePeriodStore();
  const { month, setMonth } = useMonthStore();
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
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isLoading || !institutions.isValueSet) return <LoadingPage />;
  return (
    <Box padding={{ base: "8px", md: "15px" }}>
      <HStack
        px={{ base: 0, md: "10px" }}
        flexDirection={"row"}
        alignItems={{ base: "stretch", md: "flex-start" }}
        justifyContent="space-between"
        gap={{ base: 4, md: 0 }}
      >
        {isMobile && <NavbarMobile />}
        <CollapsibleTitle
          title={"Institutions"}
          description={
            "On the Institutions page, you can easily manage all the financial institutions. This page provides a simple and organized way to keep track of your institutions."
          }
        />
        {isMobile ? (
          <HamburgerMenu>
            <Flex
              direction={"column"}
              gap={2}
              alignItems={"flex-start"}
              justifyItems={"flex-end"}
            >
              <TimePeriodMenu period={period} setPeriod={setPeriod} />
              <Show when={period === "Monthly"}>
                <MonthlyMenu month={month} setMonth={setMonth} />
              </Show>
              <NewInstitutionModal />
            </Flex>
          </HamburgerMenu>
        ) : (
          <Flex
            direction={"row"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            <TimePeriodMenu period={period} setPeriod={setPeriod} />
            <Show when={period === "Monthly"}>
              <MonthlyMenu month={month} setMonth={setMonth} />
            </Show>
            <NewInstitutionModal />
          </Flex>
        )}
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
