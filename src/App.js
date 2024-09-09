
import Header from './components/header';
import Shop from './components/shop';
import Product from './components/Product';
import Footer from './components/footer';
import ShopContextProvider from './components/context/shopContext';
import { WalletProvider } from './components/context/WalletContext';

function App() {
  return (
    <WalletProvider>
    <ShopContextProvider>
    <Header />
    <Shop />
    <Product />
    <Footer />
    </ShopContextProvider>
    </WalletProvider>
  );
}

export default App;
