import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StoreProvider } from "./components/store/storeContext";
import Register from "./components/pages/frontend/Register";
import Login from "./components/pages/frontend/Login";
import Welcome from "./components/pages/frontend/Welcome";
import Homepage from "./components/pages/frontend/home_2/Homepage";






const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
