import { Box, Group, Icon } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { LuEuro } from "react-icons/lu";
import {
  NumberInputField,
  NumberInputRoot,
} from "../../components/ui/number-input";

interface Props {
  number?: string;
  setNumber: (val: string) => void;
  isCurrency: boolean;
  label?: string;
  helperText?: string;
}
const NumberInput = ({
  number,
  setNumber,
  isCurrency,
  label,
  helperText,
}: Props) => {
  return (
    <Box width={"full"}>
      <Field label={label} helperText={helperText}>
        <Group attached width={"full"}>
          {isCurrency && (
            <Icon boxSize={4}>
              <LuEuro />
            </Icon>
          )}
          <NumberInputRoot
            width={"full"}
            value={number}
            min={0}
            locale="pt-PT"
            onValueChange={(e) => {
              if (e.value === "" || e.value === "-") {
                setNumber(e.value); // Allow empty or "-" while typing
              } else {
                setNumber(e.value); // Store as a string
              }
            }}
            formatOptions={{
              style: isCurrency ? "decimal" : undefined,
              minimumFractionDigits: isCurrency ? 2 : undefined,
            }}
          >
            <NumberInputField />
          </NumberInputRoot>
        </Group>
      </Field>
    </Box>
  );
};

export default NumberInput;
