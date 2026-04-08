"use client";

import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import type { CV, CVResponse } from "@/lib/types";
import {
  BASE_SEPOLIA_RPC_URL,
  PINATA_IPFS_GATEWAY,
  PORTFOLIO_CONTRACT_ADDRESS,
  STORE_ABI,
} from "@/lib/portfolio-config";

async function fetchCVData(): Promise<CV> {
  const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC_URL);
  const contract = new ethers.Contract(
    PORTFOLIO_CONTRACT_ADDRESS,
    STORE_ABI,
    provider,
  );
  const cvHashRaw = await contract.cvHash();
  const cvHash = String(cvHashRaw).trim();

  if (!cvHash) {
    throw new Error("Contract returned an empty cvHash value.");
  }

  const response = await fetch(`${PINATA_IPFS_GATEWAY}/${cvHash}`);

  if (!response.ok) {
    throw new Error(
      `IPFS request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data: CVResponse = await response.json();

  if (!data?.cv) {
    throw new Error("Invalid payload received from IPFS.");
  }

  return data.cv;
}

export function useCVData() {
  return useQuery({
    queryKey: ["cv-data"],
    queryFn: fetchCVData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  });
}
