import "@testing-library/jest-dom";
import { vi } from "vitest";

// Minimal setup for CI environment - no MSW, no complex mocks
// Only essential browser API mocks

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

// Clean console during tests
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

// Clear all mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Prevent any accidental module imports
if (typeof process !== 'undefined' && process.env.CI === 'true') {
  // In CI environment, be extra careful about module loading
  console.log('Running in CI mode with minimal setup');
}