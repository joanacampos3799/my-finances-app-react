import { create } from "zustand";

interface PeriodStore {
  period: string;
  setPeriod: (period: string) => void;
  clearPeriod: () => void;
}

const usePeriodStore = create<PeriodStore>((set) => ({
  period: "Monthly",
  setPeriod: (period: string) => set((store) => ({ ...store, period: period })),
  clearPeriod: () => set((store) => ({ ...store, period: "Monthly" })),
}));

export default usePeriodStore;
