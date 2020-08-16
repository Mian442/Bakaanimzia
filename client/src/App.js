import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Component/NavBar/NavBar";
import Menubar from "./Component/Menubar/Menubar";

import "./App.css";

import Login from "./Component/Auth/Login";
import Signup from "./Component/Auth/Signup";
import User from "./Component/Profiles/User";
import NewEpisode from "./Component/Profiles/Component/RightSide/New Episode/NewEpisode";
import NewAdmin from "./Component/Profiles/Component/RightSide/New Admin/NewAdmin";
import Profile from "./Component/Profiles/Component/RightSide/Profile/Profile";
import Forbiden from "./Component/Forbiden Page/404Forbiden";
import DeleteEpisode from "./Component/Profiles/Component/RightSide/Delete Episode/DeleteEpisode";
import DeleteAnime from "./Component/Profiles/Component/RightSide/Delete Anime/DeleteAnime";
import UpdateEpisode from "./Component/Profiles/Component/RightSide/Update Episode/UpdateEpisode";
import UpdateAnime from "./Component/Profiles/Component/RightSide/Update Anime/UpdateAnime";
import NotAuth from "./Component/Not Auth/NotAuth";
import Home from "./Component/Home/Home";
import Genre from "./Component/Genre/Genre";
import Bookmark from "./Component/Profiles/Component/RightSide/Bookmark/Bookmark";
import List from "./Component/List/List";
import Footer from "./Component/Footer/Footer";
import New from "./Component/Profiles/Component/RightSide/New Anime/New";
import Mian from "./Component/Profiles/Component/Main/Mian";
import DeletePopular from "./Component/Profiles/Component/RightSide/Delete Popular/DeletePopular";
import AddPopular from "./Component/Profiles/Component/RightSide/Add Popular/AddPopular";
import Popular from "./Component/Popular/Popular";
import Ongoing from "./Component/Ongoing/Ongoing";
import Latest from "./Component/Latest/Latest";
import Anime from "./Component/Anime/Anime";
import View from "./Component/View/View";
import Search from "./Component/Search/Search";

function App() {
  return (
    <Router>
      <div style={{ flex: 1 }}>
        <NavBar />
        <Menubar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/not-found" component={Forbiden} />
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
          <Route path="/not-authorized" exact component={NotAuth} />
          <Route path="/search/:search" exact component={Search} />
          <Route path="/anime/:id" exact component={Anime} />
          <Route path="/view/:id/:epid" exact component={View} />
          <Route path="/latest" exact component={Latest} />
          <Route path="/ongoing" exact component={Ongoing} />
          <Route path="/popular" exact component={Popular} />
          <Route path="/animelist/:alpha" exact component={List} />
          <Route path="/animelist" exact component={List} />
          <Route path="/genre/:genre" exact component={Genre} />
          <Route path="/genre" exact component={Genre} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
