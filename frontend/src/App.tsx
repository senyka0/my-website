import "./App.css";
import { ethers } from "ethers";
import { CV } from "./models";
import React, { useEffect, useState } from "react";
import axios from "axios";
import store from "./constants/abis/Store.json";
import { STORE_ADDRESS } from "./constants/index";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState<Boolean>(true);
  const [resume, setResume] = useState<CV | undefined>(undefined);
  useEffect(() => {
    fetchCV();
  }, []);
  const fetchCV = async (): Promise<void> => {
    const provider = new ethers.providers.JsonRpcBatchProvider("https://goerli.infura.io/v3/c0c87d279cb240ff8036c2f999a0ce14");
    const contract = new ethers.Contract(STORE_ADDRESS, store.abi, provider);
    const hash = await contract.cvHash();
    const cv = await axios.get(`https://gateway.pinata.cloud/ipfs/${hash}`);
    setResume(cv.data.cv);
    setLoading(false);
  };
  const handleThemeSwitch = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="text-white font-medium">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar theme={theme} handleThemeSwitch={handleThemeSwitch} />
          <Home theme={theme} photoUrl={resume?.photoUrl} name={resume?.name} surname={resume?.surname} position={resume?.position} location={resume?.location} />
          <About theme={theme} name={resume?.name} bio={resume?.bio} />
          <Skills theme={theme} skills={resume?.skills} />
          <Contact theme={theme} gitHubUrl={resume?.gitHubUrl} linkedInUrl={resume?.linkedInUrl} email={resume?.email} linkCV={resume?.linkCV} />
        </>
      )}
    </div>
  );
};

export default App;
