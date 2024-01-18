import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="p-4 max-w-7xl m-auto min-w-[300px]">{children}</main>
      <Footer />
    </div>
  );
}
