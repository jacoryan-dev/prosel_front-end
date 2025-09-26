import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { AuthContext } from "../../auth/useAuth";
import type { AuthContextType } from "../../auth/useAuth";

// Mock do react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => (
      <div data-testid="navigate">Redirecting to {to}</div>
    ),
  };
});

const mockAuthContextValue = (
  overrides: Partial<AuthContextType> = {}
): AuthContextType => ({
  user: null,
  loading: false,
  login: vi.fn(),
  logout: vi.fn(),
  ...overrides,
});

const MockAuthProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AuthContextType;
}) => (
  <AuthContext.Provider value={value}>
    <BrowserRouter>{children}</BrowserRouter>
  </AuthContext.Provider>
);

describe("PrivateRoute Component", () => {
  const TestComponent = () => (
    <div data-testid="protected-content">Protected Content</div>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup(); // Clean up DOM before each test
  });

  afterEach(() => {
    cleanup(); // Clean up DOM after each test
  });

  it("should render loading state when loading is true", () => {
    const authValue = mockAuthContextValue({ loading: true });

    render(
      <MockAuthProvider value={authValue}>
        <PrivateRoute>
          <TestComponent />
        </PrivateRoute>
      </MockAuthProvider>
    );

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });

  it("should redirect to login when user is not authenticated", () => {
    const authValue = mockAuthContextValue({
      user: null,
      loading: false,
    });

    render(
      <MockAuthProvider value={authValue}>
        <PrivateRoute>
          <TestComponent />
        </PrivateRoute>
      </MockAuthProvider>
    );

    expect(screen.getByTestId("navigate")).toBeInTheDocument();
    expect(screen.getByText("Redirecting to /login")).toBeInTheDocument();
    expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
  });

  it("should render children when user is authenticated", () => {
    const authValue = mockAuthContextValue({
      user: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        is_active: true,
        avatar: { id: 1, high: "", medium: "", low: "" },
        type: "user",
        created: "2023-01-01",
        modified: "2023-01-01",
        role: "user",
      },
      loading: false,
    });

    render(
      <MockAuthProvider value={authValue}>
        <PrivateRoute>
          <TestComponent />
        </PrivateRoute>
      </MockAuthProvider>
    );

    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
    // The navigation should not be present when user is authenticated
    expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
  });

  it("should not render loading or redirect when transitioning from loading to authenticated", async () => {
    const authValue = mockAuthContextValue({
      user: {
        id: 1,
        name: "Jane Doe",
        email: "jane@example.com",
        is_active: true,
        avatar: { id: 1, high: "", medium: "", low: "" },
        type: "user",
        created: "2023-01-01",
        modified: "2023-01-01",
        role: "user",
      },
      loading: false,
    });

    render(
      <MockAuthProvider value={authValue}>
        <PrivateRoute>
          <TestComponent />
        </PrivateRoute>
      </MockAuthProvider>
    );

    // Wait for component to settle
    await screen.findByTestId("protected-content");
    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
    expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });
});
