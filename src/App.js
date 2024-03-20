import "./styles.css";
import Products from "./Products";
//import Products from "./Products/Products";
import { useState } from "react";
import Cart from "./Cart/Cart";

export default function App() {
  const [cart, setCart] = useState({});
  // need the product itself, to add to cart
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
    // React won't re-render below, if newCart =  isn't done
    setCart(newCart);
    // You have changed a particular key in an object,
    // react will never know that the object has changed internally.
    // It would not cause the re-render of the component,
    // because it would compare the reference of the old obj
    // and that of the new obj. It would have remained same.
    // But, when you change the reference { ...cart } deep copy
    // react will always cause the re-render
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

// variable imported in index.js

// "Cart" should be available globally
// 2 ways of creating : array of objects[{},{},{}], or
// object of object {{},{},{}} data structure for the cart
// cart = {
//   productId : {
//     id: productId,
//     title: title,
//     quantity: quantity,
//     price: price
//   },
//   productId : {
//     id: productId,
//     title: title,
//     quantity: quantity,
//     price: price
//   }
// }
// In array of objects, need to loop through
// to find any productId, but cart[1] - obj of obj

// ...cart -> spread operation (deep copy)
