import React from "react";

const Skills = ({ skills, theme }: { skills: string[] | undefined; theme: "light" | "dark" }) => {
  return (
    <div id="skills" className={theme === "light" ? "w-screen h-screen  bg-gradient-to-r from-[#3378ff] to-[#9442fe] pt-40 text-gray-300" : "w-screen h-screen bg-slate-700 pt-52 text-gray-300"}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8 px-10">
        {skills?.map((item) => {
          return (
            <div className="shadow-md shadow-[#040c16] hover:scale-105 duration-500 py-4" key={`${item}`}>
              <img className="w-16 mx-auto" src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item}/${item}-original.svg`} alt="logo" />
              <p className="my-3">{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
