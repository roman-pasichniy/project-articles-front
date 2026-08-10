import type { AuthUser, LoginCredentials } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(
  credentials: LoginCredentials,
): Promise<AuthUser> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Login failed" }));

    throw new Error(error.message ?? "Login failed");
  }

  return response.json();
}