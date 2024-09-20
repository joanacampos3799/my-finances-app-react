import { FormatNumber, GridItem } from "@chakra-ui/react";

import NewBankModal from "./NewBankModal";
import BankCard from "./BankCard";
import { useState } from "react";
import { useDeleteBank } from "../../hooks/useDeleteBank";
import Grid from "../../../common/components/Grid";
import BankList from "../../models/BankList";
import DeleteCard from "../../../common/components/DeleteCard";

interface Props {
  banks: BankList[];
}
const BanksGrid = ({ banks }: Props) => {
  const [toDelete, setToDelete] = useState<BankList[]>([]);
  const [deleting, setDeleting] = useState(false);
  const deleteBank = useDeleteBank();
  const handleDelete = () => {
    toDelete.forEach((element) => {
      element.deleted = true;
      deleteBank(element);
    });
    setToDelete([]);
    setDeleting(false);
  };
  return (
    <Grid
      action={"Delete"}
      name={"Banks"}
      key={"bank-key"}
      handleDelete={handleDelete}
      addComponent={<NewBankModal key={"last"} isEmpty={false} />}
      deleting={deleting}
      setDeleting={setDeleting}
    >
      {banks.map((bank) => (
        <GridItem key={bank.Id}>
          {!deleting ? (
            <BankCard bank={bank} />
          ) : (
            <DeleteCard
              data={bank}
              toDelete={toDelete}
              setToDelete={setToDelete}
              icon={"FaBuildingColumns"}
            >
              <FormatNumber
                value={bank.Balance ?? 0}
                style="currency"
                currency="EUR"
              />
            </DeleteCard>
          )}
        </GridItem>
      ))}
    </Grid>
  );
};

export default BanksGrid;
