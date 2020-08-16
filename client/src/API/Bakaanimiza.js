import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    "x-auth-token": window.localStorage.getItem("token")
      ? window.localStorage.getItem("token")
      : null,
  },
});
