import {
  Divider,
  Icon,
  Input,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useIconPack } from "../hooks/useIconPack";
import { FaMagnifyingGlass, FaPen } from "react-icons/fa6";

export type IconPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const IconPicker = ({ value, onChange }: IconPickerProps) => {
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState<(EventTarget & SVGElement) | null>(
    null
  );
  const iconPack = useIconPack();

  if (!iconPack) {
    return <Skeleton variant="rectangular" width={210} height={40} />;
  }

  const iconsFiltered = iconPack.filter((icon) => {
    return icon.name.includes(searchText.toLowerCase());
  });

  return (
    <>
      <Popover isOpen={!!anchorEl} onClose={() => setAnchorEl(null)}>
        <PopoverTrigger>
          {value ? (
            <Icon
              as={iconsFiltered.find((icon) => icon.name === value)?.icon}
              boxSize={8}
            />
          ) : (
            <Icon as={FaPen} boxSize={8} />
          )}
        </PopoverTrigger>

        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Input
              w="100%"
              placeholder="Search"
              size="small"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <InputLeftElement>
              <FaMagnifyingGlass />
            </InputLeftElement>
            <Divider />
            {iconsFiltered.map((icon) => (
              <Icon
                key={icon.name}
                as={icon.icon}
                onClick={() => onChange?.(icon.name)}
              />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
export default IconPicker;
