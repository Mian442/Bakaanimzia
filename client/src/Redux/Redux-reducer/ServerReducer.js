import * as Actionlist from "../Redux-actions/ActionsList";
const initialState = {
  Server_Response: null,
  Server_Error_Response: null,
  Server_Operation_Response: null,
  Server_Anime: false,
  isloding: true,
  Server_Error: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Actionlist.SERVER_RESPONSE:
      return { ...state, Server_Response: payload };
    case Actionlist.SERVER_OPERATION_RESPONSE:
      return { ...state, Server_Operation_Response: payload };
    case Actionlist.SERVER_ERROR_RESPONSE:
      return { ...state, Server_Error_Response: payload };
    case Actionlist.SERVER_RESPONSE_NULL:
      return {
        ...state,
        Server_Response: null,
        error: false,
        Server_Error_Response: null,
      };
    case Actionlist.ERROR:
      return { ...state, Server_Error: true };
    case Actionlist.SERVER_ANIME_NOT_FOUND:
      return { ...state, Server_Anime: true };
    case Actionlist.ERROR_NO:
      return { ...state, Server_Error: false };
    default:
      return state;
  }
};
