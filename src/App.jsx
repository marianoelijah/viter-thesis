import { Route, Routes } from "react-router-dom";
import { StoreProvider } from "./components/store/storeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Welcome from "./components/pages/frontend/partials2/Welcome";
import Homepage from "./components/pages/frontend/home/Homepage";
import Inventory from "./components/pages/frontend/home/Inventory";
import { useState } from "react";
import Productss from "./components/pages/frontend/home/Productss";
import About from "./components/pages/frontend/home/About";
import { AuthProvider } from "./context/AuthContext";
import Cart from "./components/pages/frontend/home/Cart";
import Cashout from "./components/pages/frontend/home/Cashout";
import Confirmation from "./components/pages/frontend/home/Confirmation";
import Type from "./components/pages/frontend/home/Type";
import Orders from "./components/pages/frontend/home/Orders";
import MatchingTrades from "./components/pages/frontend/Trades/MatchingTrades";
import Trade from './components/pages/frontend/Trades/Trade'; // ✅ Correct for default export
import Donate from "./components/pages/frontend/Trades/Donate";
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
import Cashout2 from "./components/pages/frontend/Trades/Cashout2"
import TradeCart from "./components/pages/frontend/Trades/TradeCart";
import UploadDonationForm from "./components/pages/frontend/Trades/UploadDonationForm";



const App = () => {
  const [cart, setCart] = useState([]);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StoreProvider>
        
          <Routes>
            <Route index element={<Welcome />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/home/about" element={<About />} />
            <Route path="/home/products" element={<Productss />} />
            <Route path="/home/trade" element={<Trade />} />
            <Route path="/home/donate" element={<Donate />} />
            <Route path="/inventory" element={<Inventory cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cashout" element={<Cashout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/type" element={<Type />} />
            <Route path="/matching-trades" element={<MatchingTrades />} />

            {/* authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* buyer-interface */}
            <Route path="/buyerpage" element={<BuyerPage />} />
            <Route path="/userinterface" element={<UserInterface />} />
            <Route path="/cashout2" element={<Cashout2 />} />
            <Route path="/tradecart" element={<TradeCart />} />
            <Route path="/donationform" element={<UploadDonationForm />} />


            {/* seler-interface */}
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

           
            
          </Routes>
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
