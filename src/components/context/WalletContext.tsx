import React, { createContext, useState, useContext, useEffect, ReactNode  } from 'react';
import { ethers } from 'ethers';


declare let window: any;

interface WalletContextType {
  isWalletConnected: boolean;
  account: string | null;
  balance: string | null;
  network: string | null;
  connectWallet: ()=> Promise<void>;
}


const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  // connetterewallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
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

  const accountChangeHandler = async (newAccount: string) => {
    setAccount(newAccount);
     await getAccountBalance(newAccount);
    const network: string = await window.ethereum.request({ method: 'net_version' });
    setNetwork(networkFriendlyName(network));
  };

  const getAccountBalance = async (address: string) => {
    const balance: string = await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] });
    const network: string = await window.ethereum.request({ method: 'net_version' });
    const formattedBalance = ethers.utils.formatEther(balance);
    
    if (network === '137') {
      setBalance(`${formattedBalance} MATIC`);
    } else {
      setBalance(`${formattedBalance} ETH`);
    }
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
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

  const networkFriendlyName = (networkId: string) => {
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
      case '137':
        return 'Polygon Mainnet';
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

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
