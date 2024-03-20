import { useEffect, useState } from "react"; // named export from react package
import ProductCard from "../ProductCard";

const products = [
  {
    id: 1,
    title: "Apple iPhone 14",
    price: "Rs. 1,00,000",
  },
  {
    id: 2,
    title: "Apple iPhone 13",
    price: "Rs. 70,000",
  },
  {
    id: 3,
    title: "Google Pixel 7",
    price: "Rs. 50,000",
  },
  {
    id: 4,
    title: "Nokia 1100",
    price: "Rs. 2,000",
  },
  {
    id: 5,
    title: "Samsung Galaxy S10",
    price: "Rs. 1,00,000",
  },
  {
    id: 6,
    title: "Sony Xperia S10",
    price: "Rs. 1,00,000",
  },
];

function getProductsApi(callback) {
  setTimeout(function () {
    callback(products);
  }, 1000);
}

export default function Products() {
  let [gp, setGp] = useState([]);
  let [isLoading, setLoading] = useState(true);
  useEffect(
    function () {
      fetch("https://602fc537a1e9d20017af105e.mockapi.io/api/v1/products")
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          setGp(response);
          setLoading(false);
        });
    },
    [gp]
  );

  if (isLoading) {
    <img alt="loader" src="https://giphy.com/embed/3o7bu3XilJ5BOiSGic" />;
  } else {
    return (
      <div>
        {gp.map((product) => {
          return <ProductCard product={product} key={product.title} />;
        })}
      </div>
    );
  }
}
