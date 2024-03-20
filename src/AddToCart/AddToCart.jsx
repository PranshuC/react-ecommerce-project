function AddToCart({ product, increaseQuantity, decreaseQuantity, cart }) {
  function increment() {
    console.log("increment");
    increaseQuantity(product);
  }
  function decrement() {
    console.log("decrement");
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
