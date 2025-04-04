import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../../components/ui/accordion";
import Transaction from "../model/Transaction";
import TransactionTable from "./TransactionTable";
import { format } from "date-fns/format";
interface Props {
  transactions: Transaction[];
}
const TabContent = ({ transactions }: Props) => {
  const months = Object.values(
    transactions.reduce(
      (acc, transaction) => {
        const date = new Date(
          transaction.Date.year,
          transaction.Date.month - 1,
          transaction.Date.day
        );
        const monthId = date.getMonth();
        const monthName = format(date, "LLLL");

        acc[monthId] = { id: monthId, value: monthName };
        return acc;
      },
      {} as Record<number, { id: number; value: string }>
    )
  );

  const monthlyTransactions = months.map((month) => {
    return {
      name: month.value,
      transactions: transactions.filter((t) => {
        return (
          new Date(t.Date.year, t.Date.month - 1, t.Date.day).getMonth() ===
          month.id
        );
      }),
    };
  });

  return (
    <AccordionRoot
      collapsible
      defaultValue={[months[months.length - 1].value]}
      variant={"plain"}
    >
      {monthlyTransactions.map((item) => (
        <AccordionItem key={item.name} value={item.name}>
          <AccordionItemTrigger>{item.name}</AccordionItemTrigger>
          <AccordionItemContent>
            <TransactionTable data={item.transactions} showFooter />
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};

export default TabContent;
