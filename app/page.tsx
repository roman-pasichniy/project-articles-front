import About from "@/components/home/About/About";
import Creators from "@/components/home/Creators/Creators";
import Hero from "@/components/home/Hero/Hero";
import PopularArticles from "@/components/home/PopularArticles/PopularArticles";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <About />
        <PopularArticles />
        <Creators />
      </main>
      <Footer />
    </div>
  );
}
