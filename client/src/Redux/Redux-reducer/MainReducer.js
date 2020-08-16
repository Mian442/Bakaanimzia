import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";
import UserReducer from "./UserReducer";
import FirebaseReducer from "./FirebaseReducer";
import ServerReducer from "./ServerReducer";
import HomeReducer from "./HomeReducer";

export default combineReducers({
  Search: SearchReducer,
  User: UserReducer,
  Firestore: FirebaseReducer,
  Server: ServerReducer,
  Home: HomeReducer,
});
