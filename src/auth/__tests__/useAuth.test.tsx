import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAuth, AuthContext } from "../useAuth";
import type { AuthContextType } from "../useAuth";
import type { ReactNode } from "react";

const mockAuthValue: AuthContextType = {
  user: {
    id: 1,
    email: "test@example.com",
    name: "Test User",
    is_active: true,
    avatar: { id: 1, high: "", medium: "", low: "" },
    type: "user",
    created: "2023-01-01",
    modified: "2023-01-01",
    role: "user",
  },
  loading: false,
  login: vi.fn(),
  logout: vi.fn(),
};

const MockAuthProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: AuthContextType;
}) => (
  <AuthContext.Provider value={value || mockAuthValue}>
    {children}
  </AuthContext.Provider>
);

describe("useAuth Hook", () => {
  it("should return auth context value when used within AuthProvider", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MockAuthProvider>{children}</MockAuthProvider>
      ),
    });

    expect(result.current).toEqual(mockAuthValue);
    expect(result.current.user).toEqual({
      id: 1,
      email: "test@example.com",
      name: "Test User",
      is_active: true,
      avatar: { id: 1, high: "", medium: "", low: "" },
      type: "user",
      created: "2023-01-01",
      modified: "2023-01-01",
      role: "user",
    });
    expect(result.current.loading).toBe(false);
    expect(typeof result.current.login).toBe("function");
    expect(typeof result.current.logout).toBe("function");
  });

  it("should throw error when used outside of AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth deve ser usado dentro de <AuthProvider>");
  });

  it("should throw error when context value is undefined", () => {
    expect(() => {
      renderHook(() => useAuth(), {
        wrapper: ({ children }) => (
          <AuthContext.Provider value={undefined}>
            {children}
          </AuthContext.Provider>
        ),
      });
    }).toThrow("useAuth deve ser usado dentro de <AuthProvider>");
  });

  it("should handle loading state correctly", () => {
    const loadingValue: AuthContextType = {
      ...mockAuthValue,
      loading: true,
      user: null,
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MockAuthProvider value={loadingValue}>{children}</MockAuthProvider>
      ),
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
  });

  it("should handle authenticated user state", () => {
    const authenticatedValue: AuthContextType = {
      ...mockAuthValue,
      user: {
        id: 2,
        email: "user@test.com",
        name: "John Doe",
        is_active: true,
        avatar: { id: 2, high: "", medium: "", low: "" },
        type: "user",
        created: "2023-01-01",
        modified: "2023-01-01",
        role: "user",
      },
      loading: false,
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MockAuthProvider value={authenticatedValue}>
          {children}
        </MockAuthProvider>
      ),
    });

    expect(result.current.user).toEqual({
      id: 2,
      email: "user@test.com",
      name: "John Doe",
      is_active: true,
      avatar: { id: 2, high: "", medium: "", low: "" },
      type: "user",
      created: "2023-01-01",
      modified: "2023-01-01",
      role: "user",
    });
    expect(result.current.loading).toBe(false);
  });
});
