import createcontext from "./createcontext";
import Baka from "../API/Bakaanimiza";

const Searchreducer = (state, action) => {
  switch (action.type) {
    case "Search":
      return action.payload;
    case "Inital":
      return action.payload;
    default:
      return state;
  }
};

const inital = (dispatch) => {
  return async () => {
    dispatch({ type: "Inital", payload: null });
  };
};

const SearchEntity = (dispatch) => {
  return async (name, callback) => {
    const response = await Baka.get("/search/" + name);
    callback();
    dispatch({ type: "Search", payload: response.data });
  };
};

export const { Context, Provider } = createcontext(
  Searchreducer,
  {
    SearchEntity,
    inital,
  },
  []
);
