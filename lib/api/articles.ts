export async function createArticle(formData: FormData) {
  const response = await fetch("http://localhost:3001/api/articles", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create article");
  }

  return response.json();
}
