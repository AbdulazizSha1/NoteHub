import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Department from "../components/Department.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08192B]">
      <Navbar />
      <Hero />
      <Department />
      <Footer />
    </div>
  );
}