import { Button, GridItem, SimpleGrid } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useEffect, useState } from "react";
import chakraColors from "../chakraColors";
import { Slider } from "../../components/ui/slider";

interface Props {
  color: string;
  setColor: (color: string) => void;
}
const ColorPicker = ({ color, setColor }: Props) => {
  type BaseColor = keyof typeof chakraColors;
  const colorVariants = Object.keys(chakraColors.gray);
  const fallbackColor = chakraColors.teal[500];
  const initialBaseColor = color
    ? (Object.keys(chakraColors).find((baseColor) =>
        Object.values(chakraColors[baseColor as BaseColor]).includes(color)
      ) as BaseColor | undefined)
    : undefined;

  const initialVariantIndex = initialBaseColor
    ? Object.values(chakraColors[initialBaseColor]).indexOf(color!)
    : 5;

  const [selectedBaseColor, setSelectedBaseColor] = useState<BaseColor>(
    initialBaseColor || "teal"
  );
  const [selectedVariantIndex, setSelectedVariantIndex] =
    useState<number>(initialVariantIndex);
  const selectedVariant = Number(colorVariants[selectedVariantIndex]); // Get variant number based on index

  const handleBaseColorSelect = (color: BaseColor) => {
    setSelectedBaseColor(color);
    setColor(chakraColors[color][500]);
    setSelectedVariantIndex(5); // Reset to default variant
  };

  const handleVariantSelect = (index: number) => {
    setSelectedVariantIndex(index);
    setColor(chakraColors[selectedBaseColor!!][+colorVariants[index]]);
  };

  return (
    <PopoverRoot>
      <PopoverTrigger>
        <Button
          size="sm"
          bgColor={color || fallbackColor}
          padding={0}
          borderRadius={"md"}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <SimpleGrid columns={5} gap={2}>
            {Object.keys(chakraColors).map((c) => (
              <Button
                key={c + "-color"}
                padding={0}
                w="40px"
                h={"40px"}
                border={selectedBaseColor === c ? "2px solid black" : "none"}
                bgColor={
                  chakraColors[c as BaseColor][
                    selectedBaseColor === c ? selectedVariant : 500
                  ]
                }
                borderRadius="md"
                cursor="pointer"
                onClick={() => {
                  handleBaseColorSelect(c as BaseColor);
                }}
              />
            ))}
            <GridItem colSpan={5} pt={5}>
              <Slider
                min={0}
                max={colorVariants.length - 1}
                step={1}
                value={[selectedVariantIndex]}
                onValueChange={(e) => handleVariantSelect(e.value[0])}
              />
            </GridItem>
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default ColorPicker;
