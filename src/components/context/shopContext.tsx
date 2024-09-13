import React, {FC, createContext, useState, useContext, ReactNode } from 'react'
import { PRODUCTS } from '../../products';


interface ShopContextValue {
  cartItems: { [key: number]: number };
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
}


export const ShopContext = createContext<ShopContextValue | undefined >(undefined);


const getDefaultCart = (): { [key: number]: number } => {
    let cart: { [key: number]: number } = {};
    for (let i = 1; i <= PRODUCTS.length; i++) {
        cart[i] = 0;
    }
    return cart
};


interface ShopContextProviderProps {
  children: ReactNode;
}


const ShopContextProvider:FC<ShopContextProviderProps> = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    

    const addToCart = (itemId: number) => {

  setCartItems((prev) => ({
    ...prev,
    [itemId]: (prev[itemId] || 0) + 1}))
        
      }

      const removeFromCart = (itemId:number) => {
        setCartItems((prev) => ({
          ...prev,
          [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
        }));
      };

    const contextValue: ShopContextValue = { cartItems, addToCart, removeFromCart };
    
  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;


export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShopContext must be used within a ShopContextProvider');
  }
  return context;
};