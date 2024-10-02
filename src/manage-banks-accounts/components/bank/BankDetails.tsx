import { map } from "lodash";
import DialogComponent from "../../../common/components/DialogComponent";
import DonutChart from "../../../common/components/DonutChart";
import AccountList from "../../models/AccountList";
import BankList from "../../models/BankList";
import AccountsTable from "../account/AccountTable";
import { accountTypes } from "../../../common/constants";
import { FormatNumber } from "@chakra-ui/react";
import BarChartComponent from "../../../common/components/BarChartComponent";
import useInsights from "../../../common/hooks/useInsights";

interface Props {
  bank: BankList;
}
const BankDetails = ({ bank }: Props) => {
  const { getTransactionsTotalAmount } = useInsights();
  const calculateAccountTypeBalances = (accounts: AccountList[]) => {
    const typeBalances: Record<string, number> = {};

    accounts.forEach((account) => {
      account.types.forEach((type) => {
        // Initialize balance if not present
        const typeName = accountTypes[type].name;
        if (!typeBalances[typeName]) {
          typeBalances[typeName] = 0;
        }
        typeBalances[typeName] += account.Balance;
      });
    });

    return typeBalances;
  };

  const accountTypeBalances = calculateAccountTypeBalances(bank.Accounts);
  const donutData = Object.entries(accountTypeBalances).map(
    ([type, balance]) => ({
      label: type,
      value: balance,
    })
  );

  const chartData = bank.Accounts.map((account) => {
    const totalSpent = getTransactionsTotalAmount(
      account.Transactions,
      undefined,
      0
    );

    const totalIncome = getTransactionsTotalAmount(
      account.Transactions,
      undefined,
      1
    );

    return {
      account: account.Name,
      totalSpent: totalSpent,
      totalIncome: totalIncome,
    };
  });

  const chartDataDebts = () => {
    const assets = bank.Accounts.reduce((total, acc) => total + acc.Balance, 0);
    const debts = bank.Accounts.reduce(
      (total, acc) =>
        total + acc.Debts.reduce((tot, debt) => tot + debt.Balance, 0),
      0
    );
    return {
      bank: bank.Name,
      assets: assets,
      debts: debts,
    };
  };
  return (
    <DialogComponent size="xl" title={bank.Name + "'s Accounts"}>
      <BarChartComponent
        chartData={chartData}
        xAxisDataKey="account"
        data={[
          {
            dataKey: "totalSpent",
            label: "Total Spent",
          },
          { dataKey: "totalIncome", label: "Total Income" },
        ]}
      />
      <BarChartComponent
        chartData={chartData}
        xAxisDataKey="bank"
        data={[
          {
            dataKey: "assets",
            label: "Total Assets",
          },
          { dataKey: "debts", label: "Total debts" },
        ]}
      />
      <DonutChart data={donutData} caption={"Accounts Distribution"} />
      <AccountsTable accounts={bank.Accounts} />
    </DialogComponent>
  );
};

export default BankDetails;
