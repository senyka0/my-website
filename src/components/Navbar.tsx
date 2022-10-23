import React, { MouseEventHandler, useState } from "react";
import { Link } from "react-scroll";
import Alert from "./Alert";

const Navbar = ({ theme, handleThemeSwitch }: { theme: "light" | "dark"; handleThemeSwitch: MouseEventHandler }) => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed w-full shadow-2xl ">
      <Alert theme={theme} />
      <div className={theme === "light" ? "bg-gradient-to-r from-pink-500 to-yellow-500 h-12 flex px-4" : "bg-slate-600 h-12 flex px-4"}>
        <div className="hidden md:flex items-center w-full">
          <ul className="absolute md:flex md:gap-x-5">
            <li>
              <Link className="cursor-pointer" to="home" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link className="cursor-pointer" to="about" smooth={true} duration={500}>
                About
              </Link>
            </li>
            <li>
              <Link className="cursor-pointer" to="skills" smooth={true} duration={500}>
                Skills
              </Link>
            </li>
            <li>
              <Link className="cursor-pointer" to="contact" smooth={true} duration={500}>
                Contact
              </Link>
            </li>
          </ul>
          <div className="absolute right-3">
            <button type="button" onClick={handleThemeSwitch} className=" bg-slate-700 text-lg p-1 rounded-md">
              {theme === "dark" ? "🌙" : "🌞"}
            </button>
          </div>
        </div>

        <div onClick={handleClick} className="md:hidden z-10 right-2 pt-3">
          {!nav ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
            </svg>
          )}
        </div>

        <ul className={!nav ? "hidden" : theme === "light" ? "absolute top-0 left-0 w-screen h-screen bg-gradient-to-r from-[#3378ff] to-[#9442fe] flex flex-col justify-center items-center" : "absolute top-0 left-0 w-screen h-screen bg-slate-700 flex flex-col justify-center items-center"}>
          <li className="py-6 text-4xl">
            <Link onClick={handleClick} to="home" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li className="py-6 text-4xl">
            {" "}
            <Link onClick={handleClick} to="about" smooth={true} duration={500}>
              About
            </Link>
          </li>
          <li className="py-6 text-4xl">
            {" "}
            <Link onClick={handleClick} to="skills" smooth={true} duration={500}>
              Skills
            </Link>
          </li>
          <li className="py-6 text-4xl">
            {" "}
            <Link onClick={handleClick} to="contact" smooth={true} duration={500}>
              Contact
            </Link>
          </li>
          <li>
            <button type="button" onClick={handleThemeSwitch} className="bg-transparent text-lg p-1 rounded-md">
              {theme === "dark" ? "🌙" : "🌞"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
