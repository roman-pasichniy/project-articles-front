import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Container from "@/components/common/Container/Container";
import Logo from "@/components/common/Logo/Logo";
import styles from "./page.module.css";

export default function RegisterPage() {
  return (
    <section className={styles.main}>
      <Container>
        <div className={styles.card}>
          <Logo />
          <h1 className={styles.title}>Register</h1>
          <RegisterForm />
        </div>
      </Container>
    </section>
  );
}
