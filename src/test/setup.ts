import "@testing-library/jest-dom";
import { vi } from "vitest";

// Simplified setup without MSW to avoid module conflicts
// MSW will be set up individually in tests that need it

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock do location
Object.defineProperty(window, "location", {
  value: {
    assign: vi.fn(),
    href: "http://localhost:3000/",
  },
  writable: true,
});

// Mock do console.error para evitar logs desnecessários nos testes
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

// Limpar mocks após cada teste
afterEach(() => {
  vi.clearAllMocks();
});
