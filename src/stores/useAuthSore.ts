import { create } from "zustand"
import User from "../entities/User"

interface UserStore {
    user: User | undefined
    setUser: (user: User) => void
    clearUser: () => void
}

const useAuthStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User) => set((store) => ({ ...store, user: user})),
  clearUser: () => set((store) => ({...store, user: undefined})),
}))

  
export default useAuthStore