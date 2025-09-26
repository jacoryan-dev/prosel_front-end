import { describe, it, expect, vi, beforeEach } from "vitest";
import { storage } from "../storage";

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

describe("Storage Utility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("saveTokens", () => {
    it("should save access token to localStorage", () => {
      const tokens = { access: "access_token_123" };

      storage.saveTokens(tokens);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "access_token",
        "access_token_123"
      );
    });

    it("should save both access and refresh tokens to localStorage", () => {
      const tokens = {
        access: "access_token_123",
        refresh: "refresh_token_456",
      };

      storage.saveTokens(tokens);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "access_token",
        "access_token_123"
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "refresh_token",
        "refresh_token_456"
      );
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    });

    it("should not save refresh token when not provided", () => {
      const tokens = { access: "access_token_123" };

      storage.saveTokens(tokens);

      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "access_token",
        "access_token_123"
      );
    });
  });

  describe("getAccessToken", () => {
    it("should return access token from localStorage", () => {
      localStorageMock.getItem.mockReturnValue("access_token_123");

      const result = storage.getAccessToken();

      expect(localStorageMock.getItem).toHaveBeenCalledWith("access_token");
      expect(result).toBe("access_token_123");
    });

    it("should return null when no access token exists", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = storage.getAccessToken();

      expect(localStorageMock.getItem).toHaveBeenCalledWith("access_token");
      expect(result).toBeNull();
    });
  });

  describe("clear", () => {
    it("should remove both access and refresh tokens from localStorage", () => {
      storage.clear();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith("access_token");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("refresh_token");
      expect(localStorageMock.removeItem).toHaveBeenCalledTimes(2);
    });
  });
});
