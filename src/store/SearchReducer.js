const initialState = {
  fromStops: [],
  toStops: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS_FROM":
      return {
        ...state,
        fromStops: action.payload.fromStops,
      };
    case "FETCH_SUCCESS_TO":
      return {
        ...state,
        toStops: action.payload.toStops,
      };
    default:
      return state;
  }
};

export default reducer;
