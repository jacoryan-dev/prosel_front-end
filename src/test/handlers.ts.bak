import { http, HttpResponse } from "msw";
import type {LoginResponse, User } from "../types/User";

export const handlers = [
  // Mock login endpoint
  http.post("https://api.homologation.cliqdrive.com.br/auth/login/", () => {
    return HttpResponse.json<LoginResponse>({
      tokens: {
        access: "mock_access_token_123",
        refresh: "mock_refresh_token_456",
      },
      user: {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        is_active: true,
        avatar: {
          id: 1,
          high: "https://example.com/avatar-high.jpg",
          medium: "https://example.com/avatar-medium.jpg",
          low: "https://example.com/avatar-low.jpg",
        },
        type: "user",
        created: "2023-01-01T00:00:00Z",
        modified: "2023-01-01T00:00:00Z",
        role: "user",
      },
    });
  }),

  // Mock login error
  http.post(
    "https://api.homologation.cliqdrive.com.br/auth/login-error/",
    () => {
      return HttpResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 }
      );
    }
  ),

  // Mock profile endpoint
  http.get("https://api.homologation.cliqdrive.com.br/auth/profile/", () => {
    return HttpResponse.json<User>({
      id: 1,
      name: "Test User",
      email: "test@example.com",
      is_active: true,
      avatar: {
        id: 1,
        high: "https://example.com/avatar-high.jpg",
        medium: "https://example.com/avatar-medium.jpg",
        low: "https://example.com/avatar-low.jpg",
      },
      type: "user",
      created: "2023-01-01T00:00:00Z",
      modified: "2023-01-01T00:00:00Z",
      role: "user",
    });
  }),

  // Mock profile error (unauthorized)
  http.get(
    "https://api.homologation.cliqdrive.com.br/auth/profile-unauthorized/",
    () => {
      return HttpResponse.json({ message: "Token inválido" }, { status: 401 });
    }
  ),
];
