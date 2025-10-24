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

## 🎯 Key Components

### **State Management Architecture**

#### **Zustand Stores**

- **Theme Store**: Manages light/dark theme with localStorage persistence
- **UI Store**: Handles mobile menu state and UI interactions

#### **React Query Hooks**

- **usePortfolioData**: Fetches CV data from blockchain and IPFS
- **Automatic Caching**: 30-minute stale time, 1-hour garbage collection
- **Retry Logic**: 3 attempts with exponential backoff

### **Component Structure**

- **App.tsx**: Main application with error boundaries
- **Navbar.tsx**: Responsive navigation with active section indicators
- **Loader.tsx**: Theme-aware loading screen
- **Home.tsx**: Hero section with personal information
- **About.tsx**: Bio and personal description
- **Skills.tsx**: Technical skills showcase
- **Portfolio.tsx**: Project gallery
- **Footer.tsx**: Blockchain information and links

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

## 📱 Responsive Design

### **Breakpoints**

- **Mobile**: < 768px (hidden navbar, mobile menu)
- **Tablet**: 768px - 1024px (responsive layout)
- **Desktop**: > 1024px (full navigation)

### **Mobile Features**

- **Clean Interface**: No top navbar clutter
- **Floating Menu Button**: Prominent white/dark circle
- **Full-Screen Navigation**: Immersive mobile experience
- **Touch Optimized**: Large touch targets and smooth animations

## 🎨 Styling

### **Tailwind CSS Classes**

- **Utility First**: Rapid development with utility classes
- **Custom Animations**: Fade-in effects and smooth transitions
- **Theme Variables**: Consistent color scheme across components
- **Responsive Design**: Mobile-first approach with breakpoint utilities

### **Custom CSS**

- **Scrollbar Hiding**: Cross-browser scrollbar removal
- **Custom Animations**: Fade-in and scale effects
- **Theme Transitions**: Smooth color transitions

## 🚀 Deployment

### **GitHub Pages**

```bash
npm run build
npm run deploy
```

### **Other Platforms**

- **Vercel**: Connect GitHub repository
- **Netlify**: Drag and drop build folder
- **AWS S3**: Upload build folder to S3 bucket

## 🔍 Performance

### **Optimizations**

- **Code Splitting**: Automatic with Create React App
- **Image Optimization**: Optimized images and lazy loading
- **Bundle Analysis**: `npm run build` shows bundle sizes
- **Caching**: React Query provides intelligent caching

### **Bundle Size**

- **JavaScript**: ~175 KB (gzipped)
- **CSS**: ~4.6 KB (gzipped)
- **Total**: Optimized for fast loading

## 🛡️ Security

### **Best Practices**

- **TypeScript**: Compile-time type checking
- **ESLint**: Code quality and security linting
- **Dependency Scanning**: Regular security updates
- **HTTPS**: Secure data transmission

## 🤝 Contributing

### **Development Workflow**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### **Code Standards**

- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow configured linting rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Clear commit messages

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - Amazing framework
- **Tailwind CSS** - Utility-first CSS framework
- **Ethers.js** - Ethereum library
- **IPFS** - Decentralized storage
- **Base Network** - Fast and cheap transactions

## 📞 Contact

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- **Email**: your.email@example.com

---

**Built with ❤️ using React, TypeScript, and Web3 technologies**
