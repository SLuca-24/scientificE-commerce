import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

// Crea il contesto
const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);

  // Funzioni per connettere e gestire il wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Account succesfully connected:', accounts[0]);
        await accountChangeHandler(accounts[0]);
        setIsWalletConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("You need to install an Ethereum wallet");
    }
  };

  const accountChangeHandler = async (newAccount) => {
    setAccount(newAccount);
     await getAccountBalance(newAccount);
    const network = await window.ethereum.request({ method: 'net_version' });
    setNetwork(networkFriendlyName(network));
  };

  const getAccountBalance = async (address) => {
    const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] });
    setBalance(ethers.utils.formatEther(balance));
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          accountChangeHandler(accounts[0]);
          window.location.reload();
        } else {
          setIsWalletConnected(false);
          setAccount(null);
          setBalance(null);
        }
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', chainChangedHandler);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', chainChangedHandler);
      };
    }
  }, []);

  const networkFriendlyName = (networkId) => {
    switch (networkId) {
      case '1':
        return 'Ethereum Mainnet';
      case '3':
        return 'Ropsten Test Network';
      case '4':
        return 'Rinkeby Test Network';
      case '5':
        return 'Goerli Test Network';
      case '42':
        return 'Kovan Test Network';
      case '11155111':
        return 'Sepolia Test Network';
      default:
        return 'Unknown Network';
    }
  };

  return (
    <WalletContext.Provider value={{ isWalletConnected, account, balance, network, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
