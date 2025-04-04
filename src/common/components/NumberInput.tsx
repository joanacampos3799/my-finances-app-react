import { Box, Group, Icon, Input } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { LuEuro } from "react-icons/lu";

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
          <Input
            name={"" + number}
            type="text"
            value={number ?? "0"}
            onChange={(e) => {
              if (e.target.value === "" || e.target.value === "-") {
                setNumber(e.target.value); // Allow empty or "-" while typing
              } else {
                setNumber(e.target.value); // Store as a string
              }
            }}
            placeholder="Enter a number"
          />
        </Group>
      </Field>
    </Box>
  );
};

export default NumberInput;
