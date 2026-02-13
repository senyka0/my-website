import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import axios from "axios";
import { CV } from "../models";
import { STORE_ADDRESS } from "../constants";
import storeAbi from "../constants/abis/Store.json";

export const usePortfolioData = () => {
  return useQuery<CV, Error, CV, string[]>({
    queryKey: ["portfolio-cv-data"],
    queryFn: async () => {
      const provider = new ethers.providers.JsonRpcBatchProvider(
        "https://sepolia.base.org"
      );
      const contract = new ethers.Contract(
        STORE_ADDRESS,
        storeAbi.abi,
        provider
      );
      const hash = await contract.cvHash();
      const response = await axios.get(
        `https://gateway.pinata.cloud/ipfs/${hash}`
      );
      return response.data.cv;
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  });
};
