import * as Actionlist from "../Redux-actions/ActionsList";
const initialState = {
  Poular: null,
  Latest: null,
  Ongoing: null,
  Recents: null,
  Server_Error_Response: true,
  Server_Error: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Actionlist.POPULAR:
      return { ...state, Popular: payload };
    case Actionlist.LATEST:
      return { ...state, Latest: payload };
    case Actionlist.ONGOING:
      return { ...state, Ongoing: payload };
    case Actionlist.RECENTS:
      return { ...state, Recents: payload };
    case Actionlist.SERVER_ERROR_RESPONSE:
      return { ...state, Server_Error_Response: payload };
    case Actionlist.ERROR:
      return { ...state, Server_Error: true };
    case Actionlist.ERROR_NO:
      return { ...state, Server_Error: false };
    default:
      return state;
  }
};
