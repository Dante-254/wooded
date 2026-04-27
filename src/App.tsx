import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProductList from "./pages/ProductList.tsx";
import AddProduct from "./pages/AddProduct.tsx";
import SalesLog from "./pages/SalesLog.tsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/sales" element={<SalesLog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
