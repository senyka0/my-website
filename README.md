# 🌐 Decentralized Portfolio Website

A modern, fully decentralized portfolio website built with React, TypeScript, and blockchain technology. This portfolio showcases your professional information stored on-chain and served via IPFS, demonstrating the power of Web3 technologies.

## ✨ Features

### 🎨 **Modern UI/UX**

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark/Light Theme**: Persistent theme switching with localStorage
- **Smooth Animations**: CSS transitions and React Query loading states
- **Active Section Indicators**: Visual feedback for current page section
- **Mobile-First Navigation**: Clean mobile menu with theme-aware styling

### 🔗 **Blockchain Integration**

- **Smart Contract Storage**: CV data stored on Base Sepolia testnet
- **IPFS Integration**: Decentralized file storage for images and documents
- **Real-time Data**: Automatic fetching from blockchain and IPFS
- **Error Handling**: Graceful fallbacks and retry mechanisms

### 🏗️ **State Management**

- **Zustand**: Lightweight global state for theme and UI
- **React Query**: Server state management with caching and retries
- **TypeScript**: Full type safety throughout the application

## 🚀 Tech Stack

### **Frontend**

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **React Scroll** - Smooth scrolling navigation

### **Blockchain**

- **Ethers.js** - Ethereum library for contract interactions
- **Base Sepolia** - Testnet for smart contract deployment
- **IPFS** - Decentralized file storage

### **Development**

- **Create React App** - Development environment
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitHub Pages** - Deployment

## 📁 Project Structure

```
my-website/
├── contracts/                 # Smart contracts
│   ├── contracts/Store.sol    # CV storage contract
│   ├── scripts/deploy.ts      # Deployment script
│   └── data/                  # CV data and assets
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   ├── store/             # Zustand stores
│   │   ├── providers/         # React providers
│   │   └── constants/         # App constants
│   └── public/                # Static assets
└── README.md
```

## 🛠️ Installation & Setup

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn
- Git

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/my-website.git
cd my-website
```

### **2. Install Dependencies**

#### **Frontend**

```bash
cd frontend
npm install
```

#### **Smart Contracts**

```bash
cd contracts
npm install
```

### **3. Environment Setup**

#### **Frontend Configuration**

The frontend is configured to connect to:

- **Blockchain**: Base Sepolia testnet
- **Contract Address**: `0xA3528758897EC8194E75104b78e8942Cb2Bf1Dd4`
- **IPFS Gateway**: `https://gateway.pinata.cloud/ipfs/`

#### **Smart Contract Deployment**

```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.ts --network baseSepolia
```

## 🚀 Development

### **Start Development Server**

```bash
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### **Build for Production**

```bash
cd frontend
npm run build
```

### **Deploy to GitHub Pages**

```bash
cd frontend
npm run deploy
```

## 🔧 Configuration

### **Smart Contract Address**

Update the contract address in `frontend/src/constants/index.ts`:

```typescript
export const STORE_ADDRESS = "0xYourContractAddress";
```

### **Theme Customization**

Modify theme colors in `frontend/src/store/useThemeStore.ts`:

```typescript
// Add custom theme colors
const customThemes = {
  light: { primary: "#your-color" },
  dark: { primary: "#your-color" },
};
```

### **IPFS Configuration**

Update IPFS gateway in `frontend/src/hooks/useCVData.ts`:

```typescript
const response = await axios.get(`https://your-ipfs-gateway.com/ipfs/${hash}`);
```

### **CV Configuration**

Update your own data in `contracts/data/cv-data.json`.

Replace CV pdf and picture with your own files in the `contracts/data` directory.

Create a `.env` file in the `contracts` directory with the following environment variables:

```
PRIVATE_KEY=
BASESCAN_API_KEY=
PINATA_JWT=
```
