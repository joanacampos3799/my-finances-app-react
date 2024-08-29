import { create } from 'zustand'
import User from '../entities/User'
import { UUID } from 'crypto'

interface UserStore {
    userId?: UUID
    setUserId: (userId: UUID) => void
}

export const useUserStore = create<UserStore>((set) => ({
  userId: crypto.randomUUID(),
  setUserId: (userId: UUID) => set((store) => ({ ...store, userId})),
}))