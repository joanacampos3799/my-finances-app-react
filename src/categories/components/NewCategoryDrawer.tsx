import IconPicker from "../../common/components/IconPicker";
import { useRef, useState } from "react";
import useAddCategory from "../hooks/useAddCategory";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { movementTypes } from "../../common/constants";
import { Box, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import DrawerComponent from "../../common/components/DrawerComponent";
import RadioMenu from "../../common/components/RadioMenu";

interface Props {
  isEmpty: boolean;
}
const NewCategoryDrawer = ({ isEmpty }: Props) => {
  const [icon, setIcon] = useState("");
  const [selectedTT, setSelectedTT] = useState<string>("-1");
  const { userId } = useLoginData();
  const ref = useRef<HTMLInputElement>(null);
  const addCategory = useAddCategory(() => {
    setIcon("");
    if (ref.current) ref.current.value = "";
    setSelectedTT("-1");
  });

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
              Icon: icon,
              CategoryType: movementTypes[+selectedTT].id,
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
                iconParam={icon}
                setIconParam={setIcon}
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
                data={movementTypes}
                selectedId={selectedTT}
                setSelectedId={setSelectedTT}
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
