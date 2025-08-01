import { Flex, HStack, Table, useBreakpointValue } from "@chakra-ui/react";

import TableHeader from "../../common/components/TableHeader";
import { useEffect, useState } from "react";
import { useDeleteInstitution } from "../hooks/useDeleteInstitution";
import InstitutionList from "../model/InstitutionList";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";
import useSorting from "../../common/hooks/useSorting";
import InstitutionRow from "./InstitutionRow";
import InstitutionCard from "./InstitutionCard";

interface Props {
  institutions: InstitutionList[];
}

const InstitutionsList = ({ institutions }: Props) => {
  const { getSortingState, sortString, sortNumber, isSorting, SortSum } =
    useSorting();

  const [sortedInstitutions, setSortedInstitutions] =
    useState<InstitutionList[]>(institutions);
  const [page, setPage] = useState(1);
  const [institutionCount, setInstitutionCount] = useState(institutions.length);
  const size = 5;

  useEffect(() => {
    setInstitutionCount(institutions.length);
    setSortedInstitutions(institutions.slice((page - 1) * size, page * size));
  }, [institutions, page, size]);

  const handlePageChange = (page: number) => {
    setPage(page);
    setSortedInstitutions(institutions.slice((page - 1) * size, page * size));
  };

  const deleteInstitution = useDeleteInstitution();
  const handleDelete = (element: InstitutionList) => {
    element.deleted = true;
    deleteInstitution(element);
  };
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Flex direction="column" gap={3} p={2}>
        {sortedInstitutions.map((institution) => (
          <InstitutionCard
            key={institution.Id + "-mobile"}
            institution={institution}
            onDelete={handleDelete}
          />
        ))}

        <PaginationRoot
          count={institutionCount}
          pageSize={size}
          page={page}
          onPageChange={(e) => handlePageChange(e.page)}
        >
          <HStack wrap="wrap" justifyContent="center" mt={2}>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Flex>
    );
  }
  return (
    <Flex p={"10px"}>
      <Flex
        justifyContent={"center"}
        bgColor="white"
        gap={2}
        py={2}
        borderRadius={"md"}
        direction={"column"}
        w="full"
      >
        <Table.Root stickyHeader colorPalette={"teal"}>
          <Table.Header>
            <Table.Row>
              <TableHeader
                label="Name"
                w={"100px"}
                sortFn={() => {
                  setSortedInstitutions(
                    sortString(institutions, "Name", "Name", "Id")
                  );
                }}
                isSorting={isSorting("Name")}
                sortingState={getSortingState()}
              />
              <TableHeader
                label="Type"
                w={"100px"}
                sortFn={() => {
                  setSortedInstitutions(
                    sortString(institutions, "Type", "Type", "Id")
                  );
                }}
                isSorting={isSorting("Type")}
                sortingState={getSortingState()}
              />
              <TableHeader
                label="Current Balance"
                w={"140px"}
                sortFn={() => {
                  setSortedInstitutions(
                    sortNumber(institutions, "Balance", "Current Balance", "Id")
                  );
                }}
                isSorting={isSorting("Current Balance")}
                sortingState={getSortingState()}
              />
              <TableHeader
                label={"#Accounts"}
                w={"80px"}
                isSorting={isSorting("#Accounts")}
                sortingState={getSortingState()}
                sortFn={() =>
                  setSortedInstitutions(
                    SortSum(institutions, "Accounts", "#Accounts", "Id")
                  )
                }
              />
              <Table.ColumnHeader w="80px" textAlign={"end"}>
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedInstitutions.map((institution) => (
              <InstitutionRow
                key={institution.Id + "-institution"}
                institution={institution}
                onDelete={handleDelete}
              />
            ))}
          </Table.Body>
        </Table.Root>
        <PaginationRoot
          count={institutionCount}
          pageSize={size}
          page={page}
          colorPalette={"teal"}
          onPageChange={(e) => handlePageChange(e.page)}
        >
          <HStack flexWrap={"wrap"} justifyContent={"center"}>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Flex>
    </Flex>
  );
};

export default InstitutionsList;
