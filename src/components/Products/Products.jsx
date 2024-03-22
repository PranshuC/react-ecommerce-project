// named export from react package
import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../ProductCard";
import Categories from "../Categories";

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

export default memo(function Products({
  increaseQuantity,
  decreaseQuantity,
  cart,
}) {
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
    [gp],
  );

  if (isLoading) {
    //return <div>Loading...</div>;
    <img alt="loader" src="https://giphy.com/embed/3o7bu3XilJ5BOiSGic" />;
  } else {
    return (
      <div>
        <Link to="/cart">View Cart </Link>
        <Categories />
        {gp.map((product, index) => {
          return (
            <ProductCard
              product={product}
              key={index}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              cart={cart}
            />
          );
        })}
      </div>
    );
  }
});
