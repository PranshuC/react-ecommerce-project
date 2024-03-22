// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadCategories } from "../../stores/categories";

function Categories() {
  // moved to stores/categories.js
  //   let [categories, setCategories] = useEffect([]);
  //   useEffect(function () {
  //     fetch("https://run.mocky.io/v3/297308ac-aeb0-4e98-8868-9c1d3a878a4c")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((response) => {
  //         setCategories(response);
  //       });
  //   }, []);
  const dispatch = useDispatch();
  dispatch(loadCategories());
  const categories = useSelector((state) => {
    return state.categories.categories;
  });
  return (
    <div>
      <ul>
        {categories.map((item) => (
          <li key={item.id}> {item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
