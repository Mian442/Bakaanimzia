import * as Actionlist from "./ActionsList";
import Baka from "../../API/Bakaanimiza";
import jwtdecode from "jwt-decode";
import firebase from "firebase";

export const SEARCH = (payload) => ({
  type: Actionlist.SEARCH,
  payload,
});

export const SEARCH_NULL = () => ({
  type: Actionlist.SEARCH_NULL,
});

export const USER_DATA = (payload) => ({
  type: Actionlist.PROFILE_DATA,
  payload,
});

export const FIRESTORE_RESPONSE = (payload) => ({
  type: Actionlist.FIRESTORE_RESPONSE,
  payload,
});

export const FIRESTORE_RESPONSE_NULL = (payload) => ({
  type: Actionlist.FIRESTORE_RESPONSE_NULL,
  payload,
});

export const FIRESTORE_UPLOAD = (payload) => ({
  type: Actionlist.FIRESTORE_UPLOAD,
  payload,
});

export const FIRESTORE_UPLOAD_NULL = (payload) => ({
  type: Actionlist.FIRESTORE_UPLOAD_NULL,
  payload,
});

export const FIRESTORE_RESPONSE_IS_LOADING = () => ({
  type: Actionlist.FIRESTORE_IS_LOADING,
});

export const FIRESTORE_RESPONSE_IS_LOADING_NO = () => ({
  type: Actionlist.FIRESTORE_IS_LOADING_NO,
});

export const FIRESTORE_RESPONSE_ERROR = () => ({
  type: Actionlist.FIRESTORE_ERROR,
});

export const FIRESTORE_RESPONSE_ERROR_NO = () => ({
  type: Actionlist.FIRESTORE_ERROR_NO,
});

export const SERVER_RESPONSE = (payload) => ({
  type: Actionlist.SERVER_RESPONSE,
  payload,
});

export const SERVER_ANIME_NOT_FOUND = () => ({
  type: Actionlist.SERVER_ANIME_NOT_FOUND,
});

export const SERVER_OPERATION_RESPONSE = (payload) => ({
  type: Actionlist.SERVER_OPERATION_RESPONSE,
  payload,
});

export const SERVER_ERROR_RESPONSE = (payload) => ({
  type: Actionlist.SERVER_ERROR_RESPONSE,
  payload,
});

export const SERVER_RESPONSE_NULL = () => ({
  type: Actionlist.SERVER_RESPONSE_NULL,
});

export const SERVER_RESPONSE_ERROR = () => ({
  type: Actionlist.ERROR,
});

export const SERVER_RESPONSE_ERROR_NO = () => ({
  type: Actionlist.ERROR_NO,
});

export const POULAR = (payload) => ({
  type: Actionlist.POPULAR,
  payload,
});

export const LATEST = (payload) => ({
  type: Actionlist.LATEST,
  payload,
});

export const ONGOING = (payload) => ({
  type: Actionlist.ONGOING,
  payload,
});

export const RECENTS = (payload) => ({
  type: Actionlist.RECENTS,
  payload,
});

