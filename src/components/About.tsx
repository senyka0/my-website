import React from "react";
import { CV } from "../models";

const About = ({ name, bio, theme }: { name: string | undefined; bio: string | undefined; theme: "light" | "dark" }) => {
  return (
    <div id="about" className={theme === "light" ? "w-screen h-screen bg-gradient-to-r from-[#3378ff] to-[#9442fe] pt-32 text-gray-300" : "w-screen h-screen bg-slate-700 pt-32 text-gray-300"}>
      <div className="ml-10 w-3/4 md:ml-20 mt-24 md:w-2/4">
        <div className="text-2xl md:text-6xl font-bold">Hi! My name is {name}.</div>
        <div className="text-xl mt-5 md:text-4xl font-bold">{bio}</div>
      </div>
    </div>
  );
};

export default About;
