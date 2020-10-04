import {
  bakeLocalStorage,
  deleteLocalStorage,
  readLocalStorage,
} from "../helpers/storage";

export default (state = readLocalStorage("course"), action) => {
  let newState;

  // Check to see what type of action is being fired
  switch (action.type) {
    case "BASKET_ITEM_ADD":
      newState = {
        id: action.payload.courseId || (state && state.id),
        items: [...((state && state.items) || [])],
      };

      const exists = newState.items.some(
        (item) => item.id === action.payload.id
      );

      // if item already exists in course, add quantity to item
      if (exists) {
        newState.items = newState.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
              }
            : item
        );
      } else {
        newState.items = [...newState.items, { id: action.payload.id }];
      }

      bakeLocalStorage("course", newState);
      return newState;
    case "BASKET_ITEM_REMOVE":
      const item =
        state && state.items.find(({ id }) => id === action.payload.id);

      if (!item) return state;

      // removing quantity off course item removes item completely

      newState = {
        ...(state || {}),
        items: ((state || {}).items || []).map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
              }
            : item
        ),
      };
      bakeLocalStorage("course", newState);

      return newState;
    case "BASKET_EMPTY": {
      deleteLocalStorage("course");
      return null;
    }
    default:
      return state;
  }
};