export const Search_Data = (data, callback) => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());
    dispatch(FIRESTORE_RESPONSE_NULL());
    await Baka.get("/search/" + data)
      .then((res) => {
        dispatch(SEARCH(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const Search_Data_popular = (data, callback) => {
  return async (dispatch) => {
    await Baka.get("/search/popular/" + data)
      .then((res) => {
        dispatch(SEARCH(res.data));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
        callback();
      });
  };
};

export const GET_PROFILE_DATA = () => {
  return async (dispatch) => {
    const jwt = window.localStorage.getItem("token");
    let data = jwtdecode(jwt);
    await Baka.get("/user/" + data._id)
      .then((res) => {
        dispatch(USER_DATA(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const NEW_EPISODE = (value, data, callback) => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());
    dispatch(FIRESTORE_RESPONSE_NULL());
    const firestore = firebase.storage();
    dispatch(FIRESTORE_RESPONSE_IS_LOADING());

    const uploadvideo = async () => {
      var A = [];
      var status = 0;

      data.episode.map((i, index) => {
        const storeref = firestore.ref(
          "Anime/" + value._id + "/video/" + i.file.name
        );
        const task = storeref.put(i.file);
        return task.on(
          "state_changed",
          (p) => {
            dispatch(
              FIRESTORE_UPLOAD({
                k: index + 1,
                value: Math.round((p.bytesTransferred / p.totalBytes) * 100),
              })
            );
            if (Math.round((p.bytesTransferred / p.totalBytes) * 100) === 100) {
              status++;
            }
          },
          (err) => {
            dispatch(FIRESTORE_RESPONSE_ERROR());
            dispatch(FIRESTORE_RESPONSE({ error: err.message, status: 400 }));
            return;
          },
          () => {
            task.snapshot.ref.getDownloadURL().then((u) => {
              A.push({
                title: i.title,
                url: u,
                ref: "Anime/" + value._id + "/video/" + i.file.name,
              });
              if (status === data.episode.length) {
                data.episode = A;
                uploaddata();
              }
            });
          }
        );
      });
      return A;
    };

    const uploaddata = async () => {
      console.log(data, value);
      await Baka.post("anime/" + value._id + "/episode", data.episode)
        .then((res) => {
          let recent = {
            anime_id: value._id,
            title: value.title,
            pic: value.pic.url,
            episode: [...data.episode],
          };
          dispatch(
            FIRESTORE_RESPONSE({
              msg: "Episode is Uploaded Fire Store",
              status: 200,
            })
          );
          dispatch(SERVER_RESPONSE({ msg: res.data, status: res.status }));
          dispatch(FIRESTORE_RESPONSE_IS_LOADING_NO());
          dispatch(ADD_RECENT(recent, callback));
        })
        .catch((error) => {
          if (error.response) {
            dispatch(SERVER_RESPONSE_ERROR());
            dispatch(
              SERVER_ERROR_RESPONSE({
                error: error.response.data,
                status: error.response.status,
              })
            );
          } else if (error.request) {
            dispatch(SERVER_RESPONSE_ERROR());
            dispatch(
              SERVER_ERROR_RESPONSE({
                error: error.message,
                status: 500,
              })
            );
          } else {
            dispatch(SERVER_RESPONSE_ERROR());
            dispatch(
              SERVER_ERROR_RESPONSE({
                error: error.message,
                status: 502,
              })
            );
          }
          callback();
        });
    };

    uploadvideo();
  };
};

export const UPDATE_EPISODE = (id, index, data, entity, callback) => {
  return async (dispatch) => {
    await Baka.put("anime/" + id + "/episode/" + index, data)
      .then((res) => {
        dispatch(Search_Data(entity, () => {}));
        dispatch(SERVER_RESPONSE({ msg: res.data, status: res.status }));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const DELETE_EPISODE = (id, index, entity, callback) => {
  return async (dispatch) => {
    await Baka.get("anime/" + id + "/episode/" + index)
      .then(async (res) => {
        let ref = res.data?.episode?.ref;
        await Baka.delete("anime/" + id + "/episode/" + index)
          .then((res) => {
            const firestore = firebase.storage().ref(ref);
            firestore
              .delete()
              .then(() => {
                dispatch(Search_Data(entity, () => {}));
                dispatch(
                  FIRESTORE_RESPONSE({
                    msg: "Media Deleted From Fire Store",
                    status: 200,
                  })
                );
                dispatch(
                  SERVER_RESPONSE({ msg: res.data, status: res.status })
                );
                callback();
              })
              .catch((err) => {
                dispatch(FIRESTORE_RESPONSE_ERROR());
                dispatch(
                  FIRESTORE_RESPONSE({
                    error: err.message,
                    status: 400,
                  })
                );
                return;
              });
          })
          .catch((error) => {
            if (error.response) {
              dispatch(SERVER_RESPONSE_ERROR());
              dispatch(
                SERVER_ERROR_RESPONSE({
                  error: error.response.data,
                  status: error.response.status,
                })
              );
            } else if (error.request) {
              dispatch(SERVER_RESPONSE_ERROR());
              dispatch(
                SERVER_ERROR_RESPONSE({
                  error: error.message,
                  status: 500,
                })
              );
            } else {
              dispatch(SERVER_RESPONSE_ERROR());
              dispatch(
                SERVER_ERROR_RESPONSE({
                  error: error.message,
                  status: 502,
                })
              );
            }
            callback();
            return;
          });
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
        callback();
        return;
      });
  };
};

export const NEW_ANIME = (data, callback) => {
  return async (dispatch) => {
    dispatch(FIRESTORE_UPLOAD_NULL());
    dispatch(SERVER_RESPONSE_NULL());
    await Baka.post("anime/dummy", { title: "dummy" })
      .then((res) => {
        var delete_ref = [];
        let recent;
        var id = res.data._id;
        const firestore = firebase.storage();

        const uploadimage = async () => {
          const storeref = firestore.ref(
            "Anime/" + id + "/images/" + data.pic.name
          );
          delete_ref.push("Anime/" + id + "/images/" + data.pic.name);
          const task = storeref.put(data.pic);
          console.log("on");
          task.on(
            "state_changed",
            (p) => {
              dispatch(
                FIRESTORE_UPLOAD({
                  k: 0,
                  value: Math.round((p.bytesTransferred / p.totalBytes) * 100),
                })
              );
            },
            (err) => {
              dispatch(FIRESTORE_RESPONSE_ERROR());
              dispatch(FIRESTORE_RESPONSE({ error: err.message, status: 404 }));
              return;
            },
            () => {
              task.snapshot.ref.getDownloadURL().then((u) => {
                data.pic = {
                  url: u,
                  ref: "Anime/" + id + "/images/" + data.pic.name,
                };
                if (data.episode.length > 0) {
                  uploadvideo();
                } else {
                  uploaddata();
                }
              });
            }
          );
        };

        const uploadvideo = async () => {
          var A = [];
          var status = 0;
          data.episode.map((i, index) => {
            const storeref = firestore.ref(
              "Anime/" + id + "/video/" + i.file.name
            );
            const task = storeref.put(i.file);
            return task.on(
              "state_changed",
              (p) => {
                dispatch(
                  FIRESTORE_UPLOAD({
                    k: index + 1,
                    value: Math.round(
                      (p.bytesTransferred / p.totalBytes) * 100
                    ),
                  })
                );
                if (
                  Math.round((p.bytesTransferred / p.totalBytes) * 100) === 100
                ) {
                  status++;
                }
              },
              (err) => {
                dispatch(FIRESTORE_RESPONSE_ERROR());
                dispatch(
                  FIRESTORE_RESPONSE({ error: err.message, status: 404 })
                );
                return;
              },
              () => {
                task.snapshot.ref.getDownloadURL().then((u) => {
                  A.push({
                    title: i.title,
                    url: u,
                    ref: "Anime/" + id + "/video/" + i.file.name,
                  });
                  delete_ref.push("Anime/" + id + "/video/" + i.file.name);
                  if (status === data.episode.length) {
                    data.episode = A;
                    uploaddata();
                  }
                });
              }
            );
          });
          return A;
        };

        const uploaddata = async () => {
          data["delete_ref"] = delete_ref;
          console.log(data);
          recent = {
            anime_id: id,
            title: data.title,
            pic: data.pic.url,
            episode: [...data.episode],
          };
          await Baka.put("anime/" + id, data)
            .then((res) => {
              dispatch(
                FIRESTORE_RESPONSE({
                  msg: "Anime Media is Uploaded Fire Store",
                  status: 200,
                })
              );
              dispatch(SERVER_RESPONSE({ msg: res.data, status: res.status }));
              dispatch(ADD_RECENT(recent, callback));
            })
            .catch((error) => {
              if (error.response) {
                dispatch(SERVER_RESPONSE_ERROR());
                dispatch(
                  SERVER_ERROR_RESPONSE({
                    error: error.response.data,
                    status: error.response.status,
                  })
                );
              } else if (error.request) {
                dispatch(SERVER_RESPONSE_ERROR());
                dispatch(
                  SERVER_ERROR_RESPONSE({
                    error: error.message,
                    status: 500,
                  })
                );
              } else {
                dispatch(SERVER_RESPONSE_ERROR());
                dispatch(
                  SERVER_ERROR_RESPONSE({
                    error: error.message,
                    status: 502,
                  })
                );
              }
            });
        };

        uploadimage();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
        callback();
      });
  };
};

export const UPDATE_ANIME = (data, callback) => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());
    dispatch(FIRESTORE_RESPONSE_NULL());
    console.log(data);
    await Baka.put("anime/update/" + data._id, data)
      .then((res) => {
        dispatch(SERVER_RESPONSE({ msg: res.data, status: res.status }));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
    callback();
  };
};

export const DELETE_ANIME = (id, entity, callback) => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());

    await Baka.get("anime/" + id)
      .then(async (res) => {
        let delete_ref = res.data.delete_ref;
        console.log(delete_ref);
        const firestore = firebase.storage();
        await Baka.delete("anime/" + id)
          .then((res) => {
            delete_ref.map((i, index) => {
              firestore
                .ref(i)
                .delete()
                .then(() => {
                  if (index === delete_ref.length - 1) {
                    dispatch(Search_Data(entity, () => {}));
                    dispatch(
                      FIRESTORE_RESPONSE({
                        msg: "Anime Media Deleted From Fire Store",
                        status: 200,
                      })
                    );
                    dispatch(
                      SERVER_RESPONSE({ msg: res.data, status: res.status })
                    );
                    callback();
                  }
                })
                .catch((err) => {
                  dispatch(FIRESTORE_RESPONSE_ERROR());
                  dispatch(
                    FIRESTORE_RESPONSE({ error: err.message, status: 404 })
                  );
                });
            });
          })
          .catch((error) => {
            if (error.response) {
              dispatch(SERVER_RESPONSE_ERROR());
              dispatch(
                SERVER_ERROR_RESPONSE({
                  error: error.response.data,
                  status: error.response.status,
                })
              );
            } else if (error.request) {
              dispatch(SERVER_RESPONSE_ERROR());
              dispatch(
                SERVER_ERROR_RESPONSE({
                  error: error.message,
                  status: 500,
                })
              );
            } else {
              dispatch(SERVER_RESPONSE_ERROR());
              dispatch(
                SERVER_ERROR_RESPONSE({
                  error: error.message,
                  status: 502,
                })
              );
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const ADD_RECENT = (data, callback) => {
  return async (dispatch) => {
    await Baka.post("recent/", data)
      .then((res) => {
        dispatch(
          SERVER_OPERATION_RESPONSE({ msg: res.data, status: res.status })
        );
        callback();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
        callback();
      });
  };
};

export const ADD_POPULAR = (data, callback) => {
  return async (dispatch) => {
    await Baka.post("popular/", {
      anime_id: data._id,
      pic: data.pic.url,
      title: data.title,
      genre: data.genre,
      des: data.des,
    })
      .then((res) => {
        dispatch(SERVER_RESPONSE({ msg: res.data, status: res.status }));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const DELETE_POPULAR = (id, entity, callback) => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());
    dispatch(FIRESTORE_RESPONSE_NULL());
    await Baka.delete("popular/" + id)
      .then((res) => {
        dispatch(Search_Data_popular(entity, () => {}));
        dispatch(SERVER_RESPONSE({ msg: res.data, status: res.status }));
        callback();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const GET_POPULAR = () => {
  return async (dispatch) => {
    await Baka.get("popular/")
      .then((res) => {
        dispatch(SERVER_RESPONSE(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const GET_GENRE = (genre) => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());
    dispatch(FIRESTORE_RESPONSE_NULL());
    await Baka.get("genre/" + genre)
      .then((res) => {
        console.log(res.data);
        dispatch(SERVER_RESPONSE(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const GET_ONGOING = () => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());
    dispatch(FIRESTORE_RESPONSE_NULL());
    await Baka.get("search/ongoing")
      .then((res) => {
        dispatch(SERVER_RESPONSE(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const GET_LATEST = () => {
  return async (dispatch) => {
    await Baka.get("search/latest")
      .then((res) => {
        dispatch(SERVER_RESPONSE(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const GET_LIST = (alpha) => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());
    dispatch(FIRESTORE_RESPONSE_NULL());
    await Baka.get("search/list/" + alpha)
      .then((res) => {
        dispatch(SERVER_RESPONSE(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const GET_SINGLE_Anime = (id, callback) => {
  return async (dispatch) => {
    await Baka.get("anime/" + id)
      .then((res) => {
        console.log(res.data);
        dispatch(SERVER_RESPONSE(res.data));
        callback(res.data._id);
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_ANIME_NOT_FOUND());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const ADD_BOOKMARK = (data, callback) => {
  return async (dispatch) => {
    console.log(data);
    await Baka.post("user/" + data.user_id + "/bookmarks", {
      anime_id: data.id,
      pic: data.pic,
      title: data.title,
    })
      .then((res) => {
        console.log(res.data);
        dispatch(SERVER_OPERATION_RESPONSE(res.data));
        dispatch(GET_PROFILE_DATA());
        callback();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const DELETE_BOOKMARK = (data, callback) => {
  return async (dispatch) => {
    console.log(data);
    await Baka.delete("user/" + data.user_id + "/bookmarks/" + data.index)
      .then((res) => {
        console.log(res.data);
        dispatch(SERVER_OPERATION_RESPONSE(res.data));
        dispatch(GET_PROFILE_DATA());
        callback();
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const LOGIN = (data, callback) => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());
    dispatch(FIRESTORE_RESPONSE_NULL());
    await Baka.post("user/login", {
      email: data.email,
      password: data.pass,
    })
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(SERVER_RESPONSE(res.data));
          localStorage.setItem("token", res.data.token);
          callback();
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(SERVER_RESPONSE(res.data));
          callback();
        }
      })
      .catch((err) => {
        dispatch(SERVER_RESPONSE_ERROR());
        dispatch(SERVER_RESPONSE({ error: err.message, status: 404 }));
      });

    //dispatch({ type: "SignUp", payload:  res.data });
  };
};

export const GET_HOME_POPULAR = () => {
  return async (dispatch) => {
    await Baka.get("popular/")
      .then((res) => {
        dispatch(POULAR(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const GET_HOME_RECENTS = () => {
  return async (dispatch) => {
    dispatch(SERVER_RESPONSE_NULL());
    dispatch(FIRESTORE_RESPONSE_NULL());
    await Baka.get("recent/")
      .then((res) => {
        console.log(res.data);
        dispatch(RECENTS(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const GET_HOME_ONGOING = () => {
  return async (dispatch) => {
    await Baka.get("search/ongoing")
      .then((res) => {
        dispatch(ONGOING(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const GET_HOME_LATEST = () => {
  return async (dispatch) => {
    await Baka.get("search/latest")
      .then((res) => {
        dispatch(LATEST(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.response.data,
              status: error.response.status,
            })
          );
        } else if (error.request) {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 500,
            })
          );
        } else {
          dispatch(SERVER_RESPONSE_ERROR());
          dispatch(
            SERVER_ERROR_RESPONSE({
              error: error.message,
              status: 502,
            })
          );
        }
      });
  };
};

export const HOME = () => {
  return async (dispatch) => {
    dispatch(GET_HOME_LATEST());
    dispatch(GET_HOME_ONGOING());
    dispatch(GET_HOME_POPULAR());
    dispatch(GET_HOME_RECENTS());
  };
};
