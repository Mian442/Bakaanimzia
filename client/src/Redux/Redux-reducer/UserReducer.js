import * as Actionlist from "../Redux-actions/ActionsList";
const initialState = {
  userinfo: null,
};

export default (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case Actionlist.PROFILE_DATA:
      return { ...state, userinfo: payload };
    default:
      return state;
  }
};
