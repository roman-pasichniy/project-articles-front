export async function createArticle(formData: FormData) {
  const response = await fetch("http://localhost:3001/api/articles", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || `Failed to create article: ${response.status}`,
    );
  }

  return response.json();
}
