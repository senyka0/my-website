# Decentralized Portfolio Website

A modern portfolio built with Next.js, TypeScript, and Tailwind CSS.  
Portfolio data is loaded from Base Sepolia and IPFS so the content source is decentralized.

## Features

- Next.js App Router frontend with reusable component structure
- Single fixed visual theme with consistent styling
- Animated modern UI using Framer Motion
- CV data fetched on-chain from `Store.cvHash()` and resolved from IPFS
- Loading skeleton, resilient retries, and error recovery UI
- Responsive sections: Hero, About, Skills, Projects, Footer

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS v4
- Framer Motion
- TanStack Query

### Blockchain

- Ethers.js
- Base Sepolia
- IPFS (Pinata gateway)
- Solidity + Hardhat

## Repository Structure

```text
my-website/
├── contracts/
│   ├── contracts/Store.sol
│   ├── scripts/deploy.ts
│   └── data/
├── frontend/
│   ├── app/
│   ├── components/
│   │   ├── sections/
│   │   └── ui/
│   ├── lib/
│   │   ├── hooks/
│   │   ├── portfolio-config.ts
│   │   └── types.ts
│   └── public/
└── README.md
```

## Local Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Contracts

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.ts --network baseSepolia
```

## Frontend Blockchain Configuration

Frontend chain/IPFS configuration lives in `frontend/lib/portfolio-config.ts`:

- `PORTFOLIO_CONTRACT_ADDRESS`
- `BASE_SEPOLIA_RPC_URL`
- `PINATA_IPFS_GATEWAY`

`frontend/lib/hooks/use-cv-data.ts`:

1. Reads `cvHash` from the deployed `Store` contract
2. Fetches `https://gateway.pinata.cloud/ipfs/{cvHash}`
3. Returns `data.cv` to the UI

## Content Updates

- Update CV JSON in `contracts/data/cv-data.json`
- Replace image/PDF in `contracts/data`
- Re-run deploy script to pin new files and update hash in contract

## Contracts Environment Variables

Create `contracts/.env`:

```bash
PRIVATE_KEY=
BASESCAN_API_KEY=
PINATA_JWT=
```
