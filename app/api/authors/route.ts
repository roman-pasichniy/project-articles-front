import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Зчитуємо параметри від TanStack Query
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  // 2. Створюємо несправжню базу даних на 50 авторів, щоб протестувати кнопку Load More
  const mockDatabase = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Harmoniq Creator ${i + 1}`,
    avatarUrl: "", // Використовуватиметься svg-заглушка
  }));

  try {
    // Рахуємо індекси порції даних для поточної сторінки
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageData = mockDatabase.slice(startIndex, endIndex);

    // 3. Повертаємо порцію авторів назад у фронтенд
    return NextResponse.json(pageData);
  } catch {
    return NextResponse.json({ error: "Simulation error" }, { status: 500 });
  }
}
