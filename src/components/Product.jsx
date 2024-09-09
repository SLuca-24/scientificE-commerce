import React, { useState, useContext } from 'react'
import './css/buy.scss'
import { MdCancel } from "react-icons/md";
import { ShopContext } from './context/shopContext';
import { useWallet } from './context/WalletContext';
import { ethers } from 'ethers';
import { BiBadgeCheck } from "react-icons/bi";







const Product = (props) => {

  const { addToCart} = useContext(ShopContext)
  const [isCarted, setIsCarted] = useState(false);
  const {isWalletConnected, account, balance}= useWallet();
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const  [etherScanLink, setEtherScanLink] = useState('');
  const [isTransactionLoading, setIsTransactionLoading] = useState(false)

  if (!props.data) {
    return <div></div>;
  }

  const handleBuy = () => {
    if (!isWalletConnected){
   alert("you need to connect your wallet first")
    } else {
      addToCart(id);
      setIsCarted(true);
    }

  };


const x = () => {
    setIsCarted(false);
}

const {id, productName, price, productImage} = props.data

const isBalanceEnought = () => {
  if(balance >= price){
    return <button style={{backgroundColor: '#4CAF50'}} onClick={transaction}>Submit transaction</button>
  } else {
    return <button style={{backgroundColor: '#d32f2f'}}>You do not have enough ETH</button>
  }
}


//transaction 

const ownerAddress = '0xF1cdf08ED6Bfdf845AaD575B08bE1c56E5128a25';



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
  setEtherScanLink(`https://etherscan.io/tx/${transactionHash}`)
} catch (error){
  console.log('transaction error:', error)
  setIsTransactionLoading(false)
}
}

const paymentCompleted = () => {
  setTransactionCompleted(false)
  setIsCarted(false);
}



const max = 100000;
const orderNumber = Math.floor(Math.random() * max)

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
            <div className="popup-overlay"></div>
            <div className='buy-container'>
            <div><MdCancel className='x' onClick={x}/></div>
             <div className='cart'>
             <img src={productImage} alt={productName} className='cartimg'/>

             <div class="info-item account">
             <label>Your Account:</label>
             <span>{account}</span>
             </div>

             <div class="info-item balance">
             <label>Your Balance:</label>
             <span>{balance} ETH</span>
             </div>

             <div class="info-item amount">
             <label>Amount Requested:</label>
             <span>{price} ETH</span>
             </div>

             <>{isBalanceEnought()}</>
             </div>
            </div>

        { isTransactionLoading &&(
           <div className="loading-spinner">
           <p>Processing transaction...</p>
           <div className="spinner"></div>
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
