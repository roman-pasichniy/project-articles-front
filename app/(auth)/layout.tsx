import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}