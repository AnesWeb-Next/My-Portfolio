import { useEffect, useState } from "react";
import { Code, Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "../../utils/constants";
import { scrollToSection, useScrollSpy } from "../../hooks/useScrollSpy";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-1000 w-full py-4 transition-all duration-300 ${
        isScrolled ? "bg-black/30 backdrop-blur-lg" : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 text-white"
          aria-label={`${PERSONAL_INFO.name} - home`}
        >
          <Code className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-lg font-semibold">
            {PERSONAL_INFO.name.split(" ")[0]}
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`text-base font-medium transition-colors ${
                activeSection === link.id
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
              aria-current={activeSection === link.id ? "location" : undefined}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            className="rounded-full bg-primary px-5 py-2 font-semibold text-black transition-opacity hover:opacity-80"
          >
            Hire Me
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          className="text-white md:hidden"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full flex flex-col gap-4 bg-black/95 px-6 py-5 backdrop-blur-lg md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`text-left text-base font-medium transition-colors ${
                activeSection === link.id
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
              aria-current={activeSection === link.id ? "location" : undefined}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            className="self-start rounded-full bg-primary px-5 py-2 font-semibold text-black transition-opacity hover:opacity-80"
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
