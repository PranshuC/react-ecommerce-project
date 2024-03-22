import { useDispatch, useSelector } from "react-redux";
function ReduxAddToCart({ product }) {
  let dispatch = useDispatch();
  // let cart = useSelector((state) => {
  //   return state.items;
  // });
  let quantity = useSelector((state) => {
    return state.cart.items[product.id]?.quantity || 0;
  });

  function increment() {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }

  function decrement() {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  }

  if (quantity === 0) {
    return (
      <div>
        <button onClick={increment}> Add to Cart</button>
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

export default ReduxAddToCart;
