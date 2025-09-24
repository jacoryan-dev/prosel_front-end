const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export const storage = {
  saveTokens(tokens: { access: string; refresh?: string }) {
    localStorage.setItem(ACCESS_KEY, tokens.access);
    if (tokens.refresh) localStorage.setItem(REFRESH_KEY, tokens.refresh);
  },
  getAccessToken() {
    return localStorage.getItem(ACCESS_KEY);
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};
