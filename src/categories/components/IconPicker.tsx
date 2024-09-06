import {
  Button,
  ButtonGroup,
  Center,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useIconPack } from "../hooks/useIconPack";
import { FaMagnifyingGlass, FaPen } from "react-icons/fa6";

interface Props {
  iconParam: string;
  setIconParam: (icon: string) => void;
}
const IconPicker = ({ iconParam, setIconParam }: Props) => {
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1);
  const size = 100;
  const iconPack = useIconPack();

  if (!iconPack) {
    return <Skeleton variant="rectangular" width={210} height={40} />;
  }

  let iconsFiltered = iconPack.filter((icon) => {
    return icon.name
      .toLowerCase()
      .substring(2)
      .includes(searchText.toLowerCase());
  });
  const maxPages = Math.ceil(iconsFiltered?.length!! / size);
  iconsFiltered = iconsFiltered.slice((page - 1) * size, page * size);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Center>
            {iconParam ? (
              <Icon
                as={iconsFiltered.find((icon) => icon.name === iconParam)?.icon}
                boxSize={8}
              />
            ) : (
              <Icon as={FaPen} boxSize={8} />
            )}
          </Center>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <InputGroup>
                <Input
                  placeholder="Search"
                  size="small"
                  variant="outlined"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <InputLeftElement>
                  <FaMagnifyingGlass />
                </InputLeftElement>
              </InputGroup>
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <SimpleGrid columns={10} gap={2}>
                {iconsFiltered.map((icon) => (
                  <Icon
                    key={icon.name}
                    as={icon.icon}
                    onClick={() => setIconParam(icon.name)}
                  />
                ))}
              </SimpleGrid>
            </PopoverBody>
            <PopoverFooter>
              <Center>
                <ButtonGroup>
                  {page !== 1 && (
                    <Button onClick={() => setPage(page - 1)}>Previous</Button>
                  )}
                  <Center>
                    {page} / {maxPages}
                  </Center>{" "}
                  {page < maxPages && (
                    <Button onClick={() => setPage(page + 1)}>Next</Button>
                  )}
                </ButtonGroup>
              </Center>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};
export default IconPicker;
