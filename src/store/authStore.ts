import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  [key: string]: unknown; // Allows dynamic fields
  setAuthData: (data: Partial<unknown>) => void;
  clearAuthData: () => void;
  isAuthenticated: () => boolean;
}

const initialState = {};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setAuthData: (data) =>
        set((state) => {
          return {
            ...state,
            ...data,
          };
        }),
      clearAuthData: () => {
        // Clear localStorage tokens when clearing auth data
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("loginData"); // Clear zustand persisted store
        set(initialState);
      },
      isAuthenticated: () => !!get().accessToken,
    }),
    {
      name: "loginData",
    }
  )
);
