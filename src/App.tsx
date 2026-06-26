import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustedCompanies } from "./components/TrustedCompanies";
import { FeatureShowcase } from "./components/FeatureShowcase";
import { WorkflowShowcase } from "./components/WorkflowShowcase";
import { Statistics } from "./components/Statistics";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { CommandPalette } from "./components/CommandPalette";

function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Sync theme selection to document element
  useEffect(() => {
    const root = document.documentElement;
    if (isLightTheme) {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [isLightTheme]);

  // Bind Ctrl + K hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setIsLightTheme((prev) => !prev);
  };

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen flex flex-col justify-between overflow-x-hidden transition-colors duration-300 selection:bg-forsythia-yellow selection:text-oceanic-noir">
      {/* Sticky Header */}
      <Navbar
        onNavigate={handleNavigate}
        onToggleTheme={toggleTheme}
        isLightTheme={isLightTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Interactive 3D Hero */}
        <Hero onCtaClick={() => handleNavigate("pricing")} />

        {/* Brand logos slider */}
        <TrustedCompanies />

        {/* Interactive Features Grid */}
        <FeatureShowcase />

        {/* Live execution flow showcase */}
        <WorkflowShowcase />

        {/* Platform counters */}
        <Statistics />

        {/* Client references */}
        <Testimonials />

        {/* Localized pricing engine */}
        <Pricing />

        {/* Accessible FAQ panel */}
        <FAQ />

        {/* Banner */}
        <CTA onCtaClick={() => handleNavigate("pricing")} />
      </main>

      {/* Bottom Footer links & wordmark */}
      <Footer />

      {/* Ctrl + K command palette navigation overlay */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onNavigate={handleNavigate}
        onToggleTheme={toggleTheme}
        isLightTheme={isLightTheme}
      />
    </div>
  );
}

export default App;
