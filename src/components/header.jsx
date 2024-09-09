import React from 'react';
import './css/header.scss';
import logo from './img/logo.png';
import { FaConnectdevelop, FaEthereum } from "react-icons/fa";
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
          <h1>Shop-Name</h1>
        </div>
          <div className='connectwalleticon' onClick={connectWallet}>
            <FaConnectdevelop />
          </div>
        </>
      ) : (
        <>
        <div className='logo-name'>
          <img src={logo} alt='logo'/>
          <h1>Shop-Name</h1>
        </div>
          <div className='connectwalleticon' onClick={toggleEth}>
            <FaEthereum id="ethlogo" />
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
          <div className='address'>Address: {account}<br/>({network})</div>
          <div className='balancee'>Balance: {balance} <FaEthereum id="balance-currency"/></div>
        </div>
      )}
    </div>
  );
};

export default Header;
