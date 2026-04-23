import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { createContext, useContext, useMemo } from "react";
import type React from "react";
import type { UserRole } from "../types";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  principal: Principal | undefined;
  role: UserRole;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function deriveRole(_principal: Principal | undefined): UserRole {
  return "admin";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    identity,
    isAuthenticated,
    isInitializing,
    login: iiLogin,
    clear,
  } = useInternetIdentity();

  const isLoading = isInitializing;
  const principal = identity?.getPrincipal();
  const role = useMemo(() => deriveRole(principal), [principal]);

  const login = async () => {
    iiLogin();
  };

  const logout = () => {
    clear();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, principal, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
