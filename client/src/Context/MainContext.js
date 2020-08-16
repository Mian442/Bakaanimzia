import createcontext from "./createcontext";
import Baka from "../API/Bakaanimiza";
import { toast } from "react-toastify";
import firebase from "firebase";
import jwtdecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../Redux/Redux-actions/Actions";

const Mainreducer = (state, action) => {
  switch (action.type) {
    case "Sign_up":
      return action.payload;
    case "Profile":
      return action.payload;
    default:
      return state;
  }
};

// const profile = (dispatch) => {
//   return async (callback) => {
//     const jwt = window.localStorage.getItem("token");
//     let data = jwtdecode(jwt);
//     const response = Baka.get("/user/" + data._id);
//     callback();
//   };
// };

// const uploadEpisode = (dispatch) => {
//   return async (data, id, callback) => {
//     var A = [];
//     var status = 0;
//     const firestore = firebase.storage();
//     console.log(id);
//     data.map((i) => {
//       const storeref = firestore.ref("Anime/" + id + "/video/" + i.file.name);
//       const task = storeref.put(i.file);
//       task.on(
//         "state_changed",
//         (p) => {
//           console.log(
//             i.file.name +
//               " " +
//               Math.round((p.bytesTransferred / p.totalBytes) * 100)
//           );
//           if (Math.round((p.bytesTransferred / p.totalBytes) * 100) === 100) {
//             status++;
//           }
//         },
//         (err) => {
//           toast.error(err.message);
//         },
//         () => {
//           task.snapshot.ref.getDownloadURL().then((u) => {
//             A.push({
//               title: i.title,
//               url: u,
//               ref: "Anime/" + id + "/video/" + i.file.name,
//             });
//             if (status === data.length) {
//               data = A;
//               console.log(data);
//               uploadepdata();
//             }
//           });
//         }
//       );
//     });
//     const uploadepdata = async () => {
//       await Baka.post("anime/" + id + "/episode", data);
//       callback();
//     };
//   };
// };

// const NewAnime = (dispatch) => {
//   return async (data, callback) => {
//     var response = Baka.post("anime/dummy", { title: "dummy" });
//     var id = (await response).data;

//     const firestore = firebase.storage();

//     const uploadimage = async () => {
//       const storeref = firestore.ref(
//         "Anime/" + id + "/images/" + data.pic.name
//       );
//       const task = storeref.put(data.pic);
//       console.log("on");
//       task.on(
//         "state_changed",
//         (p) => {
//           console.log(Math.round((p.bytesTransferred / p.totalBytes) * 100));
//         },
//         (err) => {
//           toast.error(err.message);
//         },
//         () => {
//           task.snapshot.ref.getDownloadURL().then((u) => {
//             data.pic = {
//               url: u,
//               ref: "Anime/" + id + "/images/" + data.pic.name,
//             };
//             console.log(data);
//             if (data.episode.length > 0) {
//               uploadvideo();
//             } else {
//               uploaddata();
//             }
//           });
//         }
//       );
//     };

//     const uploadvideo = async () => {
//       var A = [];
//       var status = 0;
//       data.episode.map((i) => {
//         console.log(i);
//         const storeref = firestore.ref("Anime/" + id + "/video/" + i.file.name);
//         const task = storeref.put(i.file);
//         console.log("on");
//         task.on(
//           "state_changed",
//           (p) => {
//             console.log(
//               i.file.name +
//                 " " +
//                 Math.round((p.bytesTransferred / p.totalBytes) * 100)
//             );
//             if (Math.round((p.bytesTransferred / p.totalBytes) * 100) === 100) {
//               status++;
//             }
//           },
//           (err) => {
//             toast.error(err.message);
//           },
//           () => {
//             task.snapshot.ref.getDownloadURL().then((u) => {
//               A.push({
//                 title: i.title,
//                 url: u,
//                 ref: "Anime/" + id + "/video/" + i.file.name,
//               });
//               if (status === data.episode.length) {
//                 data.episode = A;
//                 uploaddata();
//               }
//             });
//           }
//         );
//       });

//       return A;
//     };

//     const uploaddata = async () => {
//       response = await Baka.put("anime/" + id, data);
//       if (response.data.status === 200) {
//         callback();
//       } else {
//         toast.error(response.data.error);
//       }
//     };
//     uploadimage();
//   };
// };

const Signup = (dispatch) => {
  return async (data, callback) => {
    const response = await Baka.post("user/signup", {
      name: data.name,
      email: data.email,
      password: data.pass,
    }).catch((err) => {
      toast.error(err);
    });
    if (response.data.error) {
      toast.error(response.data.error);
      return;
    }
    localStorage.setItem("token", response.data.token);
    callback();
    dispatch({ type: "SignUp", payload: response.data });
  };
};

const login = (dispatch) => {
  return async (data, callback) => {
    const response = await Baka.post("user/login", {
      email: data.email,
      password: data.pass,
    }).catch((err) => {
      toast.error(err);
    });
    if (response.data.error) {
      toast.error(response.data.error);
      return;
    }
    localStorage.setItem("token", response.data.token);
    callback(response.data);
    //dispatch({ type: "SignUp", payload: response.data });
  };
};

// const DelEpisode = () => {
//   return async (id, data, callback) => {
//     var response = await Baka.delete("anime/" + id + "/episode/" + data.index);
//     const firestore = firebase.storage().ref(data.state.ref);
//     firestore
//       .delete()
//       .then(() => {
//         toast.success("File From FireStore is Deleted");
//       })
//       .catch((err) => {
//         toast.error(err);
//       });
//     if (response.data.status === 200) {
//       response = await Baka.get("anime/" + id);
//       console.log("data");
//       console.log(response.data);
//       callback(response.data);
//     }
//   };
// };

// const DelAnime = () => {
//   return async (id, callback) => {
//     await Baka.delete("anime/" + id);
//     const firestore = firebase.storage().ref("Anime/" + id);
//     firestore
//       .delete()
//       .then(() => {
//         toast.success("Files From FireStore is Deleted");
//       })
//       .catch((err) => {
//         toast.error(err);
//       });
//   };
// };

export const { Context, Provider } = createcontext(
  Mainreducer,
  {
    Signup,
    login,
    //NewAnime,
    // profile,
    // uploadEpisode,
    //DelEpisode,
    //DelAnime,
  },
  []
);
