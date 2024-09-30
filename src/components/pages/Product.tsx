import React, { FC, useState, useContext } from 'react'
import '../css/buy.scss'
import { MdCancel } from "react-icons/md";
import { useShopContext } from '../context/shopContext';
import { useWallet } from '../context/WalletContext';
import { ethers } from 'ethers';
import { BiBadgeCheck } from "react-icons/bi";


declare let window: any;

interface ProductProps {
  data: {
    id: number;
    productName: string;
    price: number;
    productImage: string;
  };
}


const Product: FC<ProductProps> = (props) => {

// se metto il props destructor come prima cosa ricevo errore: React Hook "tutti i react hook" is called conditionally. React Hooks must be called in the exact same order in every component render
  const { addToCart} = useShopContext();
  const [isCarted, setIsCarted] = useState<boolean>(false);
  const {isWalletConnected, account, balance, network}= useWallet();
  const [transactionCompleted, setTransactionCompleted] = useState<boolean>(false);
  const [etherScanLink, setEtherScanLink] = useState<string>('');
  const [isTransactionLoading, setIsTransactionLoading] = useState<boolean>(false);

  if (!props.data) {
    return <div></div>; //se levo il controllo ricevo questo errore: Cannot destructure property 'id' of 'props.data' as it is undefined.
  }

  const {id, productName, price, productImage} = props.data;

  const ownerAddress = '0xF1cdf08ED6Bfdf845AaD575B08bE1c56E5128a25';
  const balanceNumber = balance ? parseFloat(balance) : 0;
  const max = 100000;
  const orderNumber = Math.floor(Math.random() * max)



  const handleBuy = () => {
    if (!isWalletConnected){
   alert("you need to connect your wallet first")
    } else {
      addToCart(id);
      setIsCarted(true);
    }

  };


const cancel = () => {
    setIsCarted(false);
}


const isBalanceEnough = () => {
  if(balanceNumber >= price){
    return <button style={{backgroundColor: '#4CAF50'}} onClick={transaction}>Submit transaction</button>
  } else {
    return <button style={{backgroundColor: '#d32f2f', pointerEvents: 'none'}}>You do not have enough ETH</button>
  }
}


const transaction = async() => {

try{
  setIsTransactionLoading(true)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const tx = await signer.sendTransaction({
    to: ownerAddress,
    value: ethers.utils.parseEther(price.toString()),
  })
  await tx.wait()
  console.log(tx)
  setIsTransactionLoading(false)
  setTransactionCompleted(true)
  const transactionHash = tx.hash;
  console.log('Transaction hash:', transactionHash);

  const networkName = handleNetworkName();
  setEtherScanLink(`https://${networkName}.etherscan.io/tx/${transactionHash}`)
  console.log('Transcation made on:',{networkName})
} catch (error){
  console.log('transaction error:', error)
  setIsTransactionLoading(false)
}
}

const paymentCompleted = () => {
  setTransactionCompleted(false)
  setIsCarted(false);
}


const handleNetworkName = () => {
  if (!network){
    return 'unknown';
  }
  const networkMap: { [key: string]: string } = {
    'Sepolia Test Network': 'sepolia',
    'Ethereum Mainnet': 'ethereum',
    'Ropsten Test Network': 'ropsten',
    'Rinkeby Test Network': 'rinkeby',
    'Goerli Test Network': 'goerli',
    'Kovan Test Network': 'kovan'
  };

  return networkMap[network] || 'Unknown';
};





  return (
    <>
    <div className='product'>
      <img src={productImage} alt={productName} />
      <div className='description'>
        <p>
            <b>{productName}</b>
        </p>
        <p>
        {price} ETH
        </p>
      </div>
      <button className='buybtn' onClick={handleBuy}>Buy</button>
    </div>

    {isCarted && (
        <>
            <div className="buy-overlay"></div>
            <div className='buy-container'>
            <div><MdCancel className='x' onClick={cancel}/></div>
             <div className='cart'>
             <img src={productImage} alt={productName} className='cartimg'/>

             <div className="info-item account">
             <label>Your Account:</label>
             <span>{account}</span>
             </div>

             <div className="info-item balance">
             <label>Your Balance:</label>
             <span>{balance} ETH</span>
             </div>

             <div className="info-item amount">
             <label>Amount Requested:</label>
             <span>{price} ETH</span>
             </div>

             <>{isBalanceEnough()}</>
             </div>
            </div>

        { isTransactionLoading &&(
           <div className="loading-spinner">
           <div className="spinner"></div>
           <p className='waiting-p'>it may take up to 2 minutes</p>
         </div>
        )}





        { transactionCompleted &&(
                  <div className="success-screen1">
                  <div className="success-content1">
                    <div className="success-icon1"><BiBadgeCheck /></div>
                    <h2 className="success-message1">Transaction succesfully completed!</h2>
                    <div className='orderSubmitted'>Order number #{orderNumber}</div>
                    <a className='success-message-p1' href={etherScanLink} target="_blank">view transaction on etherscan</a>
                    <a className='cancelSubmit1' onClick={paymentCompleted}><MdCancel /></a>
                  </div>
                </div>
        )}
        </>
    )}
    </>
  )
}

export default Product
