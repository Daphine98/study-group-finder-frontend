const TOKEN_KEY = "studyGroupToken";
const API_BASE_URL = (import.meta.env.VITE_API_URL || "/api").replace(
  /\/$/,
  "",
);

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  save: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request(path, method = "GET", body) {
  const headers = { "Content-Type": "application/json" };
  const token = tokenStorage.get();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, "POST", body ?? {}),
  put: (path, body) => request(path, "PUT", body),
  delete: (path) => request(path, "DELETE"),
};
