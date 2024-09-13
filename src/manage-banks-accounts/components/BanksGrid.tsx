import { GridItem, Show, SimpleGrid } from "@chakra-ui/react";
import { Bank } from "../Bank";
import NewBankModal from "./NewBankModal";
import BankCard from "./BankCard";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import DeleteBankCard from "./DeleteBankCard";
import { useDeleteBank } from "../hooks/useDeleteBank";

interface Props {
  banks: Bank[];
}
const BanksGrid = ({ banks }: Props) => {
  const [toDelete, setToDelete] = useState<Bank[]>([]);
  const [deleting, setDeleting] = useState(false);
  const deleteBank = useDeleteBank();
  const handleDelete = () => {
    toDelete.forEach((element) => {
      element.deleted = true;
      deleteBank(element);
    });

    setDeleting(false);
  };
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4, xl: 5 }} gap={6} padding="10px">
      <GridItem colSpan={{ sm: 0, md: 1, lg: 3, xl: 4 }}></GridItem>
      <GridItem>
        {deleting ? (
          <Button float={"right"} onClick={handleDelete}>
            {" "}
            <FaCheck />
          </Button>
        ) : (
          <Button float={"right"} onClick={() => setDeleting(true)}>
            {" "}
            Delete Banks
          </Button>
        )}
      </GridItem>

      {banks.map((bank) =>
        !deleting ? (
          <BankCard key={bank.Id!!} bank={bank} />
        ) : (
          <DeleteBankCard
            key={bank.Id!!}
            bank={bank}
            toDelete={toDelete}
            setToDelete={setToDelete}
          />
        )
      )}
      <Show when={!deleting}>
        <NewBankModal isEmpty={false} />
      </Show>
    </SimpleGrid>
  );
};

export default BanksGrid;
