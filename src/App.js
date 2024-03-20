import "./styles.css";
import Products from "./Products";
import { useState } from "react";
import Cart from "./Cart";

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
    <div className="App">
      <Cart cart={cart} />
      <Products
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cart={cart}
      />
    </div>
  );
}
