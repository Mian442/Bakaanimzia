import axios from "axios";

export default axios.create({
  baseURL: "https://bakanimzia-react.herokuapp.com/api/",
  headers: {
    "x-auth-token": window.localStorage.getItem("token")
      ? window.localStorage.getItem("token")
      : null,
  },
});
