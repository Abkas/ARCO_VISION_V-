import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      // Use setTimeout to allow navigation to complete
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF7F2]/98 backdrop-blur-lg border-b border-[#E8DFD0]/50 shadow-sm"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
        <button
          onClick={() => navigate("/")}
          className={`font-display text-2xl tracking-tight cursor-pointer transition-colors ${scrolled ? "text-[#2C1A0E]" : "text-white drop-shadow-lg"}`}
        >
          ARCO <span className="italic font-light text-[#B8956A]">Cinema</span>
        </button>
        <div className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollToSection("work")}
            className={`font-sans text-sm tracking-wide transition-colors font-medium ${
              scrolled ? "text-[#2C1A0E] hover:text-[#B8956A]" : "text-white drop-shadow-md hover:text-[#B8956A]"
            }`}
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className={`font-sans text-sm tracking-wide transition-colors font-medium ${
              scrolled ? "text-[#2C1A0E] hover:text-[#B8956A]" : "text-white drop-shadow-md hover:text-[#B8956A]"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => navigate("/plans")}
            className={`font-sans text-sm tracking-wide transition-colors font-medium ${
              scrolled ? "text-[#2C1A0E] hover:text-[#B8956A]" : "text-white drop-shadow-md hover:text-[#B8956A]"
            }`}
          >
            Plans
          </button>
          <button
            onClick={() => navigate("/about")}
            className={`font-sans text-sm tracking-wide transition-colors font-medium ${
              scrolled ? "text-[#2C1A0E] hover:text-[#B8956A]" : "text-white drop-shadow-md hover:text-[#B8956A]"
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={`rounded-full border px-5 py-2 font-sans text-sm backdrop-blur-md transition-all font-medium ${
              scrolled
                ? "border-[#B8956A] bg-[#B8956A]/10 text-[#2C1A0E] hover:bg-[#B8956A] hover:text-white"
                : "border-white/50 bg-white/20 text-white hover:bg-white/30 drop-shadow-md"
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </motion.nav>
  );
}