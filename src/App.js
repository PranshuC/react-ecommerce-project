import "./styles.css";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CartContext from "./context/CartContext";
import NotFound from "./pages/NotFound";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState({});
  function increaseQuantity(product) {
    const newCart = { ...cart };
    if (!newCart[product.id]) {
      newCart[product.id] = {
        id: product.id,
        title: product.title,
        price: product.price.value,
        quantity: 0,
      };
    }
    newCart[product.id].quantity += 1;
    setCart(newCart);
  }
  function decreaseQuantity(product) {
    const newCart = { ...cart };
    if (!newCart[product.id]) return;
    newCart[product.id].quantity -= 1;
    if (newCart[product.id].quantity <= 0) {
      delete newCart[product.id];
    }
    setCart(newCart);
  }
  return (
    <CartContext.Provider value={{ cart, increaseQuantity, decreaseQuantity }}>
      <div className="App">
        <Routes>
          <Route exact={true} path="/" element={<ProductsPage />} />
          <Route exact={true} path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Cart />
        <Products /> */}
        {/* <Cart cart={cart} />
        <Products
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          cart={cart}
        /> */}
      </div>
    </CartContext.Provider>
  );
}
