import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.main}>
      <Container>
        <div className={styles.card}>
          <p className={styles.logo}>Harmoniq</p>
          <h1 className={styles.title}>Register</h1>
          <RegisterForm />
        </div>
      </Container>
    </main>
  );
}
