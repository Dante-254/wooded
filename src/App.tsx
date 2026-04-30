import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import { useProducts } from './hooks/useProducts'
import Navbar from "./components/Navbar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProductList from "./pages/ProductList.tsx";
import AddProduct from "./pages/AddProduct.tsx";
import SalesLog from "./pages/SalesLog.tsx";
import { ProductProvider } from "./context/ProductContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import EditProduct from './pages/EditProduct'
import ProductDetail from './pages/ProductDetail'

function App() {
  //const { products, addProduct } = useProducts();
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/sales" element={<SalesLog />} />
              <Route path="/edit/:id" element={<EditProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </div>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
