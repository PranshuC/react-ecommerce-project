import "./ProductCard.css";
export default function ProductCard(props) {
  return (
    <div className="card">
      Product Card
      <span>{props.product.title}</span>
      <div>{props.product.price.value}</div>
    </div>
  );
}
