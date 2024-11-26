import DialogComponent from "../../common/components/DialogComponent";

import Category from "../model/Category";
import TransactionTable from "../../transactions/components/TransactionTable";
import {
  Editable,
  Flex,
  FormatNumber,
  Heading,
  HStack,
  Separator,
  Show,
  Text,
} from "@chakra-ui/react";
import NewTransactionDrawer from "../../transactions/components/NewTransactionDrawer";
import { useState } from "react";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import useInsights from "../../common/hooks/useInsights";
import { Tag } from "../../components/ui/tag";
import usePeriodStore from "../../common/hooks/usePeriodStore";

interface Props {
  category: Category;
  total: number;
  totalExpense: number;
  totalIncome: number;
}

const CategoryDetails = ({ category, total }: Props) => {
  const { period } = usePeriodStore();
  const [notes, setNotes] = useState(category.Notes ?? undefined);
  const { getTransactionsAverageAmount, budgetInsight, spendingTrendInsight } =
    useInsights();
  const update = useUpdateCategory(() => {});
  const handleUpdate = () => {
    update({ ...category, Notes: notes });
  };
  return (
    <DialogComponent
      icon={category.Icon}
      size="xl"
      title={
        category.Name +
        `'${category.Name.endsWith("s") ? "" : "s"} Transactions`
      }
      footer={<NewTransactionDrawer categoriesIds={[category.Id!!]} />}
    >
      <Flex direction={"column"} gap={5} mb={3}>
        <Flex direction={"row"} gap={10}>
          <Show when={category.Budget}>
            <HStack>
              <Heading color={"teal.700"} size={"sm"}>
                {" "}
                Budget Amount{" "}
              </Heading>
              <FormatNumber
                value={category.Budget!!}
                style="currency"
                currency="Eur"
              />
            </HStack>
          </Show>
          <HStack>
            <Show when={category.CategoryType !== 1}>
              <Heading color={"teal.700"} size={"sm"}>
                {" "}
                Total Spending
              </Heading>
              <FormatNumber value={total} style="currency" currency="Eur" />
            </Show>
            <Show when={category.CategoryType !== 0}>
              <Heading color={"teal.700"} size={"sm"}>
                {" "}
                Total Income
              </Heading>
              <FormatNumber value={total} style="currency" currency="Eur" />
            </Show>
            <Show when={category.CategoryType === 2}>
              <Heading color={"teal.700"} size={"sm"}>
                {" "}
                Net Balance
              </Heading>
              <FormatNumber value={total} style="currency" currency="Eur" />
            </Show>
          </HStack>
          <Show when={category.Budget}>
            <HStack>
              <Heading color={"teal.700"} size={"sm"}>
                {" "}
                Budget Status
              </Heading>
              <Tag
                variant="subtle"
                colorPalette={total > category.Budget!! ? "red" : "green"}
              >
                {total > category.Budget!! ? "Over Budget" : "Within Budget"}
              </Tag>
            </HStack>
          </Show>
        </Flex>
        <Flex direction={"row"} gap={10}>
          <HStack>
            <Heading color={"teal.700"} size="sm">
              Total Transactions
            </Heading>
            {category.Transactions.length}
          </HStack>
          <HStack>
            <Heading color={"teal.700"} size="sm">
              Average Transaction Amount
            </Heading>

            <FormatNumber
              value={getTransactionsAverageAmount(category.Transactions)}
              style="currency"
              currency="Eur"
            />
          </HStack>
        </Flex>
      </Flex>

      <Separator />
      <Flex direction={"column"} mt={3} gap={3}>
        <Show when={category.Budget}>
          <Text>{budgetInsight(total, category.Budget!!)}</Text>
        </Show>
        <Text>{spendingTrendInsight(category.Transactions, period)}</Text>
      </Flex>
      <Editable.Root
        mt={3}
        textAlign="start"
        value={notes}
        onValueChange={(e) => setNotes(e.value)}
        defaultValue="Add a note..."
        onValueCommit={handleUpdate}
      >
        <Editable.Preview />
        <Editable.Textarea />
      </Editable.Root>
      <TransactionTable data={category.Transactions} fromCategory />
    </DialogComponent>
  );
};

export default CategoryDetails;
