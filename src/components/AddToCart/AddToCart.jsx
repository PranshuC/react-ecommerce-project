import { useContext } from "react";
import CartContext from "../../context/CartContext";

//function AddToCart({ product, increaseQuantity, decreaseQuantity, cart }) {
function AddToCart({ product }) {
  const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  function increment() {
    increaseQuantity(product);
  }
  function decrement() {
    decreaseQuantity(product);
  }
  // check item quantity in the cart then show
  // either + & - OR show "Add to Cart" button
  const quantity = cart[product.id] ? cart[product.id].quantity : 0; //iternary operator
  if (quantity === 0) {
    return (
      <div>
        <button onClick={increment}>Add to Cart</button>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={decrement}> - </button>
        <span> {quantity} </span>
        <button onClick={increment}> + </button>
      </div>
    );
  }
}

export default AddToCart;
