export const PORTFOLIO_CONTRACT_ADDRESS = '0x67FF955A5c72800Fa56583938FD4343e0911301A';
export const BASE_SEPOLIA_RPC_URL = 'https://sepolia.base.org';
export const PINATA_IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs';

export const STORE_ABI = [
  {
    inputs: [],
    name: 'cvHash',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function buildIpfsUrl(hashOrUrl: string): string {
  if (!hashOrUrl) {
    return '';
  }

  if (hashOrUrl.startsWith('http')) {
    return hashOrUrl;
  }

  return `${PINATA_IPFS_GATEWAY}/${hashOrUrl}`;
}
