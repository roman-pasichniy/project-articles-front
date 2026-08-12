const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export async function getUserById(userId: string) {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load author");
  }

  return data;
}

export async function getUserArticles(userId: string, page = 1, perPage = 10) {
  const response = await fetch(
    `${API_URL}/users/${userId}/articles?page=${page}&perPage=${perPage}`,
    {
      credentials: "include",
    },
  );

  const data = await response.json().catch(() => null);

  console.log("GET USER ARTICLES:", data);

  if (!response.ok) {
    throw new Error(data?.message ?? "Failed to load author articles");
  }

  return data;
}
