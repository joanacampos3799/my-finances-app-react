import IconPicker from "../../common/components/IconPicker";
import { useRef, useState } from "react";
import useAddCategory from "../hooks/useAddCategory";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { movementTypes } from "../../common/constants";
import { Flex, Heading, Input, Show, Text } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import DrawerComponent from "../../common/components/DrawerComponent";
import RadioMenu from "../../common/components/RadioMenu";
import useForm from "../../common/hooks/useForm";
import CategoryFormObject from "../model/CategoryFormObject";
import NumberInput from "../../common/components/NumberInput";
import Category from "../model/Category";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import ColorPicker from "../../common/components/ColorPicker";

interface Props {
  category?: Category;
}
const NewCategoryDrawer = ({ category }: Props) => {
  const { userId } = useLoginData();
  const { values, resetForm, handleChange } = useForm<CategoryFormObject>({
    Name: category ? category.Name : "",
    icon: category ? category.Icon : "",
    budget: category ? category.Budget : undefined,
    selectedTT: category ? "" + category.CategoryType : "-1",
    color: category ? category.Color : "",
  });

  const ref = useRef<HTMLInputElement>(null);
  const addCategory = useAddCategory(() => resetForm());
  const updateCategory = useUpdateCategory(() => resetForm());
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  return (
    <DrawerComponent
      placement={"end"}
      size={"xs"}
      name={category ? category.Name : "Category"}
      formName={"new-category-form"}
      update={category !== undefined}
      refElement={ref.current}
      open={open}
      setOpen={setOpen}
    >
      <form
        id="new-category-form"
        onSubmit={(e) => {
          e.preventDefault();

          if (values.icon === "" || values.color === "") {
            setError("Both icon and color are required");
            return;
          }

          // Clear error if validation passes
          setError("");
          if (category) {
            updateCategory({
              Id: category.Id,
              Name: values.Name,
              Icon: values.icon,
              CategoryType: +values.selectedTT,
              userId: userId!!,
              Budget: values.budget,
              Color: values.color,
              Transactions: category.Transactions,
            });
          } else {
            addCategory({
              Name: values.Name,
              Icon: values.icon,
              Budget: values.budget,
              CategoryType: movementTypes[+values.selectedTT].id,
              userId: userId!!,
              Color: values.color,
              Transactions: [],
            });
          }
          setOpen(false);
        }}
      >
        <Flex direction="column">
          <Flex direction={"column"}>
            <Heading size={"sm"}>Choose an Icon and Color</Heading>
            <Flex direction={"row"} pt={2} gap={3}>
              <IconPicker
                iconSize={8}
                iconParam={values.icon}
                setIconParam={(i) => handleChange("icon", i)}
              />
              <ColorPicker
                color={values.color}
                setColor={(c) => handleChange("color", c)}
              />
            </Flex>
            {/* Error message */}
            {error && (
              <Text color="red.500" mt={2}>
                {error}
              </Text>
            )}
          </Flex>

          <Field label="Name" required mt={6}>
            <Input
              ref={ref}
              id="Name"
              value={values.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
              placeholder="Please enter Category name"
            />
          </Field>

          <Field label="Category Type" mt={4} required>
            <RadioMenu
              hasArrow
              minW="17rem"
              data={movementTypes}
              selectedId={values.selectedTT}
              setSelectedId={(val) => handleChange("selectedTT", val)}
              placeholder="a category type"
            />
          </Field>
          <Show when={values.selectedTT === "0"}>
            <Field label="Budget" mt={4}>
              <NumberInput
                number={values.budget ?? 0}
                setNumber={(val) => handleChange("budget", val)}
                isCurrency
              />
            </Field>
          </Show>
        </Flex>
      </form>
    </DrawerComponent>
  );
};

export default NewCategoryDrawer;
