import React, { useMemo, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from "./App";
import "./index.css";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { 
  PuzzleWalletAdapter, 
  LeoWalletAdapter, 
  FoxWalletAdapter, 
  SoterWalletAdapter,
  AvailWalletAdapter,
  configureConnectionForPuzzle  
} from 'aleo-adapters';
import { 
  WalletAdapterNetwork,
  DecryptPermission
 } from "@demox-labs/aleo-wallet-adapter-base";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

const MainApp = () => {
  const wallets = useMemo(
    () => [
        new LeoWalletAdapter({
            appName: 'ZumpFun',
        }),
        new PuzzleWalletAdapter({
            appName: 'ZumpFun',
        }),
        new FoxWalletAdapter({
            appName: 'ZumpFun',
        }),
        new SoterWalletAdapter({
            appName: 'ZumpFun',
        }),
        new AvailWalletAdapter({
            appName: 'ZumpFun',
        })
    ],
    [],
  );

  useEffect(() => {
    configureConnectionForPuzzle({
        dAppName: 'ZumpFun',
        dAppDescription: 'Crowdfunding Example',
        dAppUrl: `http://localhost:5173/`,
        dAppIconURL: ``
    });
  }, []);

  return (
    <WalletProvider 
      network={WalletAdapterNetwork.TestnetBeta}
      decryptPermission={DecryptPermission.OnChainHistory}
      programs={['credits.aleo']}
      wallets={wallets} 
      autoConnect
    >
      <WalletModalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Router>
      </WalletModalProvider>
    </WalletProvider>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <MainApp />
    </React.StrictMode>,
  );
} else {
  throw new Error("Root element not found");
}
