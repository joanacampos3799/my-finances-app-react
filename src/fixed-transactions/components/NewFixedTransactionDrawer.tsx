import { useRef, useState } from "react";
import { useLoginData } from "../../auth/contexts/AuthContext";
import useAddFixedTransaction from "../hooks/useAddFixedTransaction";
import { movementTypes } from "../../common/constants";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { Box, Card, Group, HStack, Icon, Input, Stack } from "@chakra-ui/react";
import { FaPen, FaPlus } from "react-icons/fa6";
import IconPicker from "../../common/components/IconPicker";
import { Field } from "../../components/ui/field";
import { LuCheck, LuChevronDown, LuEuro } from "react-icons/lu";
import {
  NumberInputField,
  NumberInputRoot,
} from "../../components/ui/number-input";
import {
  MenuCheckboxItem,
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import Category from "../../categories/Category";
import useCategories from "../../categories/hooks/useCategories";
import FixedTransaction from "../FixedTransaction";
import { useUpdateFixedTransaction } from "../hooks/useUpdateFixedTransaction";

interface Props {
  isEmpty: boolean;
  fixed?: FixedTransaction;
}

interface CategorySelected {
  category: Category;
  checked: boolean;
}
const NewFixedTransactionDrawer = ({ isEmpty, fixed }: Props) => {
  const [icon, setIcon] = useState(fixed ? fixed.Icon : "");
  const [amount, setAmount] = useState(fixed ? fixed.Amount : 0.0);
  const [paymentDay, setPaymentDay] = useState(fixed ? fixed.PaymentDay : 1);
  const [periodicity, setPeriodicity] = useState(fixed ? fixed.Periodicity : 1);
  const [selectedTT, setSelectedTT] = useState<string>(
    fixed ? "" + fixed.transactionType : ""
  );
  const { userId } = useLoginData();
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const { data: categories } = useCategories();
  const initialState: CategorySelected[] = categories.map((cat) => {
    const mapped: CategorySelected = {
      category: cat,
      checked: fixed ? fixed.categories.includes(cat.Id!!) : false,
    };
    return mapped;
  });
  const [selectedCategories, setSelectedCategories] = useState(initialState);
  const uncheckAll = () => {
    const uncheck: CategorySelected[] = categories.map((cat) => {
      const mapped: CategorySelected = {
        category: cat,
        checked: false,
      };
      return mapped;
    });
    setSelectedCategories(uncheck);
  };
  const addFixedTransaction = useAddFixedTransaction(() => {
    setIcon("");
    setAmount(0.0);
    setPaymentDay(1);
    setPeriodicity(1);
    if (ref.current) ref.current.value = "";
    setSelectedTT("");
    setOpen(false);
    uncheckAll();
  });

  const update = useUpdateFixedTransaction();

  const handleUpdate = () => {
    update({
      Id: fixed?.Id,
      Name:
        ref.current?.value && ref.current.value !== ""
          ? ref.current.value
          : fixed?.Name!!,
      PaymentDay: paymentDay,
      Periodicity: periodicity,
      userId: fixed?.userId!!,
      categories: selectedCategories
        .filter((cat) => cat.checked)
        .map((cat) => cat.category.Id!!),
      active: fixed?.active!!,
      Icon: icon,
      Amount: amount,
      transactionType: movementTypes[+selectedTT].id,
    });
    setOpen(false);
  };

  const movementTypesSelect = movementTypes
    .filter((m) => m.id !== 0)
    .map((movementType) => {
      const mappedMovement = {
        label: movementType.name,
        value: movementType.id,
      };
      return mappedMovement;
    });
  return (
    <DrawerRoot
      open={open}
      size="sm"
      placement="end"
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DrawerBackdrop position="fixed" />
      <DrawerTrigger asChild>
        {isEmpty ? (
          <Button>Add Fixed Transactions</Button>
        ) : fixed ? (
          <Button variant={"plain"}>
            <Icon>
              <FaPen />
            </Icon>
          </Button>
        ) : (
          <Card.Root variant={"elevated"}>
            <Card.Body>
              <Button variant={"plain"} width={"full"} height={"full"}>
                <FaPlus />
              </Button>
            </Card.Body>
          </Card.Root>
        )}
      </DrawerTrigger>
      <DrawerContent offset="4" rounded="md">
        <DrawerCloseTrigger />
        <DrawerHeader>
          {fixed ? "Update " + fixed.Name : "Add a new Fixed Transaction"}
        </DrawerHeader>

        <DrawerBody>
          <form
            id="new-fixed-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (ref.current && ref.current.value) {
                addFixedTransaction({
                  Name: ref.current?.value,
                  Icon: icon,
                  Amount: amount,
                  transactionType: movementTypes[+selectedTT].id,
                  userId: userId!!,
                  PaymentDay: paymentDay,
                  Periodicity: periodicity,
                  active: true,
                  categories: selectedCategories
                    .filter((cat) => cat.checked)
                    .map((cat) => cat.category.Id!!),
                });
              }
            }}
          >
            <Stack>
              <HStack width={"full"}>
                <Box paddingBottom={2} width={"10rem"}>
                  <Field label="Choose an Icon" required>
                    <Box paddingTop={"2px"}></Box>
                    <Box paddingStart={4}>
                      <IconPicker
                        iconSize={7}
                        iconParam={icon}
                        setIconParam={setIcon}
                      />
                    </Box>
                  </Field>
                </Box>

                <Box width={"full"}>
                  <Field label="Name" required>
                    <Input
                      ref={ref}
                      id="name"
                      value={fixed?.Name}
                      placeholder="Please enter fixed transaction name"
                    />
                  </Field>
                </Box>
              </HStack>
              <Box width={"full"}>
                <Field label="Amount">
                  <Group attached width={"full"}>
                    <Icon boxSize={4}>
                      <LuEuro />
                    </Icon>
                    <NumberInputRoot
                      width={"full"}
                      value={"" + amount}
                      onValueChange={(e) => setAmount(e.valueAsNumber)}
                      defaultValue="0.00"
                      formatOptions={{
                        style: "decimal",
                        minimumFractionDigits: 2,
                      }}
                    >
                      <NumberInputField />
                    </NumberInputRoot>
                  </Group>
                </Field>
              </Box>
              <Box paddingTop="5px">
                <MenuRoot closeOnSelect={false}>
                  <MenuTrigger asChild>
                    <Button
                      fontWeight={"normal"}
                      variant={"outline"}
                      justifyContent={"space-between"}
                      width={"full"}
                    >
                      {selectedTT.length > 0
                        ? movementTypes.find((b) => +selectedTT === b.id)?.name
                        : "Select Transaction Type"}
                      <LuChevronDown />
                    </Button>
                  </MenuTrigger>
                  <MenuContent minW="25rem" portalled={false} width={"full"}>
                    <MenuRadioItemGroup
                      value={selectedTT}
                      onValueChange={(e) => setSelectedTT(e.value)}
                    >
                      {movementTypesSelect.map((m) => (
                        <MenuRadioItem value={"" + m.value}>
                          {m.label}
                        </MenuRadioItem>
                      ))}
                    </MenuRadioItemGroup>
                  </MenuContent>
                </MenuRoot>
              </Box>

              <Box>
                <Field label="Choose the categories">
                  <MenuRoot closeOnSelect={false}>
                    <MenuTrigger asChild>
                      <Button
                        fontWeight={"normal"}
                        variant={"outline"}
                        justifyContent={"space-between"}
                        width={"full"}
                      >
                        Select Categories
                        <LuChevronDown />
                      </Button>
                    </MenuTrigger>
                    <MenuContent minW="25rem" portalled={false} width={"full"}>
                      {selectedCategories.map((cat) => (
                        <MenuCheckboxItem
                          justifyContent={"space-between"}
                          key={cat.category.Id}
                          value={"" + cat.category.Id}
                          checked={cat.checked}
                          onCheckedChange={() =>
                            setSelectedCategories(
                              selectedCategories.map((selected) =>
                                selected.category.Id === cat.category.Id
                                  ? { ...selected, checked: !cat.checked }
                                  : selected
                              )
                            )
                          }
                        >
                          {cat.category.Name}
                          {cat.checked && <LuCheck />}
                        </MenuCheckboxItem>
                      ))}
                    </MenuContent>
                  </MenuRoot>
                </Field>
              </Box>
              <HStack>
                <Field label="Payment Day" helperText="Day of the month">
                  <NumberInputRoot
                    width={"full"}
                    value={"" + paymentDay}
                    onValueChange={(e) => setPaymentDay(e.valueAsNumber)}
                    defaultValue="1"
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Field>
                <Field label="Periodicity" helperText="In months">
                  <NumberInputRoot
                    width={"full"}
                    value={"" + periodicity}
                    onValueChange={(e) => setPeriodicity(e.valueAsNumber)}
                    defaultValue="1"
                  >
                    <NumberInputField />
                  </NumberInputRoot>
                </Field>
              </HStack>
            </Stack>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {!fixed ? (
            <Button type="submit" form="new-fixed-form">
              Save
            </Button>
          ) : (
            <Button onClick={handleUpdate}>
              <Icon>
                <LuCheck />
              </Icon>
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default NewFixedTransactionDrawer;
