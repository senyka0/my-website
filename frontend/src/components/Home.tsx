import React from "react";

const Home = ({ photoUrl, name, surname, position, location, theme }: { photoUrl: string | undefined; name: string | undefined; surname: string | undefined; position: string | undefined; location: string | undefined; theme: "light" | "dark" }) => {
  return (
    <div id="home" className={theme === "light" ? "p-10 pt-36 md:flex md:p-20 w-screen h-screen  md:pt-40 bg-gradient-to-r from-[#3378ff] to-[#9442fe]" : "p-10 pt-36 md:flex md:p-20 w-screen h-screen  md:pt-40 bg-slate-700"}>
      <img className="h-[200px] md:h-[600px] shadow-[#040c16] shadow-2xl" src={`https://gateway.pinata.cloud/ipfs/${photoUrl}`} alt="my piqture"></img>
      <div className="flex flex-col md:ml-10 mt-2 space-y-10">
        <h1 className="text-2xl md:text-3xl lg:text-7xl font-bold text-[#ccd6f6]">{`${name} ${surname}`}</h1>
        <h2 className="text-xl md:text-2xl lg:text-5xl font-bold text-[#ccd6f6]">{position}</h2>
        <div className="flex ">
          <svg className="h-5 w-5 md:h-10 md:w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
          </svg>
          <p className="text-xl md:text-4xl font-mono text-[#ccd6f6] ">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
