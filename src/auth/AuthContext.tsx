// src/auth/AuthContext.tsx
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { api } from "../services/api";
import { storage } from "../utils/storage";
import type { User, LoginResponse } from "../types/User";
import type { AxiosError } from "axios";
import { AuthContext } from "./useAuth";
import type { AuthContextType } from "./useAuth";

function getAxiosMessage(error: unknown): string {
  const axiosErr = error as AxiosError<{ message?: string }>;
  const apiMsg = axiosErr?.response?.data?.message;
  if (apiMsg && typeof apiMsg === "string") return apiMsg;
  if (axiosErr?.message) return axiosErr.message;
  return "Erro de autenticação.";
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restaura sessão ao carregar o app
  useEffect(() => {
    const token = storage.getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get<User>("/auth/profile/") // ✅ API direta
      .then((res) => setUser(res.data))
      .catch(() => {
        storage.clear();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login/", {
        email,
        password,
      });

      // salva tokens recebidos
      storage.saveTokens({
        access: data.tokens.access,
        refresh: data.tokens.refresh,
      });

      // user já vem na resposta do login
      setUser(data.user);
    } catch (error: unknown) {
      throw new Error(getAxiosMessage(error));
    }
  };

  const logout = () => {
    storage.clear();
    setUser(null);
    window.location.assign("/login");
  };

  const value: AuthContextType = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
