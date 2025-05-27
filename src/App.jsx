import { Route, Routes } from "react-router-dom";
import { StoreProvider } from "./components/store/storeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Welcome from "./components/pages/frontend/partials2/Welcome";
import Homepage from "./components/pages/frontend/home/Homepage";
import { useState } from "react";
import Productss from "./components/pages/frontend/home/Productss";
import About from "./components/pages/frontend/home/About";
import { AuthProvider } from "./context/AuthContext";
import Cart from "./components/pages/frontend/home/Cart";
import Cashout from "./components/pages/frontend/home/Cashout";
// import Confirmation from "./components/pages/frontend/home/Confirmation";
import Trade from './components/pages/frontend/Trades/Trade'; // ✅ Correct for default export
import Donate from "./components/pages/frontend/Donation/Donate";
import Login from "./components/pages/frontend/authentication/Login";
import Register from "./components/pages/frontend/authentication/Register";
import SellerPage from "./components/pages/frontend/sellerInterface/SellerPage";
import BuyerPage from "./components/pages/frontend/buyerInterface/BuyerPage";
import UserInterface from "./components/pages/frontend/buyerInterface/UserInterface";
import AdminInterface from "./components/pages/frontend/sellerInterface/AdminInterface";
import AddProduct from "./components/pages/frontend/sellerInterface/AddProduct";
import MyProducts from "./components/pages/frontend/sellerInterface/MyProduct";
import ManageOrders from "./components/pages/frontend/sellerInterface/ManageOrders";
import DonationsManagement from "./components/pages/frontend/sellerInterface/DonationManagement";
import SellerProfile from "./components/pages/frontend/sellerInterface/SellerProfile";
import SellerLayout from "./components/layout.jsx/SellerLayout";
import EditProduct from "./components/pages/frontend/sellerInterface/EditProduct";
import ProductDashboard from "./components/pages/frontend/sellerInterface/ProductDashboard";
import TradeOffers from "./components/pages/frontend/sellerInterface/TradeOffers";
import UploadDonationForm from "./components/pages/frontend/Trades/UploadDonationForm";
import { Toaster } from 'react-hot-toast';
import CashoutTrade from "./components/pages/frontend/Trades/CashoutTrade";
import OrderDetails from "./components/pages/frontend/buyerInterface/OrderDetails.jsx";
import { CartProvider } from "./components/context/CartContext";
import ViewDonation from "./components/pages/frontend/Donation/ViewDonation";
import AddDonationListing from "./components/pages/frontend/Donation/AddDonationListing";
import Donation from "./components/pages/frontend/Donation/Donation";
import DonateTransaction from "./components/pages/frontend/Donation/DonateTransaction";
import TradeCart from "./components/pages/frontend/Trades/TradeCart";
import Confirmation from "./components/pages/frontend/Donation/Confirmation";
import Inventory from "./components/pages/frontend/sellerInterface/Inventory";
import TradePage from "./components/pages/frontend/Trades/TradePage";
import AddTrade from "./components/pages/frontend/Trades/AddTrade";
import ProductList from "./components/pages/frontend/Trades/ProductList";
import TradeList from "./components/pages/frontend/Trades/TradeList";
import ProductUpload from "./components/pages/frontend/Trades/ProductUpload";
import TradeCheckout from "./components/pages/frontend/Trades/TradeCheckout";
import TradeConfirmation from "./components/pages/frontend/Trades/TradeConfirmation";

const App = () => {
  const [cart, setCart] = useState([]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StoreProvider>
          {/* Move CartProvider here to wrap all routes */}
          <CartProvider>
            <Toaster position="top-right" />
            <Routes>
              <Route index element={<Welcome />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/home/about" element={<About />} />
              <Route path="/home/products" element={<Productss />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cashout" element={<Cashout />} />
              

              {/* authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* buyer-interface */}
              <Route path="/buyerpage" element={<BuyerPage />} />
              <Route path="/userinterface" element={<UserInterface />} />
              <Route path="/tradecart" element={<TradeCart />} />
              <Route path="/donationform" element={<UploadDonationForm />} />
              <Route path="/cashout-trade" element={<CashoutTrade />} />
              <Route path="/viewdonations" element={<ViewDonation />} />
              <Route path="/donate/add" element={<AddDonationListing />} />
              <Route path="/donation-transaction" element={<Donation />} />
              <Route path="/donatetransaction" element={<DonateTransaction />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/tradepage" element={<TradePage />} />
              <Route path="/addtrade" element={<AddTrade />} />
              <Route path="/productlist" element={<ProductList />} />
              <Route path="/tradelist" element={<TradeList />} />
              <Route path="/product-upload" element={<ProductUpload />} />
              <Route path="/trade-checkout" element={<TradeCheckout />} />
              <Route path="/trade-confirmation" element={<TradeConfirmation />} />

              
              {/* seller-interface */}
              <Route path="/sellerpage" element={<SellerPage />} />
              <Route path="/admininterface" element={<AdminInterface />} />
              <Route path="/sellerlayout" element={<SellerLayout />} />

              {/* Seller Side Routes */}
              <Route path="/seller/add-product" element={<AddProduct />} />
              <Route path="/seller/edit-product/:id" element={<EditProduct />} />
              <Route path="/seller/my-products" element={<MyProducts />} />
              <Route path="/seller/manage-orders" element={<ManageOrders />} />
              <Route path="/seller/donations" element={<DonationsManagement />} />
              <Route path="/seller/profile" element={<SellerProfile />} />
              <Route path="/product-dashboard" element={<ProductDashboard />} />
              <Route path="/trade-product" element={<TradeOffers />} />
              <Route path="/seller/inventory" element={<Inventory cart={cart} setCart={setCart} />} />
            </Routes>
          </CartProvider>
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

