import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { Button } from "../../components/ui/button";
import { LuCheck } from "react-icons/lu";

interface Props {
  action: string;
  name: string;
  handleDelete: () => void;
  deleting: boolean;
  setDeleting: Dispatch<SetStateAction<boolean>>;
}
const Grid = ({
  action,
  name,
  handleDelete,
  deleting,
  setDeleting,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 5 }} gap={4} padding="5px">
      <GridItem key={-1} colSpan={{ sm: 0, md: 1, lg: 3, xl: 4 }} />
      <GridItem key={0}>
        {deleting ? (
          <Button bgColor={"teal.500"} float={"right"} onClick={handleDelete}>
            {" "}
            <LuCheck />
          </Button>
        ) : (
          <Button
            bgColor={"red.500"}
            float={"right"}
            onClick={() => setDeleting(true)}
          >
            {" "}
            {action} {name}
          </Button>
        )}
      </GridItem>
      {children}
    </SimpleGrid>
  );
};

export default Grid;
