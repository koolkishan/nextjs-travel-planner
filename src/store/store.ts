import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices";

type StoreState = AuthSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
}));
