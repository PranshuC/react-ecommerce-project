# ReactJS Ecommerce Mock Application

### REACT PROJECT 2 (7 Sep 2023)

https://mocki.io/ - Create Mock API for frontend testing

#### File-wise Learnings :
**App.js**<br>
Because of the use index.js,
import Products from "./Products/Products";<br>
can be replaced with<br>
import Products from "./Products";<br>
variable imported in index.js :<br>
import App from "./App";

...cart -> spread operation (deep copy)
```javascript
const newCart = { ...cart };
setCart(newCart);
```
You have changed a particular key in an object,
react will never know that the object has changed internally.
It would not cause the re-render of the component,
because it would compare the reference of the old obj
and that of the new obj. It would have remained same.
But, when you change the reference { ...cart } deep copy
react will always cause the re-render


"Cart" should be available globally.<br>
2 ways of creating : array of objects[{},{},{}] OR
object of object {{},{},{}} data structure for the cart.
```json
cart = {
  productId : {
    id: productId,
    title: title,
    quantity: quantity,
    price: price
  },
  productId : {
    id: productId,
    title: title,
    quantity: quantity,
    price: price
  }
}
```
In array of objects, need to loop through to find any productId
BUT in obj of obj, cart[<id>] returns object easily using productId.

**Products.jsx**<br>
*const products* has been replaced with Sidhharth's API call to get the data :<br>
fetch("https://602fc537a1e9d20017af105e.mockapi.io/api/v1/products")

setTimeout adds asynchronity
```javascript
function getProductsApi() {
  setTimeout(function() {
    // currently return in setTimeout & not getProductsApi
    // so getProductsApi() returns undefined causing error
    return products;
  }, 1000);
}

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
      // 4. "fetch" returns a promise},
    }, [gp],
  );
```


Usecase : 10x ProductCards with individual numbering,
pass parameter ex: name="1", price="20".
Hardcoded values are wrong, need to loop through.

- map function in JS - cleaner version of for loop.<br>
map(fn(item,index)) - reference. Ex: <br>
[1,2,3] => [2,4,6] (double)<br>
Array.prototype.double = function() {<br>
&nbsp;&nbsp;return this.map((item) => item*2);<br>
}<br>

CONSOLE Warning : Each child in a list should have a unique "key" prop.<br>
Because of the use of map, all have same identifier, no separation.
We need unique id in order to compare in Virual DOM.
In this case, key={product.title} adds uniqueness.
(It is required only in loops)

frontend -> api -> backend<br>
backend collects data and sends response to frontend.
setTimeout mocks the delay in backend response.

Q : how not to return undefined from getProductsApi() call - 
"useState" hook

**ProductCard.jsx**<br>
- JS can parse only values within {}
- props is anything that can customise based on input
- props can be named anything, ex : p.
passed from parent, called "props" but not keyword.
- className instead of class because JSX
& class is a keyword in JS
- Files can have extension "jsx"/"js" - 
React understands both, but "jsx" - more recognised.
- Components should not have business logic

**AddToCart.jsx**<br>
*Props drilling* - {product, increaseQuantity, decreaseQuantity, cart}
passed from top-most parent repititively to this final child :<br>
App.js => Products.jsx => ProductCard.jsx => AddToCart.jsx

**Cart.jsx**<br>
Loop through {obj of obj} to show all the cart items.
map -> loop through cartList array<br>
Object.values(cart) : object of object {{},{},{}} TO array of objects[{},{},{}]

**Rating.jsx**<br>
Display stars with :
- 1 map on rating and display filled stars
- 1 map on (maxrating-rating) to display empty stars

Better, only 1 map handing both conditions on index of maxRating.

1. "@mdi/react" & "@mdi/js" dependencies for Rating's star icon
2. "classnames" dependency for changing class in same loop, boolean-based


