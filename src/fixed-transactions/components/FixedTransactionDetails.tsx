import React from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { LuMaximize2 } from "react-icons/lu";
import { FormatNumber, Heading, HStack, Icon } from "@chakra-ui/react";
import FixedTransaction from "../FixedTransaction";
import { useIconPack } from "../../common/hooks/useIconPack";
import { DataListItem, DataListRoot } from "../../components/ui/data-list";
import { movementTypes } from "../../common/constants";
import useCategories from "../../categories/hooks/useCategories";
import { Tag } from "../../components/ui/tag";
import useFixedTransaction from "../hooks/useFixedTransaction";

interface Props {
  fixed: FixedTransaction;
}
const FixedTransactionDetails = ({ fixed }: Props) => {
  const iconPack = useIconPack();
  const categories = useCategories();
  const fixedTransaction = useFixedTransaction(fixed);
  return (
    <DialogRoot size="xl" centered motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <LuMaximize2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <HStack>
              <Icon boxSize={4}>
                <Icon
                  boxSize={4}
                  as={
                    iconPack?.find(
                      (icon) => icon.name === fixedTransaction.Icon
                    )?.icon
                  }
                ></Icon>
              </Icon>
              <Heading>{fixedTransaction.Name} Details</Heading>
            </HStack>
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <DataListRoot>
            <DataListItem label="Name" value={fixedTransaction.Name} />

            <DataListItem label="Amount" value={""}>
              <FormatNumber
                value={fixedTransaction.Amount}
                style="currency"
                currency="EUR"
              />
            </DataListItem>

            <DataListItem label="Total Spent" value={""}>
              <FormatNumber
                value={fixedTransaction.TotalSpent}
                style="currency"
                currency="EUR"
              />
            </DataListItem>

            <DataListItem
              label="Payment Day"
              value={fixedTransaction.PaymentDay}
            />
            <DataListItem
              label="Periodicity"
              value={
                "Every" +
                (fixedTransaction.Periodicity === 1
                  ? " month"
                  : fixed.Periodicity + " months")
              }
            />

            <DataListItem
              label="Transaction Type"
              value={
                movementTypes.find(
                  (mt) => mt.id === fixedTransaction.transactionType
                )?.name
              }
            />

            <DataListItem label="Categories(s)" value={""}>
              <HStack>
                {categories.data
                  .filter((cat) =>
                    fixedTransaction.categories.includes(cat.Id!!)
                  )
                  .map((i) => (
                    <Tag key={i.Id} rounded="md" variant="solid" pe="2">
                      <Icon
                        boxSize={4}
                        as={
                          iconPack?.find((icon) => icon.name === i.Icon)?.icon
                        }
                      ></Icon>{" "}
                      {i.Name}
                    </Tag>
                  ))}
              </HStack>
            </DataListItem>
          </DataListRoot>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default FixedTransactionDetails;
