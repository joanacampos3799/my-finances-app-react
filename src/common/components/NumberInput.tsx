import { Box, Group, Icon } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { LuEuro } from "react-icons/lu";
import {
  NumberInputField,
  NumberInputRoot,
} from "../../components/ui/number-input";

interface Props {
  number?: number;
  setNumber: (val: number) => void;
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
            value={"" + number}
            min={0}
            locale="pt-PT"
            onValueChange={(e) =>
              setNumber(e.value === "" ? 0 : e.valueAsNumber)
            }
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
