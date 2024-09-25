import React from 'react';
import './css/header.scss';
import logo from './img/logo.png';
import { MdCancel } from "react-icons/md";
import { useWallet } from './context/WalletContext'; 

const Header = () => {
  const { isWalletConnected, account, balance, network, connectWallet } = useWallet();
  const [isEthToggled, setIsEthToggled] = React.useState(false);

  const toggleEth = () => {
    if (isWalletConnected) {
      setIsEthToggled((prev) => !prev);
    }
  };

  return (
    <div className='header-div'>
      {!isWalletConnected ? (
        <>
          <div className='logo-name'>
          <img src={logo} alt='logo'/>
          <h1>ScienceLens</h1>
        </div>
          <div className='connectwalleticon' onClick={connectWallet}>
            Connect Wallet
          </div>
        </>
      ) : (
        <>
        <div className='logo-name'>
          <img src={logo} alt='logo'/>
          <h1>ScienceLens</h1>
        </div>
          <div className='connectwalleticon-connected' onClick={toggleEth}>
        {account && <span>{`${account.slice(0, 4)}...${account.slice(-4)}`}</span>}

          </div>
        </>
      )}

      {isEthToggled && (
        <div className="overlay" onClick={toggleEth}></div>
      )}

      {isEthToggled && (
        <div className="menu">
          <div className='cancelbutton'>
            <button onClick={toggleEth}><MdCancel /></button>
          </div>
          <div className='address'><strong>Address:</strong><br/> {account}<br/>({network})</div>
          <div className='balancee'><strong>Balance:</strong><br/> {balance}</div>
        </div>
      )}
    </div>
  );
};

export default Header;
