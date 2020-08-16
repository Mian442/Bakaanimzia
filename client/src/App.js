import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar/NavBar";
import Menubar from "./Components/Menubar/Menubar";

import "./App.css";

import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import User from "./Components/Profiles/User";
import NewEpisode from "./Components/Profiles/Component/RightSide/New Episode/NewEpisode";
import NewAdmin from "./Components/Profiles/Component/RightSide/New Admin/NewAdmin";
import Profile from "./Components/Profiles/Component/RightSide/Profile/Profile";
import Forbiden from "./Components/Forbiden Page/404Forbiden";
import DeleteEpisode from "./Components/Profiles/Component/RightSide/Delete Episode/DeleteEpisode";
import DeleteAnime from "./Components/Profiles/Component/RightSide/Delete Anime/DeleteAnime";
import UpdateEpisode from "./Components/Profiles/Component/RightSide/Update Episode/UpdateEpisode";
import UpdateAnime from "./Components/Profiles/Component/RightSide/Update Anime/UpdateAnime";
import NotAuth from "./Components/Not Auth/NotAuth";
import Home from "./Components/Home/Home";
import Genre from "./Components/Genre/Genre";
import Bookmark from "./Components/Profiles/Component/RightSide/Bookmark/Bookmark";
import List from "./Components/List/List";
import Footer from "./Components/Footer/Footer";
import New from "./Components/Profiles/Component/RightSide/New Anime/New";
import Mian from "./Components/Profiles/Component/Main/Mian";
import DeletePopular from "./Components/Profiles/Component/RightSide/Delete Popular/DeletePopular";
import AddPopular from "./Components/Profiles/Component/RightSide/Add Popular/AddPopular";
import Popular from "./Components/Popular/Popular";
import Ongoing from "./Components/Ongoing/Ongoing";
import Latest from "./Components/Latest/Latest";
import Anime from "./Components/Anime/Anime";
import View from "./Components/View/View";
import Search from "./Components/Search/Search";

function App() {
  return (
    <Router>
      <div style={{ flex: 1 }}>
        <NavBar />
        <Menubar />
        <Switch>
          <Route path="/login" exact Components={Login} />
          <Route path="/signup" Components={Signup} />
          <Route path="/not-found" Components={Forbiden} />
          <Route
            path="/profile"
            exact
            children={
              <User
                content={<Mian />}
                var={{ NewAnime: null, NewEpisode: null }}
              />
            }
          />
          <Route
            path="/profile/anime/new"
            exact
            children={
              <User content={<New />} var={{ NewAnime: "contained" }} />
            }
          />
          <Route
            path="/profile/anime/add/popular"
            exact
            children={
              <User content={<AddPopular />} var={{ Popular: "contained" }} />
            }
          />
          <Route
            path="/profile/anime/delete/popular"
            exact
            children={
              <User
                content={<DeletePopular />}
                var={{ Populardel: "contained" }}
              />
            }
          />
          <Route
            path="/profile/anime/new_episode"
            exact
            children={
              <User
                content={<NewEpisode />}
                var={{ NewEpisode: "contained" }}
              />
            }
          />
          <Route
            path="/profile/anime/new_admin"
            exact
            children={
              <User content={<NewAdmin />} var={{ NewAdmin: "contained" }} />
            }
          />
          <Route
            path="/profile/anime/update_anime"
            exact
            children={
              <User content={<UpdateAnime />} var={{ UpdateAn: "contained" }} />
            }
          />
          <Route
            path="/profile/anime/update_episode"
            exact
            children={
              <User
                content={<UpdateEpisode />}
                var={{ UpdateEp: "contained" }}
              />
            }
          />
          <Route
            path="/profile/anime/delete_anime"
            exact
            children={
              <User content={<DeleteAnime />} var={{ DeleteAn: "contained" }} />
            }
          />
          <Route
            path="/profile/anime/delete_episode"
            exact
            children={
              <User
                content={<DeleteEpisode />}
                var={{ DeleteEp: "contained" }}
              />
            }
          />
          <Route
            path="/profile/user/"
            exact
            children={
              <User content={<Profile />} var={{ Profile: "contained" }} />
            }
          />
          <Route
            path="/profile/user/bookmarks"
            exact
            children={
              <User content={<Bookmark />} var={{ Bookmark: "contained" }} />
            }
          />
          <Route path="/not-authorized" exact Components={NotAuth} />
          <Route path="/search/:search" exact Components={Search} />
          <Route path="/anime/:id" exact Components={Anime} />
          <Route path="/view/:id/:epid" exact Components={View} />
          <Route path="/latest" exact Components={Latest} />
          <Route path="/ongoing" exact Components={Ongoing} />
          <Route path="/popular" exact Components={Popular} />
          <Route path="/animelist/:alpha" exact Components={List} />
          <Route path="/animelist" exact Components={List} />
          <Route path="/genre/:genre" exact Components={Genre} />
          <Route path="/genre" exact Components={Genre} />
          <Route path="/" exact Components={Home} />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
