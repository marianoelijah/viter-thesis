import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StoreProvider } from "./components/store/storeContext";
import Register from "./components/pages/frontend/Register";
import Login from "./components/pages/frontend/Login";
import Welcome from "./components/pages/frontend/Welcome";
import Homepage from "./components/pages/frontend/home_2/Homepage";
import Dashboard from "./components/pages/backend/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Advertisement from "./components/pages/backend/advertisement/Advertisement";
import Products from "./components/pages/backend/products/Products";
import Category from "./components/pages/backend/category/Category";
import Settings from "./components/pages/backend/settings/Settings";
import Role from "./components/pages/backend/settings/role/Role";
import { routesAdmin } from "./routes/routesAdmin";
import { routeDeveloper } from "./routes/routesDeveloper";
import DeveloperCreatePassword from "./components/pages/backend/access/create-password/DeveloperCreatePassword";
import DeveloperLogin from "./components/pages/backend/access/DeveloperLogin";
import SetPassword from "./components/pages/backend/access/SetPassword";
import ForgotPassword from "./components/pages/backend/access/ForgotPassword";


const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <Router>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {routesAdmin.map((item, key) => {
              return (
                <Route path={item.route} key={key} element={item.element} />
              );
            })}
            {routeDeveloper.map((item, key) => {
              return (
                <Route path={item.route} key={key} element={item.element} />
              );
            })}

          {/* <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/advertisement" element={<Advertisement />} />
          <Route path="/admin/products" element={<Products/>} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/settings/role" element={<Role />} />
          <Route path="/admin/settings/developer" element={<Settings />} />
          <Route path="/admin/settings/admin" element={<Settings />} />  */}

            <Route
              path="/developer/create-password"
              element={<DeveloperCreatePassword />}
            />
            <Route path="/developer/login" element={<DeveloperLogin />} />

            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/set-password" element={<SetPassword />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />

        </Routes>
      </Router>
    </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
