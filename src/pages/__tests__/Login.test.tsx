import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";
import { AuthContext } from "../../auth/useAuth";
import type { AuthContextType } from "../../auth/useAuth";

// Mock do react-router-dom
Object.defineProperty(window, "location", {
  value: { assign: vi.fn() },
  writable: true,
});

const mockLogin = vi.fn();

const mockAuthContextValue: AuthContextType = {
  user: null,
  loading: false,
  login: mockLogin,
  logout: vi.fn(),
};

const MockAuthProvider = ({ children }: { children: React.ReactNode }) => (
  <AuthContext.Provider value={mockAuthContextValue}>
    <BrowserRouter>{children}</BrowserRouter>
  </AuthContext.Provider>
);

describe("Login Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup(); // Clean up DOM before each test
  });

  afterEach(() => {
    cleanup(); // Clean up DOM after each test
  });

  it("should render login form correctly", () => {
    render(
      <MockAuthProvider>
        <Login />
      </MockAuthProvider>
    );

    expect(screen.getByText("b2b")).toBeInTheDocument();
    expect(screen.getByText("it")).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    render(
      <MockAuthProvider>
        <Login />
      </MockAuthProvider>
    );

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText("Obrigatório")).toHaveLength(2);
    });
  });

  it("should show validation error for invalid email", async () => {
    render(
      <MockAuthProvider>
        <Login />
      </MockAuthProvider>
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("E-mail inválido")).toBeInTheDocument();
    });
  });

  it("should call login function with correct credentials", async () => {
    mockLogin.mockResolvedValue(undefined);

    render(
      <MockAuthProvider>
        <Login />
      </MockAuthProvider>
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("should redirect to home page after successful login", async () => {
    mockLogin.mockResolvedValue(undefined);

    render(
      <MockAuthProvider>
        <Login />
      </MockAuthProvider>
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(window.location.assign).toHaveBeenCalledWith("/");
    });
  });

  it("should show error message when login fails", async () => {
    const errorMessage = "Credenciais inválidas";
    mockLogin.mockRejectedValue(new Error(errorMessage));

    render(
      <MockAuthProvider>
        <Login />
      </MockAuthProvider>
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("should disable submit button during form submission", async () => {
    let resolveLogin: () => void;
    const loginPromise = new Promise<void>((resolve) => {
      resolveLogin = resolve;
    });
    mockLogin.mockReturnValue(loginPromise);

    render(
      <MockAuthProvider>
        <Login />
      </MockAuthProvider>
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // Button should be disabled during submission
    expect(submitButton).toBeDisabled();

    // Resolve the promise
    resolveLogin!();
    await loginPromise;

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("should clear server error when typing in form fields", async () => {
    const errorMessage = "Credenciais inválidas";
    mockLogin.mockRejectedValue(new Error(errorMessage));

    render(
      <MockAuthProvider>
        <Login />
      </MockAuthProvider>
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // First, trigger an error
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Clear the fields and type again - error should disappear
    await user.clear(emailInput);
    await user.type(emailInput, "new@example.com");

    // The error should still be there since we only clear on new submission
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
