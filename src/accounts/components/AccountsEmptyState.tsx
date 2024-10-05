import { EmptyState } from "../../components/ui/empty-state";
import { LuWallet } from "react-icons/lu";
import NewAccountDrawer from "./NewAccountDrawer";

interface Props {
  bgColor: string;
}
const AccountsEmptyState = ({ bgColor }: Props) => {
  return (
    <EmptyState
      bgColor={bgColor}
      icon={<LuWallet />}
      p="10%"
      title="Start adding your accounts"
      description="Add one of your accounts to get started"
    >
      <NewAccountDrawer />
    </EmptyState>
  );
};

export default AccountsEmptyState;
