import UploadForm from "@/components/auth/UploadForm/UploadForm";
import Container from "@/components/common/Container/Container";
import styles from "./page.module.css";

export default function PhotoPage() {
  return (
    <section className={styles.main}>
      <Container>
        <div className={styles.card}>
          <p className={styles.logo}>Harmoniq</p>
          <h1 className={styles.title}>Upload your photo</h1>
          <UploadForm />
        </div>
      </Container>
    </section>
  );
}
