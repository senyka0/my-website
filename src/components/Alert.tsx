import React, { useState } from "react";

const Alert = ({theme}: {theme: "light" | "dark"}) => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && (
        <div className={theme === "light" ? "relative bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 pr-14" : "relative bg-slate-500 px-4 py-3 pr-14"}>
          <p className="text-left text-sm font-medium sm:text-center">
            Fit for your job? Contact with me!
            <a className="underline" target="_blank" rel="noreferrer" href="https://t.me/senyka0">
              {" "}
              Telegram &rarr;{" "}
            </a>
          </p>

          <button onClick={() => setShow(false)} aria-label="Close" className="absolute top-1/2 right-4 -translate-y-1/2 rounded-lg bg-black/10 p-1 transition hover:bg-black/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Alert;
