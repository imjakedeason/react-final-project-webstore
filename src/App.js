import "./css/style.css";
import "./css/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Category from "./components/Category";
import CategoryPage from "./components/CategoryPage";
import useProducts from "./hooks/useProducts";
import { CartProvider } from "./context/CartContext";
import GradientBackground from "./components/GradientBackground";

function App() {
  const { products } = useProducts();

  return (
    <Router>
      <CartProvider>
        <div>
          <GradientBackground />
          <Navigation />
          <Routes>
            <Route path="/" element={<AllProducts products={products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/product/:id"
              element={<ProductDetail products={products} />}
            />
            <Route path="/category" element={<Category />} />
            <Route
              path="/category/:category"
              element={<CategoryPage products={products} />}
            />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
