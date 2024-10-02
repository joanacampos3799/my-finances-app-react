import { Flex } from "@chakra-ui/react";
import BankList from "../../models/BankList";
import BanksList from "./BanksList";
import BanksKPIs from "./BanksKPIs";
interface Props {
  banks: BankList[];
}
const BanksTab = ({ banks }: Props) => {
  return (
    <Flex direction={"column"} gap={2}>
      <BanksKPIs banks={banks} />
      <BanksList banks={banks} />
    </Flex>
  );
};

export default BanksTab;
