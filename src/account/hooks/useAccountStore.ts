import { create } from "zustand";
import Account, { fallbackAccount } from "../Model/Account";

interface AccountStore {
  account: Account;
  setAccount: (account: Account) => void;
  clearAccount: () => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  account: fallbackAccount,
  setAccount: (account: Account) =>
    set((store) => ({ ...store, account: account })),
  clearAccount: () => set((store) => ({ ...store, account: fallbackAccount })),
}));

export default useAccountStore;
