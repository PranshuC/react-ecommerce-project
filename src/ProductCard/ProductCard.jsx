import "./ProductCard.css";
import AddToCart from "../AddToCart/AddToCart";

export default function ProductCard({
  product,
  increaseQuantity,
  decreaseQuantity,
  cart,
}) {
  return (
    <div className="card">
      Product Card
      <h2>{product.title}</h2>
      <h4>{product.price}</h4>
      <AddToCart
        product={product}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cart={cart}
      />
    </div>
  );
}

// JS can parse only values within {}
// props can be named anything, ex : p
// passed from parent, called "props" but not keyword
// props is anything that can customise based on input
// className instead of class because JSX
// & class is a keyword in JS

// Files can have extension "jsx"/"js" - React understands both
// "jsx" - more recognised

// Component should not have business logic
