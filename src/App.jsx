import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StoreProvider } from "./components/store/storeContext";
import Homepage from "./components/pages/frontend/Homepage";




const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route index element={<Homepage />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
