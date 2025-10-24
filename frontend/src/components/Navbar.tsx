import { MouseEventHandler, useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useUIStore } from "../store/useUIStore";

const Navbar = ({
  theme,
  handleThemeSwitch,
  gitHubUrl,
  linkedInUrl,
  email,
  linkCV,
}: {
  theme: "light" | "dark";
  handleThemeSwitch: MouseEventHandler;
  gitHubUrl: string | undefined;
  linkedInUrl: string | undefined;
  email: string | undefined;
  linkCV: string | undefined;
}) => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const [activeSection, setActiveSection] = useState("home");
  const handleClick = () => toggleMobileMenu();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "portfolio"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
      <div
        className={
          theme === "light"
            ? "hidden md:flex bg-slate-100 h-14 px-6 text-black rounded-full shadow-lg max-w-7xl mx-auto"
            : "hidden md:flex bg-gray-800 h-14 px-6 text-white rounded-full shadow-lg max-w-7xl mx-auto"
        }
      >
        <div className="flex items-center w-full justify-between">
          <ul className="flex gap-x-6">
            <li>
              <Link
                className={`cursor-pointer hover:text-blue-500 transition-all duration-300 px-3 py-2 rounded-full ${
                  activeSection === "home"
                    ? theme === "light"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-700 text-white"
                    : ""
                }`}
                to="home"
                smooth={true}
                duration={500}
                onSetActive={() => setActiveSection("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer hover:text-blue-500 transition-all duration-300 px-3 py-2 rounded-full ${
                  activeSection === "about"
                    ? theme === "light"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-700 text-white"
                    : ""
                }`}
                to="about"
                smooth={true}
                duration={500}
                onSetActive={() => setActiveSection("about")}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer hover:text-blue-500 transition-all duration-300 px-3 py-2 rounded-full ${
                  activeSection === "skills"
                    ? theme === "light"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-700 text-white"
                    : ""
                }`}
                to="skills"
                smooth={true}
                duration={500}
                onSetActive={() => setActiveSection("skills")}
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                className={`cursor-pointer hover:text-blue-500 transition-all duration-300 px-3 py-2 rounded-full ${
                  activeSection === "portfolio"
                    ? theme === "light"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-700 text-white"
                    : ""
                }`}
                to="portfolio"
                smooth={true}
                duration={500}
                onSetActive={() => setActiveSection("portfolio")}
              >
                Portfolio
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            {gitHubUrl && (
              <a
                href={gitHubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500 transition"
                title="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}

            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500 transition"
                title="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="hover:text-blue-500 transition"
                title="Email"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            )}

            {linkCV && (
              <a
                href={linkCV}
                target="_blank"
                rel="noreferrer"
                className={
                  theme === "light"
                    ? "px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                    : "px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                }
              >
                Download CV
              </a>
            )}

            <button
              type="button"
              onClick={handleThemeSwitch}
              className="bg-transparent text-lg p-1 rounded-md hover:scale-110 transition"
            >
              {theme === "dark" ? "🌙" : "🌞"}
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={handleClick}
        className={`md:hidden z-50 fixed top-4 right-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 ${
          theme === "light"
            ? "bg-white text-gray-800"
            : "bg-gray-800 text-white"
        }`}
      >
        {!isMobileMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-6 h-6 ${
              theme === "light" ? "text-gray-700" : "text-white"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-6 h-6 ${
              theme === "light" ? "text-gray-700" : "text-white"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>

      <ul
        className={
          !isMobileMenuOpen
            ? "hidden"
            : theme === "light"
            ? "fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex flex-col justify-center items-center backdrop-blur-sm z-40 animate-fadeIn"
            : "fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col justify-center items-center backdrop-blur-sm z-40 animate-fadeIn"
        }
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={closeMobileMenu}
            className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 ${
              theme === "light"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-6 h-6 ${
                theme === "light" ? "text-white" : "text-gray-700"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <li className="py-6 text-4xl">
          <Link
            onClick={closeMobileMenu}
            to="home"
            smooth={true}
            duration={500}
            className={`transition-all duration-300 cursor-pointer font-bold tracking-wide px-6 py-3 rounded-full ${
              activeSection === "home"
                ? theme === "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white/20 text-white"
                : theme === "light"
                ? "text-gray-800 hover:text-blue-600"
                : "text-white hover:text-blue-400"
            }`}
            onSetActive={() => setActiveSection("home")}
          >
            Home
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link
            onClick={closeMobileMenu}
            to="about"
            smooth={true}
            duration={500}
            className={`transition-all duration-300 cursor-pointer font-bold tracking-wide px-6 py-3 rounded-full ${
              activeSection === "about"
                ? theme === "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white/20 text-white"
                : theme === "light"
                ? "text-gray-800 hover:text-blue-600"
                : "text-white hover:text-blue-400"
            }`}
            onSetActive={() => setActiveSection("about")}
          >
            About
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link
            onClick={closeMobileMenu}
            to="skills"
            smooth={true}
            duration={500}
            className={`transition-all duration-300 cursor-pointer font-bold tracking-wide px-6 py-3 rounded-full ${
              activeSection === "skills"
                ? theme === "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white/20 text-white"
                : theme === "light"
                ? "text-gray-800 hover:text-blue-600"
                : "text-white hover:text-blue-400"
            }`}
            onSetActive={() => setActiveSection("skills")}
          >
            Skills
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link
            onClick={closeMobileMenu}
            to="portfolio"
            smooth={true}
            duration={500}
            className={`transition-all duration-300 cursor-pointer font-bold tracking-wide px-6 py-3 rounded-full ${
              activeSection === "portfolio"
                ? theme === "light"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white/20 text-white"
                : theme === "light"
                ? "text-gray-800 hover:text-blue-600"
                : "text-white hover:text-blue-400"
            }`}
            onSetActive={() => setActiveSection("portfolio")}
          >
            Portfolio
          </Link>
        </li>

        <div className="flex gap-6 py-6">
          {gitHubUrl && (
            <a
              href={gitHubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-all transform hover:scale-110 duration-200"
              title="GitHub"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}

          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-all transform hover:scale-110 duration-200"
              title="LinkedIn"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="hover:text-blue-600 transition-all transform hover:scale-110 duration-200"
              title="Email"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          )}
        </div>

        {linkCV && (
          <li className="py-6">
            <a
              href={linkCV}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-xl font-semibold text-lg hover:scale-105 transform"
            >
              Download CV
            </a>
          </li>
        )}

        <li className="mt-4">
          <button
            type="button"
            onClick={handleThemeSwitch}
            className="text-4xl p-2 rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-110 transform"
          >
            {theme === "dark" ? "🌙" : "🌞"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
