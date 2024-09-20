import { Card, Editable, HStack, Icon } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useIconPack } from "../hooks/useIconPack";

interface Props<T> {
  data: T;
  editable?: boolean;
  icon: string;
  editFn?: () => void;
  name?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
}

interface Entity {
  Id: number;
  Name: string;
}

const ListCard = <T extends Entity>({
  data,
  icon,
  editable,
  editFn,
  name,
  setName,
  children,
}: PropsWithChildren<Props<T>>) => {
  const iconPack = useIconPack();

  return (
    <Card.Root variant={"elevated"} width={"full"} height={"8rem"}>
      <Card.Header>
        <HStack justifyContent="space-between">
          <HStack justifyContent="center">
            <Icon
              boxSize={4}
              as={iconPack?.find((i) => i.name === icon)?.icon}
            ></Icon>
            {editable && setName && editFn ? (
              <Editable.Root
                value={name}
                onValueChange={(e) => setName(e.value)}
                onBlur={editFn}
                placeholder={data.Name}
              >
                <Editable.Preview />
                <Editable.Input />
              </Editable.Root>
            ) : (
              data.Name
            )}
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack width={"full"} justifyContent="space-between">
          {children}
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default ListCard;
