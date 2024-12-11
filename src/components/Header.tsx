// src/components/Header.tsx
import './Header.css';
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';

function Header() {
  return (
    <div className="header">
         <div style={{minWidth: "150px"}}></div>
    <div className="header-right">
      <div className="user-info-dropdown">
        <WalletMultiButton />
      </div>
    </div>
   </div>
  );
}

export default Header;
