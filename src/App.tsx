import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useProducts } from './hooks/useProducts'
import Navbar from "./components/Navbar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProductList from "./pages/ProductList.tsx";
import AddProduct from "./pages/AddProduct.tsx";
import SalesLog from "./pages/SalesLog.tsx";

function App() {
  const { products, addProduct } = useProducts();
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard products={products} />} />
          <Route path="/products" element={<ProductList products={products} />} />
          <Route path="/products/add" element={<AddProduct addProduct={addProduct} />} />
          <Route path="/sales" element={<SalesLog products={products} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
