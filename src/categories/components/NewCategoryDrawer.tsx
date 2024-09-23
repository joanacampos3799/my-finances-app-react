import IconPicker from "../../common/components/IconPicker";
import { useRef } from "react";
import useAddCategory from "../hooks/useAddCategory";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { movementTypes } from "../../common/constants";
import { Box, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import DrawerComponent from "../../common/components/DrawerComponent";
import RadioMenu from "../../common/components/RadioMenu";
import useForm from "../../common/hooks/useForm";
import CategoryFormObject from "../model/CategoryFormObject";

interface Props {
  isEmpty: boolean;
}
const NewCategoryDrawer = ({ isEmpty }: Props) => {
  const { userId } = useLoginData();
  const { values, resetForm, handleChange } = useForm<CategoryFormObject>({
    Name: "",
    icon: "",
    selectedTT: "-1",
  });
  const ref = useRef<HTMLInputElement>(null);
  const addCategory = useAddCategory(() => resetForm());

  return (
    <DrawerComponent
      isEmpty={isEmpty}
      placement={"end"}
      name={"Category"}
      formName={"new-category-form"}
      refElement={ref.current}
    >
      <form
        id="new-category-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current && ref.current.value) {
            addCategory({
              Name: ref.current?.value,
              Icon: values.icon,
              CategoryType: movementTypes[+values.selectedTT].id,
              userId: userId!!,
            });
          }
        }}
      >
        <Stack>
          <Box>
            <Field label="Choose an Icon">
              <IconPicker
                iconSize={8}
                iconParam={values.icon}
                setIconParam={(i) => handleChange("icon", i)}
              />
            </Field>
          </Box>

          <Box>
            <Field label="Name" required>
              <Input
                ref={ref}
                id="name"
                placeholder="Please enter Category name"
              />
            </Field>
          </Box>

          <Box paddingTop="5px">
            <Field label="Category Type">
              <RadioMenu
                hasArrow
                data={movementTypes}
                selectedId={values.selectedTT}
                setSelectedId={(val) => handleChange("selectedTT", val)}
                placeholder="a category type"
              />
            </Field>
          </Box>
        </Stack>
      </form>
    </DrawerComponent>
  );
};

export default NewCategoryDrawer;
