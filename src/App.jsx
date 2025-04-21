import { Route, Routes } from "react-router-dom";
import { StoreProvider } from "./components/store/storeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Welcome from "./components/pages/frontend/partials2/Welcome";
import Homepage from "./components/pages/frontend/home/Homepage";
import Inventory from "./components/pages/frontend/home/Inventory";
import { useState } from "react";
import Productss from "./components/pages/frontend/home/Productss";
import Login2 from "./components/pages/frontend/partials2/Login2";
import LoginRegister from "./components/pages/Auth/LoginRegister";
import AuthLogin from "./components/pages/Auth/AuthLogin";
import About from "./components/pages/frontend/home/About";
import { AuthProvider } from "./context/AuthContext";
import Cart from "./components/pages/frontend/home/Cart";
import Cashout from "./components/pages/frontend/home/Cashout";
import Confirmation from "./components/pages/frontend/home/Confirmation";
import Type from "./components/pages/frontend/home/Type";
import Orders from "./components/pages/frontend/home/Orders";
import MatchingTrades from "./components/pages/frontend/Trades/MatchingTrades";
import Transactions from "./components/pages/frontend/Trades/Transactions";

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
            <Route path="/home/productss" element={<Productss />} />
            {/* <Route path="/home/contacts" element={<Contacts />} /> */}
            <Route path="/home/transactions" element={<Transactions />} />
           
            <Route path="/login2" element={<Login2 />} />
            <Route path="/register" element={<LoginRegister />} />
            <Route path="/authlogin" element={<AuthLogin />} />
            <Route path="/inventory" element={<Inventory cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cashout" element={<Cashout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/type" element={<Type />} />

            <Route path="/matching-trades" element={<MatchingTrades />} />


          </Routes>
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
