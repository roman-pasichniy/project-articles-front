// import styles from "./AuthorInfo.module.css";

// type AuthorInfoProps = { authorId?: string };

// export default function AuthorInfo({ authorId }: AuthorInfoProps) {
//   return <section className={styles.info}><h1>Author profile</h1><p>{authorId ?? "Author information"}</p></section>;
// }

import { getUserById } from "@/lib/api/users";
import styles from "./AuthorInfo.module.css";
import Image from "next/image";

type AuthorInfoProps = {
  authorId: string;
};

export default async function AuthorInfo({ authorId }: AuthorInfoProps) {
  const data = await getUserById(authorId);

  const author = data.user;

  return (
    <section className={styles.info}>
      <h1>{author.name}</h1>

      {author.avatarUrl && (
        <Image
          src={author.avatarUrl}
          alt={author.name}
          width={120}
          height={120}
        />
      )}

      <p>Articles: {author.articlesAmount}</p>
    </section>
  );
}
