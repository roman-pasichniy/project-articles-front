This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

# Harmoniq — українська інструкція для команди

Frontend багатосторінкового вебзастосунку Harmoniq для публікації, перегляду та збереження статей.

## Технології

- Next.js (App Router) + React + TypeScript
- CSS Modules, mobile-first
- TanStack Query — серверні дані та кеш
- Formik + Yup — форми та валідація
- Zustand — глобальний клієнтський стан, якщо він справді потрібен
- React Hot Toast — повідомлення про успіх та помилки

## Швидкий запуск

```bash
npm install
npm run dev
```

Frontend відкривається на [http://localhost:3000](http://localhost:3000).

Перед Pull Request обов’язково виконати:

```bash
npm run lint
npm run build
```

## Налаштування зв’язку з backend

Frontend і backend не можуть одночасно працювати на одному порту. Рекомендоване локальне налаштування:

- frontend: `http://localhost:3000`;
- backend: `http://localhost:3001`;
- базова адреса API: `http://localhost:3001/api`.

У корені frontend-проєкту створіть файл `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Файли `.env.local` не комітимо. У репозиторій можна додати лише `.env.example` без секретних значень.

Після зміни `.env.local` потрібно перезапустити `npm run dev`.

У backend-файлі `.env` встановіть інший порт:

```env
PORT=3001
```

Backend повинен дозволяти CORS-запити з `http://localhost:3000`. Якщо авторизація використовуватиме refresh-token у cookie, потрібно додатково ввімкнути `credentials` на обох сторонах.

## Як проходить запит

```text
Сторінка або компонент
        ↓
TanStack Query hook / mutation
        ↓
функція з lib/api
        ↓
HTTP-запит до NEXT_PUBLIC_API_URL
        ↓
Express route → middleware → controller
        ↓
MongoDB
        ↓
JSON-відповідь → TanStack Query → компонент
```

Компонент не повинен містити довгий `fetch`, ручне кешування та логіку обробки API. Виносимо запити у `lib/api`, а їх використання — у відповідний hook.

## Приклад GET-запиту

Файл `lib/api/articles.ts`:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getArticles(page = 1, perPage = 10) {
  const response = await fetch(
    `${API_URL}/articles?page=${page}&perPage=${perPage}`,
  );

  if (!response.ok) {
    throw new Error("Не вдалося отримати статті");
  }

  return response.json();
}
```

Використання з TanStack Query у клієнтському компоненті:

```ts
const query = useQuery({
  queryKey: ["articles", page, perPage],
  queryFn: () => getArticles(page, perPage),
});
```

Важливо: усі значення, від яких залежить результат запиту, додаємо в `queryKey`. Тоді сторінки, фільтри й сортування матимуть окремий кеш.

## Приклад POST-запиту

```ts
export async function createArticle(formData: FormData) {
  const response = await fetch(`${API_URL}/articles`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Не вдалося створити статтю");
  }

  return response.json();
}
```

Для `FormData` не встановлюйте заголовок `Content-Type` вручну — браузер сам додасть правильний `multipart/form-data` з boundary.

Після успішного створення/редагування/видалення статті оновлюємо кеш:

```ts
queryClient.invalidateQueries({ queryKey: ["articles"] });
```

## Авторизація

Команда повинна узгодити один спосіб передачі токена.

### Варіант 1: access-token у заголовку

```ts
headers: {
  Authorization: `Bearer ${accessToken}`,
}
```

### Варіант 2: refresh-token у HttpOnly cookie

Frontend додає:

```ts
credentials: "include"
```

Backend налаштовує CORS приблизно так:

```js
cors({
  origin: "http://localhost:3000",
  credentials: true,
})
```

HttpOnly cookie не читаємо через JavaScript. Це нормальний і безпечніший підхід: браузер передає її автоматично.

## Структура frontend

```text
app/                         маршрути та сторінки Next.js
  layout.tsx                 кореневий layout і глобальні providers
  page.tsx                   головна сторінка
  login/page.tsx             /login
  register/page.tsx          /register
  photo/page.tsx             /photo
  articles/page.tsx          /articles
  articles/[articleId]/      /articles/:articleId
  articles/new/page.tsx      /articles/new
  authors/page.tsx           /authors
  authors/[authorId]/        /authors/:authorId
  profile/page.tsx           /profile

components/
  common/                    повторно використовувані UI-компоненти
  layout/                    Header, Footer та layout-модалки
  home/                      секції головної сторінки
  articles/                  компоненти статей
  authors/                   компоненти авторів
  auth/                      форми входу й реєстрації
  profile/                   компоненти профілю

providers/                   QueryProvider та інші providers
lib/api/                     функції HTTP-запитів
hooks/                       перевикористовувані hooks
schemas/                     Yup-схеми
store/                       Zustand stores
types/                       спільні TypeScript-типи
constants/                   маршрути, query keys та інші константи
public/images/               растрові зображення
public/icons/                SVG та іконки
```

## Як додавати сторінку

Наприклад, сторінка однієї статті:

```text
app/articles/[articleId]/page.tsx
components/articles/ArticleDetails/ArticleDetails.tsx
components/articles/ArticleDetails/ArticleDetails.module.css
lib/api/articles.ts
hooks/useArticle.ts
types/article.ts
```

Розподіл відповідальності:

1. `page.tsx` отримує параметри маршруту та складає сторінку.
2. Компонент відповідає за інтерфейс.
3. CSS Module відповідає за стилі компонента.
4. `lib/api` знає URL, метод і формат запиту.
5. Hook з TanStack Query керує завантаженням, кешем і помилками.
6. `types` описує дані, які повертає backend.

## Як додавати компонент або секцію

Кожен компонент зберігаємо у власній папці:

```text
components/home/AboutUs/
  AboutUs.tsx
  AboutUs.module.css
```

Правила:

- назви React-компонентів — `PascalCase`;
- стилі — тільки через CSS Modules, крім глобального reset і змінних;
- компонент не повинен знати адресу backend-сервера;
- зображення показуємо через `next/image`;
- семантичні теги: `header`, `main`, `section`, `article`, `footer`;
- одна сторінка має один основний `h1`, заголовки секцій — `h2`;
- спільний `Container` використовуємо для однакових горизонтальних відступів.

## Адаптивність

Верстка створюється mobile-first:

- від `320px` — гумова мобільна верстка;
- макет Figma `393px` є прикладом мобільної ширини, а не окремим breakpoint;
- від `768px` — tablet;
- від `1440px` — desktop.

Базовий `Container` уже налаштований:

- mobile: горизонтальні відступи `16px`;
- tablet: горизонтальні відступи `32px`;
- desktop: максимальна ширина `1440px`, горизонтальні відступи `72px`.

Стилі спочатку пишемо для mobile, потім додаємо:

```css
/* mobile — базові стилі без media query */

@media screen and (min-width: 768px) {
  /* tablet */
}

@media screen and (min-width: 1440px) {
  /* desktop */
}
```

## Спільні інструменти

### TanStack Query

Використовуємо для даних із backend: статей, авторів, профілю, категорій. `QueryProvider` уже підключений у кореневому layout.

### Formik + Yup

Використовуємо для форм входу, реєстрації, профілю та створення статті. Formik керує полями й помилками, Yup описує правила валідації.

### Zustand

Використовуємо лише для стану, який потрібен багатьом непов’язаним компонентам. Дані з backend не дублюємо в Zustand — для них є TanStack Query.

### React Hot Toast

`Toaster` уже підключений глобально. Приклад:

```ts
toast.success("Статтю збережено");
toast.error("Не вдалося виконати дію");
```

### Modal

Спільний компонент `components/common/Modal` уже підтримує:

- закриття клавішею Escape;
- закриття по кліку на backdrop;
- блокування прокручування сторінки;
- portal і базову доступність.

Фічеві модалки повинні використовувати цей компонент, а не створювати власний backdrop з нуля.

## Frontend-сторінки та backend

| Frontend | Призначення | Backend API |
|---|---|---|
| `/register` | реєстрація | `POST /api/auth/register` |
| `/login` | вхід | `POST /api/auth/login` |
| `/articles` | список, пагінація, фільтри, сортування | `GET /api/articles` |
| `/articles/[articleId]` | одна стаття | `GET /api/articles/:articleId` |
| `/articles/new` | створення статті | `POST /api/articles` |
| `/authors` | список авторів | endpoint потрібно узгодити |
| `/authors/[authorId]` | публічний профіль автора | `GET /api/users/:userId` |
| `/profile` | поточний користувач і його статті | приватні endpoints користувача |
| `/photo` | завантаження аватара | приватний endpoint аватара |
| головна сторінка | популярні статті й автори | `GET /api/articles` та users API |

Таблиця описує запланований контракт. Не всі endpoints уже реалізовані в backend.

## Поточний стан backend, який треба врахувати

На момент написання README у backend є такі маршрути:

- `POST /api/auth/register`;
- `GET /api/articles`;
- `GET /api/articles/:articleId`;
- `GET /api/categories`.

У `usersRouter` зараз маршрут записаний як `/users/:userId`, хоча router уже підключено до `/api/users`. Через це фактична адреса стає `/api/users/users/:userId`. Потрібно узгодити з backend-розробником і виправити маршрут router на `/:userId`, щоб отримати нормальну адресу `/api/users/:userId`.

Також у `server.js` `articlesRouter` підключений двічі. Один із двох однакових рядків потрібно прибрати.

Frontend не повинен підлаштовуватися під випадкові дублікати URL. Спочатку команда узгоджує API-контракт, потім frontend і backend реалізують однакову адресу.

## Формат API-відповідей

Перед інтеграцією frontend- і backend-розробники однієї фічі мають узгодити:

- точний URL і HTTP-метод;
- query-параметри;
- тіло запиту;
- назви й типи полів відповіді;
- статуси `200`, `201`, `400`, `401`, `403`, `404`;
- формат помилки;
- чи потрібен token або cookie.

Бажано використовувати один формат успішної відповіді:

```json
{
  "data": {},
  "message": "Операцію виконано"
}
```

і помилки:

```json
{
  "status": 400,
  "message": "Некоректні дані"
}
```

Для пагінації backend повинен повертати не лише статті, а й метадані:

```json
{
  "page": 1,
  "perPage": 10,
  "totalItems": 42,
  "totalPages": 5,
  "hasPreviousPage": false,
  "hasNextPage": true,
  "articles": []
}
```

## Робота над фічею в команді

1. Відкрити свою задачу та перевірити, що вона призначена саме вам.
2. Узгодити з backend-розробником API-контракт.
3. Додати TypeScript-тип відповіді.
4. Реалізувати API-функцію в `lib/api`.
5. Додати TanStack Query hook або mutation.
6. Реалізувати компонент і CSS Module за Figma.
7. Обробити loading, empty state та error state.
8. Перевірити ширини `320`, `393`, `768` і `1440` px.
9. Запустити lint і build.
10. У Pull Request описати endpoint, виконані перевірки та додати скриншоти.

## Що не можна комітити

- `.env` і `.env.local`;
- `node_modules`;
- `.next`;
- токени, паролі, MongoDB URI та інші секрети;
- великі невикористані файли;
- випадкові зміни чужих компонентів.

## Важлива домовленість

API URL, назви полів і формат відповіді не повинні визначатися окремо frontend- та backend-розробниками. Це спільний контракт. Якщо контракт змінюється, потрібно повідомити пов’язаного розробника і оновити обидві частини фічі.

## Повна карта сторінок і станів Harmoniq

У репозиторії заздалегідь створений базовий каркас маршрутів і компонентів. Це не фінальна верстка з Figma, а спільна структура, яку команда поступово наповнює у своїх фічах.

### Реальні маршрути

| URL | Файл сторінки | Призначення | Запланований backend API |
|---|---|---|---|
| `/` | `app/page.tsx` | головна сторінка | популярні статті й автори |
| `/articles` | `app/articles/page.tsx` | список, фільтри, сортування та пагінація | `GET /api/articles` |
| `/articles/[articleId]` | `app/articles/[articleId]/page.tsx` | детальна сторінка статті | `GET /api/articles/:articleId` |
| `/articles/new` | `app/articles/new/page.tsx` | створення статті | `POST /api/articles` |
| `/articles/[articleId]/edit` | `app/articles/[articleId]/edit/page.tsx` | редагування власної статті | `PATCH /api/articles/:articleId` |
| `/authors` | `app/authors/page.tsx` | список авторів | endpoint потрібно узгодити |
| `/authors/[authorId]` | `app/authors/[authorId]/page.tsx` | публічний профіль автора та його статті | `GET /api/users/:userId` і список статей автора |
| `/profile` | `app/profile/page.tsx` | профіль поточного користувача | приватні user endpoints |
| `/profile?tab=saved` | та сама сторінка профілю | збережені статті | приватний endpoint saved articles |
| `/profile?tab=my-articles` | та сама сторінка профілю | створені користувачем статті | endpoint статей автора |
| `/login` | `app/login/page.tsx` | вхід | `POST /api/auth/login` |
| `/register` | `app/register/page.tsx` | реєстрація | `POST /api/auth/register` |
| `/photo` | `app/photo/page.tsx` | додавання або зміна аватара | приватний endpoint аватара |

У Next.js 16 параметри динамічних сторінок є асинхронними. Тому `articleId`, `authorId` і `searchParams` потрібно отримувати через `await`.

### Макети Figma, які не є окремими сторінками

Не потрібно створювати новий маршрут для кожного кадру у Figma:

- авторизований Header — стан компонента `Header` та `UserBar`;
- мобільне меню — компонент `MobileMenu`;
- підтвердження виходу — `LogoutModal`;
- помилка збереження — `ModalErrorSave`;
- порожній список — спільний `EmptyState`;
- завантаження — спільний `Loader`;
- помилка API — `ErrorMessage`;
- заповнена і порожня форма — стани одного компонента форми;
- saved articles і my articles — вкладки однієї сторінки `/profile`;
- авторизована й неавторизована Home — стани тих самих секцій, а не два маршрути.

### Компоненти за функціональними блоками

```text
components/
├── articles/   # список, картка, фільтри, деталі, форма, рекомендації, bookmark
├── auth/       # LoginForm, RegisterForm, UploadForm
├── authors/    # AuthorsList, AuthorsItem, AuthorInfo
├── common/     # Button, Container, Logo, Modal, Loader, EmptyState, Pagination
├── home/       # Hero, About, PopularArticles, Creators
├── layout/     # Header, Footer, MobileMenu, UserBar, LogoutModal
└── profile/    # ProfileHeader, ProfileTabs, SavedArticles, MyArticles, UserModal
```

Кожен візуальний компонент зберігається разом зі своїм CSS Module:

```text
ComponentName/
├── ComponentName.tsx
└── ComponentName.module.css
```

### Адаптивність компонентів

Стилі пишемо mobile-first:

- базові правила — гумова верстка від `320px`;
- макет Figma `393px` перевіряємо як типовий мобільний розмір, але це не окремий breakpoint;
- tablet — `@media screen and (min-width: 768px)`;
- desktop — `@media screen and (min-width: 1440px)`.

Глобальні кольори, шрифти й reset залишаються в `app/globals.css`. Ширина контенту та бокові відступи — у спільному `Container`. CSS конкретної секції має описувати тільки її власну сітку, відступи та стани.

### Як розробнику почати роботу над фічею

1. Знайти свою сторінку в `app` і компоненти фічі в `components`.
2. Не створювати дублікати наявних маршрутів або компонентів.
3. Замінити текстовий каркас реальною розміткою з Figma.
4. Додати типи даних, API-функцію та TanStack Query hook.
5. Реалізувати loading, error, empty та authorized states.
6. Перевірити `320`, `393`, `768` і `1440` px.
7. Виконати `npm run lint` та `npm run build`.

Каркас не визначає остаточний API-контракт. Перед інтеграцією frontend- і backend-розробники відповідної фічі мають узгодити URL, метод, параметри, тіло запиту та формат відповіді.

## Пояснення для колабораторів: як пов’язати свою backend-фічу з frontend

Цей розділ написаний простими словами для тих, хто вперше працює над командним fullstack-проєктом.

### Головна ідея

Backend зберігає та повертає дані. Frontend показує ці дані користувачу і надсилає на backend те, що користувач ввів у формі.

Наприклад:

```text
Користувач відкрив /articles
        ↓
Frontend викликав GET /api/articles
        ↓
Backend отримав статті з MongoDB
        ↓
Backend повернув JSON
        ↓
Frontend показав статті через ArticlesList
```

Тому бажано, щоб backend-завдання розробника було пов’язане з його великою frontend-фічею. Так легше зрозуміти весь шлях даних і менше залежати від інших учасників.

### Яку frontend-фічу брати до своєї backend-фічі

| Якщо ви робили на backend | Пов’язана велика frontend-фіча | Основні frontend-файли | Можлива маленька frontend-фіча |
|---|---|---|---|
| Реєстрацію користувача | сторінка реєстрації | `app/register`, `components/auth/RegisterForm` | кнопка Register у `Hero` або `Header` |
| Логін користувача | сторінка входу | `app/login`, `components/auth/LoginForm` | посилання Log in у `Header` |
| Авторизацію, refresh token | відображення авторизованого користувача | `Header`, `UserBar`, захищені сторінки | `Loader` або перевірка доступу |
| Вихід користувача | підтвердження виходу | `components/layout/LogoutModal`, `UserBar` | кнопка закриття модалки |
| Додавання або зміну аватара | сторінка завантаження фото | `app/photo`, `components/auth/UploadForm` | показ аватара у `UserBar` |
| Отримання користувача за ID | публічний профіль автора | `app/authors/[authorId]`, `components/authors/AuthorInfo` | `AuthorsItem` |
| Отримання списку авторів | сторінка авторів | `app/authors`, `AuthorsList`, `AuthorsItem` | `SectionTitle` |
| Отримання збережених статей | вкладка Saved articles | `app/profile`, `ProfileTabs`, `SavedArticles` | `EmptyState` |
| Отримання створених статей користувача | вкладка My articles | `app/profile`, `ProfileTabs`, `MyArticles` | картка статті |
| Додавання/видалення статті зі збережених | кнопка Save/Unsave | `ButtonAddToBookmarks`, сторінка статті | SVG bookmark або toast |
| Отримання всіх статей | сторінка Articles | `app/articles`, `ArticlesList`, `ArticlesItem`, `Pagination` | блок `PopularArticles` на Home |
| Фільтрацію, сортування, категорії | панель фільтрів | `ArticlesFilter`, `app/articles` | окремий select або кнопка категорії |
| Отримання статті за ID | сторінка однієї статті | `app/articles/[articleId]`, `ArticleDetails` | `ArticleRecommendations` |
| Створення статті | сторінка Create article | `app/articles/new`, `AddArticleForm` | кнопка Create article у Header/Profile |
| Редагування статті | сторінка Edit article | `app/articles/[articleId]/edit`, `AddArticleForm` | іконка Edit |
| Видалення статті | кнопка та модалка підтвердження | `ArticleDetails` | повідомлення про успіх або помилку |
| Оновлення інформації користувача | редагування профілю | `ProfileHeader`, `UserModal` | іконка Edit |

Назви endpoint у таблиці нижче є запланованим контрактом. Якщо backend реалізований інакше, спочатку узгодьте це з командою, а не підлаштовуйте frontend мовчки.

### Де писати код своєї фічі

Приклад: ви взяли `GET /api/articles` і сторінку Articles.

```text
app/articles/page.tsx
    збирає сторінку з готових компонентів

components/articles/ArticlesFilter/
    фільтри та сортування

components/articles/ArticlesList/
    список статей

components/articles/ArticlesItem/
    одна картка статті

components/common/Pagination/
    перемикання сторінок

types/
    TypeScript-тип Article і тип API-відповіді

lib/api/
    функція, яка звертається до GET /api/articles

hooks/
    TanStack Query hook, який викликає API-функцію
```

Не пишіть весь код у `page.tsx`. Сторінка лише збирає компоненти. Розмітка картки має бути в `ArticlesItem`, фільтри — в `ArticlesFilter`, а запит до backend — в `lib/api`.

### Як підключити backend до frontend: порядок роботи

1. Запустіть backend і переконайтеся через Postman або Thunder Client, що endpoint працює.
2. Подивіться точний JSON, який повертає backend.
3. Запишіть TypeScript-тип цих даних у `types`.
4. Додайте одну API-функцію в `lib/api`.
5. Додайте TanStack Query hook у `hooks`.
6. Викличте hook у потрібному компоненті.
7. Покажіть `Loader`, поки дані завантажуються.
8. Покажіть `ErrorMessage`, якщо запит завершився помилкою.
9. Покажіть `EmptyState`, якщо масив порожній.
10. Передайте отримані дані у список і картки.

Спрощений приклад розподілу відповідальності:

```text
lib/api        → знає URL backend
hooks          → керує запитом, loading та error
components     → показують дані
app/page.tsx   → збирає сторінку
```

### Що потрібно узгодити з backend-розробником

Перед початком інтеграції напишіть один одному й перевірте:

- HTTP-метод: `GET`, `POST`, `PATCH`, `DELETE`;
- повний URL endpoint;
- чи потрібен access token або cookie;
- назви query-параметрів: `page`, `perPage`, `category`, `sortBy`, `sortOrder`;
- поля request body;
- формат успішної відповіді;
- формат помилки;
- які статуси повертаються: `200`, `201`, `400`, `401`, `403`, `404`;
- як передається файл: JSON чи `FormData`.

### Що робити, якщо backend ще не готовий

Frontend можна верстати на тимчасових тестових даних, але:

- зберігайте тестові дані окремо, а не всередині великого JSX;
- не вигадуйте остаточні назви полів без узгодження;
- залиште зрозумілий коментар, що дані тимчасові;
- перед Pull Request підключіть справжній endpoint або прямо напишіть, що інтеграція ще очікує backend.

### Правила, які зменшують конфлікти

- не створюйте другий компонент, якщо потрібна папка вже існує;
- працюйте переважно у файлах своєї фічі;
- не переписуйте чужий компонент без повідомлення його автора;
- спільні `Header`, `Footer`, `Container`, глобальні стилі та API-клієнт змінюйте обережно;
- перед початком роботи стягніть актуальні зміни;
- перед Pull Request запустіть `npm run lint` та `npm run build`;
- у Pull Request напишіть, який endpoint підключено і які стани перевірено.

### Короткий приклад для новачка

Якщо ви зробили backend-реєстрацію, ваша пов’язана frontend-робота виглядає так:

1. Відкрити `app/register/page.tsx`.
2. Верстати форму в `components/auth/RegisterForm` за Figma.
3. Додати перевірки полів через Formik і Yup.
4. Створити API-функцію для `POST /api/auth/register`.
5. Після натискання Submit відправити ім’я, email, пароль і, за потреби, avatar.
6. Показати помилку, якщо email уже зайнятий.
7. Після успіху перейти на потрібну сторінку за погодженим сценарієм.

Таким способом одна фіча містить повний зрозумілий ланцюжок: форма → API-запит → backend → MongoDB → відповідь → результат на екрані.
