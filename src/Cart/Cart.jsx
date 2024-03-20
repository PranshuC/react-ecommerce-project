function Cart({ cart }) {
  const cartList = cart ? Object.values(cart) : [];
  console.log(cartList); // array of objects
  return (
    <div>
      <ul>
        {
          // map -> loop through array
          cartList.map((item) => (
            <li key={item.id}>
              {item.title} {item.quantity}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Cart;

// Loop through {obj of obj} to show all the cart items
