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
```javascript
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


### REACT PROJECT 3 (9 Sep 2023)

**Custom Hook** : *useWindowSize.js* :<br>
Calculates & returns the *innerWidth* & *innerHeight* of current *window*.<br>
UseCase Ex : Based on user's window size, show/hide some component. 
Here, Cart is hidden below a certain width. <br>
useEffect should be effective only once : mounting phase, 
because addEventListener should be registered only once.
eventListener remains same, so no re-rendering required.<br>
Any reusability function can be moved to custom hook.


### REACT PROJECT 4 (12 Sep 2023)

How does **microfrontend** work?<br>
In a microfrontend architecture, a web application is divided into smaller,
self-contained modules or individual functions, implemented autonomously.
Each module can be developed, tested, and deployed independently, enabling 
teams to work on specific features or functions within the application. <br>
**Cypress** is an end-to-end testing framework built on Mocha – JavaScript test
framework running on and in the browser, making asynchronous testing convenient.<br>
Earlier, *iframe* HTML tag stitched together individual pages from remote builds.
Currently, Webpack Module Federation plugin helps multiple separate builds form SPA.<br>
Create all components & put in NPM package. NPM registry helps keep common/global components private but sharable.

How do you think your frontend in general is served? <br>
Client requests a page. Server has multiple routes.
Routes forward the supported requests to the appropriate controller functions.
Controller checks that which page has to be served, get the requested data from 
the models, create an HTML page displaying the data, and return it to the user 
to view in the browser.

How Scaler handles deployment? <br>
Ex : scaler.com/scm.
You could just create a react app, host it using cloudfront (act as server).
You could upload your application on S3.
Make your cloudfront point to the S3 folder and serve that application.
Everything now would be your API based, there is no server required to serve.

**Vercel** is a cloud platform that helps developers deploy and host their 
React applications. It has integrations for GitHub, GitLab, and Bitbucket 
to enable CI/CD for your React site with zero configuration. Then, you can 
run automated tests for performance and reliability on every push.


**Routing**<br>
Routing version 5 was used, now Version 6 is available.
SPA - Single Page Application.
If React is SPA, what are we routing to & from?
Route between different components,
and components can act as page.

**BrowserRouter** in *index.js* shows starting point for routing to happen.
The, wrap our code in switch-case for multiple routes.

In our code, there's only 1 component per page, so the code may look repititive,
but in large apps code will be cleaner with multiple components in each page
(Easy to maintain hierarchy).

We cannot pass the data through Route directly. Ex :<br>
\<Cart **cart={cart}** /> cannot be replaced with<br>
\<Route path="/cart" element={\<CartPage />} **cart={cart}** /><br>
Earlier, passing as props to just 1 child.
But if we make them available in global state,
all components can access them from global.
Common ways : context api, redux, mobx.


**context api** : Avoid *Props Drilling*
- somehow to provide this global state. 
(*context/CartContext.js* & *CartContext.Provider*).
If multiple Context Providers - wrap in tag hierarchy one after other.
- somehow use this state in the components. useContext hook. Ex :
*const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);* 
in *AddToCart.jsx*. Earlier parent, now pseudo-parent provides.

But due to Context, global state change causes re-render of all components.
So, using *memo(function Products({* all the unnecessary parent re-renders are gone.
But all the "Add to Cart" re-renders, even only 1 item's button clicked.
**Limitation of Context** : If there is change in state, cannot subscribe to specific 
key. It re-renders all elements in that Component.


**Redux** : state management tool.
It provides you with a global state.
It would provide you with a way in which, Global state :
- way to update this global state
- way to consume this global state
- way to wrap this global state with all the components

Provider - wrap global state.<br>
Store - global state management
1. State - like DB in backend, global states are stored
2. Reducer - like controller in backend, either write to or read from - State

- Action - Ex : increase/decrease quantity (button click)
- Dipatch - Action be dispached towards the Store (like addEventListener)

Action =>  dipatched =>  Reducer => manipulate state
=> manipulated state provided again to all components
=> Provider


*Route exact={true}* makes sure the regex "/" doesn't take away
all the URLs' match after that & look for "/" exactly.

Going to cart page from Products using <br>
\<a href="/cart">View Cart \</a> <br>
wouldnt help, because the page reloads & items' 
list is lost. Instead, use "Link" to keep SPA : <br>
\<Link to="/cart">View Cart \</Link>


### REACT PROJECT 5 (14 Sep 2023)

**store.js** : Reducer - update state for actions<br>
Multiple actions possible : switch-case. Ex : increase/decrease quantity.
Based on action, manipulate the state :
Add items into cart => cart = {{}, {}, {}} .
newCart = {{}, {}, {}, {}} [item appended]. <br>
action: {type, payload} [object with 2 keys]. 
Type -> add/remove, payload -> items.

*redux* & *react-redux* packages need to be added in dependencies.
Redux package is lightweight, whenever interact with other framework,
pass-on another dependency like react-redux, vue-redux, angular-redux.

\<Provider store={store}> in main index.js; access in Cart,
update in Add to Cart.

**ReduxAddToCart.jsx**<br>
*useDispatch* provides Dispatch method. <br>
*useSelector* is a hook that takes call as the param,
the callback has the state in it as a parameter.

...a -> deepcopy, but shallow copied lower levels.
So, for deeopcopy of lower levels too : {...a, b: {...a.b}}

*lodash* package (https://lodash.com/) provides us multiple utility methods. 
Here, omit used - remove object from (object of object).

**Categories.jsx**<br>
Instead of having all the react component API call,
move everything to redux. Suggested : business logic not in react.
Move the logic to store & pass action here.
Need to create Categories Reducer, but you can have only 1 store.
Somehow combine the Reducers together & provide in 1 store.<br>
**stores/index.js**: { combineReducers } from "redux".
Store & Provider are only 1, combine global state. <br>
Enhance ability of dispatch passing method instead of object.
So, applyMiddleware(thunk) takes function input & object output.
React will talk to redux by dispatching something as action.

HOC(higher-order component) example : 
https://codesandbox.io/p/sandbox/hoc-ovp5ti?file=%2Fsrc%2FClickIncrease.js