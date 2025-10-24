import "./App.css";
import React from "react";
import { useThemeStore } from "./store/useThemeStore";
import { usePortfolioData } from "./hooks/useCVData";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";

const App = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { data: resume, isLoading, isError, error } = usePortfolioData();

  const handleThemeSwitch = (): void => {
    toggleTheme();
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Portfolio</h1>
          <p className="text-xl mb-4">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white font-medium overflow-x-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar
            theme={theme}
            handleThemeSwitch={handleThemeSwitch}
            gitHubUrl={resume?.gitHubUrl}
            linkedInUrl={resume?.linkedInUrl}
            email={resume?.email}
            linkCV={resume?.linkCV}
          />
          <Home
            theme={theme}
            photoUrl={resume?.photoUrl}
            name={resume?.name}
            surname={resume?.surname}
            position={resume?.position}
            location={resume?.location}
          />
          <About theme={theme} name={resume?.name} bio={resume?.bio} />
          <Skills theme={theme} skills={resume?.skills} />
          <Portfolio theme={theme} projects={resume?.projects} />
          <Footer theme={theme} />
        </>
      )}
    </div>
  );
};

export default App;
