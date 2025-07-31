import Transaction from "../../transactions/model/Transaction";
import {
  Box,
  Flex,
  FormatNumber,
  Heading,
  Icon,
  Link,
  Table,
  useBreakpointValue,
} from "@chakra-ui/react";
import CategoryTag from "../../common/components/CategoryTag";
import useDateFilter from "../../common/hooks/useDateFilter";
import {
  LuArrowDownToLine,
  LuArrowDownUp,
  LuArrowUpFromLine,
} from "react-icons/lu";

interface Props {
  transactions: Transaction[];
}
const RecentTransactionsTable = ({ transactions }: Props) => {
  const { parseDate } = useDateFilter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    // Mobile: Card layout
    return (
      <Flex
        direction="column"
        gap={3}
        bgColor="white"
        py={2}
        px={2}
        borderRadius="md"
        w="full"
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Heading color="teal.700" fontSize="lg">
            Recent Transactions
          </Heading>
          <Link href="/s/transactions" color="teal.700" fontSize="sm">
            See all
          </Link>
        </Flex>
        {transactions.map((t) => (
          <Flex
            key={t.Id + "-recent-mobile"}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={3}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
            gap={2}
          >
            <Icon
              color={
                t.transactionType === 0
                  ? "red.500"
                  : t.transactionType === 1
                    ? "green.500"
                    : "blue.500"
              }
            >
              {t.transactionType === 0 ? (
                <LuArrowUpFromLine />
              ) : t.transactionType === 1 ? (
                <LuArrowDownToLine />
              ) : (
                <LuArrowDownUp />
              )}
            </Icon>
            <Flex direction="column" flex="1" ml={2}>
              <Flex fontWeight="bold">{t.Name}</Flex>
              <Flex fontSize="sm" color="gray.500">
                {parseDate(t.Date).toLocaleDateString()} • {t.accountName}
              </Flex>
              {t.category && (
                <Box mt={1}>
                  <CategoryTag
                    category={t.category}
                    key={t.category.Id + "-cat_tag"}
                  />
                </Box>
              )}
            </Flex>
            <Flex
              fontWeight="bold"
              color={
                t.transactionType === 0
                  ? "red.500"
                  : t.transactionType === 1
                    ? "green.500"
                    : "blue.500"
              }
            >
              <FormatNumber value={t.Amount} style="currency" currency="EUR" />
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }

  return (
    <Flex
      justifyContent={"center"}
      bgColor="white"
      gap={2}
      py={2}
      px={2}
      borderRadius={"md"}
      direction={"column"}
      w="full"
    >
      <Flex direction={"row"} justifyContent={"space-between"} mt={3}>
        <Heading color="teal.700">Recent Transactions</Heading>
        <Link href="/s/transactions" color={"teal.700"}>
          See all
        </Link>
      </Flex>

      <Table.Root stickyHeader colorPalette={"teal"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w={"30px"}></Table.ColumnHeader>
            <Table.ColumnHeader w={"100px"}>Name</Table.ColumnHeader>
            <Table.ColumnHeader w={"100px"}>Amount</Table.ColumnHeader>
            <Table.ColumnHeader w={"100px"}>Date</Table.ColumnHeader>
            <Table.ColumnHeader w={"100px"}>Account</Table.ColumnHeader>
            <Table.ColumnHeader w={"100px"}>Categories</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactions.map((t) => (
            <Table.Row key={t.Id + "-recent"}>
              <Table.Cell>
                {t.transactionType === 0 ? (
                  <Icon color={"red.500"}>
                    <LuArrowUpFromLine />
                  </Icon>
                ) : t.transactionType === 1 ? (
                  <Icon color={"green.500"}>
                    <LuArrowDownToLine />
                  </Icon>
                ) : (
                  <Icon color={"blue.500"}>
                    <LuArrowDownUp />
                  </Icon>
                )}
              </Table.Cell>
              <Table.Cell>{t.Name}</Table.Cell>
              <Table.Cell>
                <FormatNumber
                  value={t.Amount}
                  style={"currency"}
                  currency="EUR"
                />
              </Table.Cell>
              <Table.Cell>{parseDate(t.Date).toDateString()}</Table.Cell>

              <Table.Cell>{t.accountName}</Table.Cell>

              <Table.Cell>
                {t.category && (
                  <CategoryTag
                    category={t.category}
                    key={t.category.Id + "-cat_tag"}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default RecentTransactionsTable;
