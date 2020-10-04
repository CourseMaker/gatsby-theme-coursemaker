export const addToCourse = ({ id, quantity, courseId }) => ({
  type: "BASKET_ITEM_ADD",
  payload: {
    id,
    quantity,
    courseId,
  },
});

export const removeFromCourse = ({ id, quantity }) => ({
  type: "BASKET_ITEM_REMOVE",
  payload: { id, quantity },
});

export const emptyCourse = () => ({
  type: "BASKET_EMPTY",
});
