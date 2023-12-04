import { StateCreator } from "zustand";

export interface AuthSlice {
  userInfo: undefined | any;
  setUserInfo: (userInfo: any) => void;
  logOut: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  userInfo: undefined,
  setUserInfo: (userInfo: any) => set({ userInfo }),
  logOut: () => {
    set({ userInfo: undefined });
  },
});
