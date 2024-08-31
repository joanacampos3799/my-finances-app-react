import { create } from 'zustand'
import { UUID } from 'crypto'

interface UserStore {
    userAppId?: UUID | undefined
    setUserId: (userId: UUID) => void
}

const useUserStore = create<UserStore>((set) => ({
  userAppId: undefined,
  setUserId: (userId: UUID) => set((store) => ({ ...store, userAppId: userId})),
}))


export default useUserStore