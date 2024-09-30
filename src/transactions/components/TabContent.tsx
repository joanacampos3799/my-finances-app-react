import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../components/ui/accordion";
import Transaction from "../model/Transaction";
import MyTransactionTable from "./MyTransactionTable";
import { format } from "date-fns/format";
interface Props {
  transactions: Transaction[];
}
const TabContent = ({ transactions }: Props) => {
  const months = transactions.map((transaction) => {
    const splitDate = transaction.Date.split("/");
    const date = new Date(+splitDate[2], +splitDate[1] - 1, +splitDate[0]);
    return {
      id: date.getMonth(),
      value: format(date, "LLLL"),
    };
  });

  const monthlyTransactions = months.map((month) => {
    return {
      name: month.value,
      transactions: transactions.filter((t) => {
        const split = t.Date.split("/");
        return (
          new Date(+split[2], +split[1] - 1, +split[0]).getMonth() === month.id
        );
      }),
    };
  });

  return (
    <AccordionRoot collapsible defaultValue={["info"]} variant={"plain"}>
      {monthlyTransactions.map((item) => (
        <AccordionItem key={item.name} value={item.name}>
          <AccordionItemTrigger>{item.name}</AccordionItemTrigger>
          <AccordionItemContent>
            <MyTransactionTable data={item.transactions} />
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};

export default TabContent;
