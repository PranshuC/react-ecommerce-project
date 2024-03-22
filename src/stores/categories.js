export function loadCategories() {
  return function (dispatch) {
    fetch("https://run.mocky.io/v3/297308ac-aeb0-4e98-8868-9c1d3a878a4c")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        dispatch({ type: "LOAD_CATEGORIES_DONE", payload: response });
      });
  };
}
function CategoriesReducer(state = { categories: {} }, action) {
  switch (action.type) {
    case "LOAD_CATEGORIES_DONE": {
      return {
        ...state,
        categories: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default CategoriesReducer;
