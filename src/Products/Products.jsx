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

// setTimeout adds asynchronity
// function getProductsApi() {
//   setTimeout(function() {
//     // currently return in setTimeout & not getProductsApi
//     // so getProductsApi() returns undefined causing error
//     return products;
//   }, 1000);
// }
function getProductsApi(callback) {
  setTimeout(function () {
    callback(products);
  }, 1000);
}

// API call in order to get the data
export default function Products({ increaseQuantity, decreaseQuantity, cart }) {
  let [gp, setGp] = useState([]); // [stateVar, setterFunc]
  // 1. value missed on mounting
  //gp = getProductsApi();
  // 2. useState hook used - 3 API calls
  /*getProductsApi(
    function(res) {
      //gp = res;
      setGp(res);
    }
  );*/
  // loader until response returns
  let [isLoading, setLoading] = useState(true);
  // 3. useEffect hook based on depedency state variable
  useEffect(
    function () {
      /*getProductsApi(function(res) {
          setGp(res);
          setLoading(false);
        });*/
      // 4. "fetch" returns a promise
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
        {gp.map((product) => {
          return;
          <ProductCard
            product={product}
            key={product.title}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            cart={cart}
          />;
        })}
      </div>
    );
  }
}

// Usecase : 10x ProductCards with individual numbering
// pass parameter ex: name="1", price="20"
// hardcoded values are wrong, need to loop through

// map function in JS - cleaner version of for loop
// map(fn(item,index)) - reference
// [1,2,3] => [2,4,6] (double)
// Array.prototype.double = function() {
//    return this.map((item) => item*2);
// }

// Warning : Each child in a list should have a unique "key" prop.
// Because of the use of map, all have same identifier, no separation
// We need id in order to compare in Virual DOM.
// In this case, key={product.title} adds uniqueness
// It is required only in loops

// frontend -> api -> backend
// backend collects data and sends response to frontend
// setTimeout mocks the delay in backend response

// Q : how not to return undefined from getProductsApi() call
