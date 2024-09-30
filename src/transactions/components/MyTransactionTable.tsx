import {
  ActionBarSeparator,
  chakra,
  FormatNumber,
  HStack,
  Icon,
  Kbd,
  Table,
} from "@chakra-ui/react";
import useCategories from "../../categories/hooks/useCategories";
import { useIconPack } from "../../common/hooks/useIconPack";
import useAccounts from "../../manage-banks-accounts/hooks/useAccounts";
import Transaction from "../model/Transaction";
import { useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { TbArrowBarDown, TbArrowBarUp } from "react-icons/tb";
import { Tag } from "../../components/ui/tag";
import useSorting from "../../common/hooks/useSorting";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
} from "../../components/ui/action-bar";
import { Button } from "../../components/ui/button";

interface Props {
  data: Transaction[];
}
const MyTransactionTable = ({ data }: Props) => {
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();
  const { isSorting, getSortingState } = useSorting();
  const iconPack = useIconPack();
  const [selection, setSelection] = useState<string[]>([]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < data.length;

  return (
    <>
      {accounts.length > 0 && categories.length > 0 && (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>
                <Checkbox
                  top="1"
                  aria-label="Select all rows"
                  checked={
                    indeterminate ? "indeterminate" : selection.length > 0
                  }
                  onCheckedChange={(changes) => {
                    setSelection(
                      changes.checked ? data.map((item) => "" + item.Id!!) : []
                    );
                  }}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
              <Table.ColumnHeader>
                <HStack>
                  Name
                  <chakra.span pl="4">
                    {isSorting("Name") ? (
                      getSortingState() === "desc" ? (
                        <LuChevronDown aria-label="sorted descending" />
                      ) : (
                        <LuChevronUp aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </HStack>
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                <HStack>
                  {" "}
                  Description
                  <chakra.span pl="4">
                    {isSorting("Description") ? (
                      getSortingState() === "desc" ? (
                        <LuChevronDown aria-label="sorted descending" />
                      ) : (
                        <LuChevronUp aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </HStack>
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                <HStack>
                  Amount
                  <chakra.span pl="4">
                    {isSorting("Amount") ? (
                      getSortingState() === "desc" ? (
                        <LuChevronDown aria-label="sorted descending" />
                      ) : (
                        <LuChevronUp aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </HStack>
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                <HStack>
                  Date
                  <chakra.span pl="4">
                    {isSorting("Name") ? (
                      getSortingState() === "desc" ? (
                        <LuChevronDown aria-label="sorted descending" />
                      ) : (
                        <LuChevronUp aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </HStack>
              </Table.ColumnHeader>
              <Table.ColumnHeader>Account</Table.ColumnHeader>
              <Table.ColumnHeader>Categories</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((t) => (
              <Table.Row key={t.Id}>
                <Table.Cell>
                  <Checkbox
                    top="1"
                    aria-label="Select row"
                    checked={selection.includes("" + t.Id)}
                    onCheckedChange={(changes) => {
                      setSelection((prev) =>
                        changes.checked
                          ? [...prev, "" + t.Id]
                          : selection.filter((id) => id !== "" + t.Id)
                      );
                    }}
                  />
                </Table.Cell>
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
                <Table.Cell>{t.Description}</Table.Cell>
                <Table.Cell>
                  <FormatNumber
                    value={t.Amount}
                    style={"currency"}
                    currency="EUR"
                  />
                </Table.Cell>
                <Table.Cell>{t.Date}</Table.Cell>
                <Table.Cell>
                  {accounts.find((a) => a.Id === t.accountId) &&
                    accounts.find((a) => a.Id === t.accountId)?.Name}
                </Table.Cell>
                <Table.Cell>
                  {t.categories.map((val) => {
                    const cat = categories.find((c) => c.Id === val)!!;
                    return (
                      <Tag
                        key={cat.Id}
                        rounded={"md"}
                        startElement={
                          <Icon
                            as={
                              iconPack?.find((icon) => icon.name === cat.Icon)
                                ?.icon!!
                            }
                          />
                        }
                      >
                        {cat.Name}
                      </Tag>
                    );
                  })}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.ColumnHeader></Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
            <Table.ColumnHeader>Total</Table.ColumnHeader>
            <Table.ColumnHeader>
              <FormatNumber
                value={data.reduce((total, { Amount }) => (total += Amount), 0)}
                style={"currency"}
                currency="EUR"
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Footer>
        </Table.Root>
      )}

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} selected
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            Delete <Kbd>⌫</Kbd>
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  );
};

export default MyTransactionTable;
