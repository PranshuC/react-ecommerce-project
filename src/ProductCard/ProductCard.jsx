import "./ProductCard.css";
import AddToCart from "../AddToCart/AddToCart";
import Rating from "../Rating/Rating";

export default function ProductCard({
  product,
  increaseQuantity,
  decreaseQuantity,
  cart,
}) {
  return (
    <div className="card">
      <h2>{product.title}</h2>
      <h4>{product.price.value}</h4>
      <Rating rating={product.rating.value} maxRating={5} />
      <AddToCart
        product={product}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cart={cart}
      />
    </div>
  );
}
