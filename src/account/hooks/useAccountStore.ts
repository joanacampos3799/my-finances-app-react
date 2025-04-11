import { create } from "zustand";
import Account, { fallbackAccount } from "../Model/Account";

interface AccountStore {
  account: Account;
  isValueSet: boolean;
  setAccount: (account: Account) => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  account: fallbackAccount,
  isValueSet: false,
  setAccount: (account: Account) =>
    set((store) => ({ ...store, account: account, isValueSet: true })),
}));

export default useAccountStore;
