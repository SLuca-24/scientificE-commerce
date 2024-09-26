
import Header from './components/pages/header';
import Shop from './components/pages/shop';
import Product from './components/pages/Product';
import Footer from './components/pages/footer';
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
