import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StoreProvider } from "./components/store/storeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Welcome from "./components/pages/frontend/partials2/Welcome";
import { routesAdmin } from "./routes/routesAdmin";
import DeveloperLogin from "./components/pages/backend/access/DeveloperLogin";
import SetPassword from "./components/pages/backend/access/SetPassword";
import DeveloperCreatePassword from "./components/pages/backend/access/create-password/DeveloperCreatePassword";
import ForgotPassword from "./components/pages/backend/access/ForgotPassword";
import Login from "./components/pages/backend/access/Login";
import Register from "./components/pages/frontend/partials2/Register";
import CreateListing from "./components/pages/frontend/home/CreateListing";
import Dashboard from "./components/pages/frontend/Dashboard";
import Contacts from "./components/pages/frontend/home/Contacts";
import Homepage from "./components/pages/frontend/home/Homepage";
import Transactions from "./components/pages/frontend/home/Transactions";
import Inventory from "./components/pages/frontend/home/Inventory";
import TransactionPage from "./components/pages/frontend/home/TransactionPage";
import { useState } from "react";
import { routesDeveloper } from "./routes/routesDeveloper";
import Login2 from "./components/pages/frontend/partials2/Login2";

const App = () => {
  const [cart, setCart] = useState([]);
  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <Router>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/home/contacts" element={<Contacts />} />
          <Route path="/transactions" element={<Transactions />} />

          <Route path="/inventory" element={<Inventory cart={cart} setCart={setCart} />} />
          <Route path="/transaction" element={<TransactionPage />} />


          {routesAdmin.map((item, key) => {
              return (
                <Route path={item.route} key={key} element={item.element} />
              );
            })}
          {routesDeveloper.map((item, key) => {
              return (
                <Route path={item.route} key={key} element={item.element} />
              );
            })}

          <Route path="/login" element={<Login />} />
          <Route path="/login2" element={<Login2 />} />
          <Route path="/register" element={<Register />} />

          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/dashboard" element={<Dashboard />} />

           {/* FOR LATER */}
           <Route path="/developer/login" element={<DeveloperLogin/>}/> 
           <Route path="/admin/login" element={<Login />} />
           <Route path="/admin/set-password" element={<SetPassword />} />
           <Route path="/developer/create-password" element={<DeveloperCreatePassword />} />
           <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
