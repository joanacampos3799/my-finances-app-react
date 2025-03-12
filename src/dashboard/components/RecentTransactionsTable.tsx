import React from "react";
import Transaction from "../../transactions/model/Transaction";
import {
  Flex,
  FormatNumber,
  Heading,
  Icon,
  Link,
  Table,
} from "@chakra-ui/react";
import { TbArrowBarDown, TbArrowBarUp } from "react-icons/tb";
import CategoryTag from "../../common/components/CategoryTag";
import useDateFilter from "../../common/hooks/useDateFilter";

interface Props {
  transactions: Transaction[];
}
const RecentTransactionsTable = ({ transactions }: Props) => {
  const { parseDate } = useDateFilter();
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
      <Flex direction={"row"} justifyContent={"space-between"}>
        <Heading color="teal.700">Recent Transactions</Heading>
        <Link href="/s/transactions" color={"teal.700"}>
          See all
        </Link>
      </Flex>

      <Table.Root stickyHeader colorPalette={"teal"}>
        <Table.Header>
          <Table.Row></Table.Row>
          <Table.ColumnHeader w={"30px"}></Table.ColumnHeader>
          <Table.ColumnHeader w={"100px"}>Name</Table.ColumnHeader>
          <Table.ColumnHeader w={"100px"}>Amount</Table.ColumnHeader>
          <Table.ColumnHeader w={"100px"}>Date</Table.ColumnHeader>
          <Table.ColumnHeader w={"100px"}>Account</Table.ColumnHeader>
          <Table.ColumnHeader w={"100px"}>Categories</Table.ColumnHeader>
        </Table.Header>
        <Table.Body>
          {transactions.map((t) => (
            <Table.Row key={t.Id + "-recent"}>
              <Table.Cell>
                {t.transactionType === 1 ? (
                  <Icon>
                    <TbArrowBarDown />
                  </Icon>
                ) : (
                  <Icon>
                    <TbArrowBarUp />
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
                {t.categories.map((val) => (
                  <CategoryTag category={val} key={val.Id + "-cat_tag"} />
                ))}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default RecentTransactionsTable;
