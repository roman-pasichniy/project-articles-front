import LoginForm from "@/components/auth/LoginForm/LoginForm";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.card}>
          <p className={styles.logo}>Harmoniq</p>
          <h1 className={styles.title}>Log in</h1>
          <LoginForm />
        </div>
      </Container>
    </main>
  );
}
