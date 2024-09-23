import { useRef } from "react";
import { HStack, Input } from "@chakra-ui/react";
import IconPicker from "../../common/components/IconPicker";
import RadioMenu from "../../common/components/RadioMenu";
import { movementTypes } from "../../common/constants";
import { DataListItem } from "../../components/ui/data-list";
import CategoryFormObject from "../model/CategoryFormObject";

interface Props {
  handleChange: (name: string, value: string) => void;
  values: CategoryFormObject;
}

const CategoryUpdateForm = ({ handleChange, values }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <DataListItem label="Category Name and Icon" value="">
        <HStack>
          <IconPicker
            iconParam={values.icon}
            iconSize={4}
            setIconParam={(i) => handleChange("icon", i)}
          />
          <Input
            ref={ref}
            value={values.Name}
            onChange={(e) => e.target.value}
          />
        </HStack>
      </DataListItem>

      <DataListItem label="Category Type" value="">
        <RadioMenu
          hasArrow
          data={movementTypes}
          selectedId={values.selectedTT}
          setSelectedId={(val) => handleChange("selectedTT", val)}
        />
      </DataListItem>
    </>
  );
};

export default CategoryUpdateForm;
