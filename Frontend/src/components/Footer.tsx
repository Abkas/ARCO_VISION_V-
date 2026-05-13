import { useNavigate } from "react-router-dom";
import { Share2, Play, Palette, Link } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const socialLinks = [
    { name: "Instagram", icon: Share2, url: "#" },
    { name: "Vimeo", icon: Play, url: "#" },
    { name: "Behance", icon: Palette, url: "#" },
    { name: "LinkedIn", icon: Link, url: "#" },
  ];

  return (
    <footer className="bg-[#2C1A0E] text-[#FAF7F2]">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
        {/* Top Section - Brand and Social */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 pb-12 border-b border-[#FAF7F2]/10">
          <div className="mb-8 md:mb-0">
            <a href="/" className="font-display text-3xl tracking-tight inline-block">
              ARCO <span className="italic font-light text-[#D4AE87]">Cinema</span>
            </a>
            <p className="mt-3 font-sans text-xs text-[#D4AE87]">
              Founded by Abhishek Magar &amp; Anuj Gyawali
            </p>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex gap-4">
            {socialLinks.map(({ name, icon: Icon, url }) => (
              <a
                key={name}
                href={url}
                className="w-12 h-12 rounded-lg bg-[#3A2817] flex items-center justify-center text-[#D4AE87] hover:bg-[#D4AE87] hover:text-[#2C1A0E] transition-all duration-300 hover:scale-110"
                title={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section - Navigation and Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12 pb-12 border-b border-[#FAF7F2]/10">
          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-semibold mb-4 text-[#D4AE87] uppercase tracking-wide">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("work")}
                  className="font-sans text-sm text-[#FAF7F2]/70 hover:text-[#D4AE87] transition-colors"
                >
                  Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="font-sans text-sm text-[#FAF7F2]/70 hover:text-[#D4AE87] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/plans")}
                  className="font-sans text-sm text-[#FAF7F2]/70 hover:text-[#D4AE87] transition-colors"
                >
                  Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="font-sans text-sm text-[#FAF7F2]/70 hover:text-[#D4AE87] transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-display text-sm font-semibold mb-4 text-[#D4AE87] uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("/privacy")}
                  className="font-sans text-sm text-[#FAF7F2]/70 hover:text-[#D4AE87] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/terms")}
                  className="font-sans text-sm text-[#FAF7F2]/70 hover:text-[#D4AE87] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold mb-4 text-[#D4AE87] uppercase tracking-wide">Get In Touch</h3>
            <button
              onClick={() => scrollToSection("contact")}
              className="font-sans text-sm text-[#FAF7F2]/70 hover:text-[#D4AE87] transition-colors"
            >
              Contact Us
            </button>
            <p className="mt-4 font-sans text-xs text-[#FAF7F2]/60 leading-relaxed">
              Ready to bring your vision to life? Let's create something extraordinary together.
            </p>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-[#FAF7F2]/50">
          <p>© {new Date().getFullYear()} ARCO Cinema. All rights reserved.</p>
          <p className="text-[#D4AE87]">Crafted with intention. Powered by innovation.</p>
        </div>
      </div>
    </footer>
  );
}