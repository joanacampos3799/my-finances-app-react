import { useRef, useState } from "react";
import { useIconPack } from "../hooks/useIconPack";
import { FaCheck, FaMagnifyingGlass, FaPen } from "react-icons/fa6";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  HStack,
  Icon,
  IconButton,
  Input,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { InputGroup } from "../../components/ui/input-group";
import { Button } from "../../components/ui/button";
import {
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination";

interface Props {
  iconParam: string;
  iconSize: number;
  setIconParam: (icon: string) => void;
}
const IconPicker = ({ iconSize, iconParam, setIconParam }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  let size = 100;
  const iconPack = useIconPack();
  const ref = useRef<HTMLInputElement>(null);
  if (!iconPack) {
    return <Skeleton variant="pulse" width={210} height={40} />;
  }

  let iconsFiltered = iconPack.filter((icon) => {
    return icon.name
      .toLowerCase()
      .substring(2)
      .includes(searchText.toLowerCase());
  });
  const itemCount = iconsFiltered.length;
  if (itemCount < 100) size = itemCount;
  iconsFiltered = iconsFiltered.slice((page - 1) * size, page * size);
  return (
    <HStack>
      <PopoverRoot open={open} initialFocusEl={() => ref.current}>
        <PopoverTrigger asChild onClick={() => setOpen(true)}>
          <Button variant={"plain"} size={"xs"}>
            {iconParam ? (
              <Icon
                as={iconPack.find((icon) => icon.name === iconParam)?.icon}
                boxSize={iconSize}
              />
            ) : (
              <Icon as={FaPen} boxSize={iconSize} />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent portalled={false}>
          <PopoverArrow />
          <PopoverHeader>
            <HStack>
              <InputGroup width="full" startElement={<FaMagnifyingGlass />}>
                <Input
                  ref={ref}
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </InputGroup>
              <Button
                variant={"plain"}
                size="xs"
                onClick={() => setOpen(false)}
              >
                <FaCheck />
              </Button>
            </HStack>
          </PopoverHeader>

          <PopoverBody>
            <SimpleGrid columns={10} gap={2}>
              {iconsFiltered.map((icon) => (
                <IconButton
                  boxSize={4}
                  variant="ghost"
                  key={icon.name}
                  as={icon.icon}
                  onClick={() => setIconParam(icon.name)}
                />
              ))}
            </SimpleGrid>
          </PopoverBody>
          <PopoverFooter justifyContent="center">
            <PaginationRoot
              count={itemCount}
              pageSize={size}
              defaultPage={1}
              page={page}
              siblingCount={1}
              size="xs"
              onPageChange={(e) => setPage(e.page)}
            >
              <HStack gap="4">
                <PaginationPrevTrigger />
                <PaginationPageText format="long" flex="1" />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          </PopoverFooter>
        </PopoverContent>
      </PopoverRoot>
    </HStack>
  );
};
export default IconPicker;