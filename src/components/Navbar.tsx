import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Search } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onToggleTheme: () => void;
  isLightTheme: boolean;
  onOpenPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onToggleTheme,
  isLightTheme,
  onOpenPalette,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", id: "features" },
    { label: "Workflow Builder", id: "workflow" },
    { label: "Solutions", id: "solutions" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-primary/80 backdrop-blur-md border-b border-border-primary py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("home");
          }}
          className="flex items-center gap-2.5 group"
        >
          <img
            src="/logo.png"
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-200"
            alt="Nexora Logo"
          />
          <span className="font-jetbrains text-2xl font-bold tracking-tight text-text-primary">
            NEXORA<span className="text-forsythia-yellow">.AI</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className="text-sm font-medium text-text-secondary hover:text-forsythia-yellow transition-colors duration-200 relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-forsythia-yellow transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Desktop Toolbar (Search, Theme, CTAs) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-primary bg-nocturnal-expedition/5 text-text-secondary/50 hover:text-text-primary text-xs hover:border-forsythia-yellow transition-all duration-200 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-nocturnal-expedition/15 text-[9px] font-jetbrains text-text-secondary/60">
              Ctrl+K
            </kbd>
          </button>

          {/* Theme Selector */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-border-primary hover:border-forsythia-yellow hover:text-forsythia-yellow text-text-secondary transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isLightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleLinkClick("pricing")}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-forsythia-yellow to-deep-saffron text-oceanic-noir text-sm font-semibold hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(255,200,1,0.2)] hover:shadow-[0_0_25px_rgba(255,200,1,0.4)] cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger & Toolbar Trigger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg border border-border-primary text-text-secondary cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isLightTheme ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-text-primary hover:text-forsythia-yellow transition-colors duration-200 focus:outline-none p-1 cursor-pointer"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel (Conditionally rendered to prevent visual overlapping) */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[73px] bg-bg-primary/95 backdrop-blur-lg z-30 border-t border-border-primary md:hidden"
        >
          <div className="flex flex-col h-full p-8 gap-6">
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenPalette();
              }}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-border-primary bg-nocturnal-expedition/5 text-text-secondary/60 text-sm"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search commands...
              </span>
              <kbd className="px-2 py-0.5 rounded bg-nocturnal-expedition/20 text-xs font-jetbrains">
                Ctrl+K
              </kbd>
            </button>

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="text-xl font-medium text-text-primary hover:text-forsythia-yellow transition-colors duration-200 py-2 border-b border-border-primary/5"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={() => handleLinkClick("pricing")}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-forsythia-yellow to-deep-saffron text-oceanic-noir text-center font-bold hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(255,200,1,0.2)]"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
