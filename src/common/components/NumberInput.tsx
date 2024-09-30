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
            onValueChange={(e) => setNumber(e.valueAsNumber)}
            defaultValue="0.00"
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
