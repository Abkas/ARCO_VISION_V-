import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeBanner from "./components/MarqueeBanner";
import WorkGrid from "./components/WorkGrid";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ServiceDetail from "./components/ServiceDetail";
import AboutUs from "./components/AboutUs";
import PlansPage from "./components/PlansPage";

function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <WorkGrid />
      <Services />
      <Pricing compact />
      <ContactForm />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ServiceDetailPage() {
  const { slug } = useParams();
  return <ServiceDetail slug={slug || ""} />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen scroll-smooth bg-[#FAF7F2] text-[#2C1A0E]">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
