import Button from "@/components/common/Button/Button";
import Container from "@/components/common/Container/Container";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <div className={styles.copy}>
            <h1 className={styles.title}>
              Find your <em>harmony</em> in community
            </h1>
            <div className={styles.actions}>
              <Button>Go to Articles</Button>
              <Button variant="outline">Register</Button>
            </div>
          </div>
          <div className={styles.imagePlaceholder} aria-hidden="true">
            Hero image
          </div>
        </div>
      </Container>
    </section>
  );
}
