// Admin Authentication & Session Management Service
const AUTH_TOKEN_KEY = "visionx_admin_token";
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "visionx2026";

export const loginAdmin = (username, password) => {
  if (username.trim().toLowerCase() === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
    const token = "vx_session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return { success: true, token };
  }
  return { success: false, message: "Invalid username or password. Default: admin / visionx2026" };
};

export const isAuthenticatedAdmin = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return Boolean(token && token.startsWith("vx_session_"));
  } catch (e) {
    return false;
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
