import { createColumnHelper } from "@tanstack/react-table";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../../components/ui/accordion";
import Transaction from "../Transaction";
interface Props {
  transactions: Transaction[];
}
const TabContent = ({ transactions }: Props) => {
  const formatter = new Intl.DateTimeFormat("default", { month: "long" });
  const months = transactions.map((transaction) => {
    return {
      id: transaction.Date.getMonth(),
      value: formatter.format(transaction.Date.getMonth()),
    };
  });

  const monthlyTransactions = months.map((month) => {
    return {
      name: month.value,
      transactions: transactions.filter((t) => t.Date.getMonth() === month.id),
    };
  });
  return (
    <AccordionRoot collapsible defaultValue={["info"]}>
      {monthlyTransactions.map((item) => (
        <AccordionItem key={item.name} value={item.name}>
          <AccordionItemTrigger>{item.name}</AccordionItemTrigger>
          <AccordionItemContent></AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};

export default TabContent;
