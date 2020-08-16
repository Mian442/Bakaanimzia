import * as Actionlist from "../Redux-actions/ActionsList";
const initialState = {
  FireStore_Response: null,
  isloding: true,
  upload: [],
  error: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Actionlist.FIRESTORE_RESPONSE:
      return { ...state, FireStore_Response: payload };
    case Actionlist.FIRESTORE_RESPONSE_NULL:
      return { ...state, FireStore_Response: null };
    case Actionlist.FIRESTORE_ERROR:
      return { ...state, error: true };
    case Actionlist.FIRESTORE_ERROR_NO:
      return { ...state, error: false };
    case Actionlist.FIRESTORE_IS_LOADING:
      return { ...state, isloading: true };
    case Actionlist.FIRESTORE_IS_LOADING_NO:
      return { ...state, isloading: false };
    case Actionlist.FIRESTORE_UPLOAD:
      var newprogress = [...state.upload];
      newprogress[payload.k] = payload.value;
      return { ...state, upload: newprogress };
    case Actionlist.FIRESTORE_UPLOAD_NULL:
      return { ...state, upload: [] };
    default:
      return state;
  }
};
