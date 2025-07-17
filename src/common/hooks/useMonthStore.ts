import { format } from "date-fns";
import { create } from "zustand";

interface MonthStore {
  month: string;
  setMonth: (month: string) => void;
  clearMonth: () => void;
}

const useMonthStore = create<MonthStore>((set) => ({
  month: format(new Date(), "MMMM yyyy"),
  setMonth: (month: string) => set((store) => ({ ...store, month: month })),
  clearMonth: () =>
    set((store) => ({ ...store, month: format(new Date(), "MMMM yyyy") })),
}));

export default useMonthStore;
