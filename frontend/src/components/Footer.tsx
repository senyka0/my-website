import { STORE_ADDRESS } from "../constants/index";

const Footer = ({ theme }: { theme: "light" | "dark" }) => {
  return (
    <footer
      className={
        theme === "light"
          ? "w-full bg-white text-black py-8"
          : "w-full bg-gray-900 text-white py-8"
      }
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold mb-2">
              Powered by Decentralized Technology
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs">
              <a
                href="https://base.org"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-blue-500 transition"
              >
                <span className="font-bold">⚡</span> Base Sepolia
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="https://ipfs.tech"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-blue-500 transition"
              >
                <span className="font-bold">📦</span> IPFS
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs mb-2 text-gray-500">Smart Contract</p>
            <a
              href={`https://sepolia.basescan.org/address/${STORE_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono hover:text-blue-500 transition break-all"
            >
              {STORE_ADDRESS}
            </a>
            <p className="text-xs mt-1 text-gray-500">
              <a
                href={`https://sepolia.basescan.org/address/${STORE_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500 transition"
              >
                View on Basescan →
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            All data stored on-chain and IPFS • Fully decentralized portfolio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
