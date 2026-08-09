import Container from "@/components/common/Container/Container";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section} id="about">
      <Container>
        <div className={styles.content}>
          <div>
            <p className={styles.eyebrow}>About Harmoniq</p>
            <h2 className={styles.title}>About us</h2>
          </div>
          <p className={styles.description}>
            Harmoniq is a mindful publishing platform where people share stories,
            ideas, and practices that support balance and well-being.
          </p>
          <div className={styles.imagePlaceholder} aria-hidden="true">
            About image
          </div>
        </div>
      </Container>
    </section>
  );
}
