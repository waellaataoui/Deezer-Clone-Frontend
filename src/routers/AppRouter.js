import React from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop";
import HomePage from "../pages/HomePage"
import ArtistHomePage from "../pages/ArtistHomePage"
import Login from "../pages/Login";
import ArtistLogin from "../pages/ArtistLogin";
import ArtistRegister from "../pages/ArtistRegister";
import SocialLoginError from "../pages/SocialLoginError"
import UploadPage from "../pages/UploadPage"
import UserRoute from "../routers/UserRoute"
import ArtistRoute from "../routers/ArtistRoute"
import SearchPage from "../pages/SearchPage";
import FilteredSearchPage from "../pages/FilteredSearchPage";
import ExplorePage from "../pages/ExplorePage";
import PlaylistPage from "../pages/PlaylistPage";
import ProfileHighlights from "../pages/ProfileHighlights";
import ProfileSection from "../pages/ProfileSection";
import AlbumPage from "../pages/AlbumPage";
import Player from "../components/Player";
import Register from "../pages/Register";
import ArtistHighlights from "../pages/ArtistHighlights";
const AppRouter = () => (
  <Router >
        <ScrollToTop />

    <>
      <Switch>
        <UserRoute exact={true} path="/" component={HomePage} />
        <UserRoute path="/login-error" component={SocialLoginError} />
        <UserRoute path="/login" component={Login} />
        <UserRoute path="/register" component={Register} />
        {/* <UserRoute path="/explore/:channel" component={ExplorePage} /> */}
        <UserRoute path="/explore" component={ExplorePage} />
        <UserRoute path="/profile/:id/:section" component={ProfileSection} />
        <UserRoute path="/profile/:id/" component={ProfileHighlights} />
        <UserRoute path="/artists/:id/" component={ArtistHighlights} />
        <UserRoute path="/playlist/:id" component={PlaylistPage} />
        <UserRoute path="/album/:id" component={AlbumPage} />

        <UserRoute path="/search/:keywords/:filter" component={FilteredSearchPage} />
        <UserRoute path="/search/:keywords" component={SearchPage} />

        <ArtistRoute exact={true} path="/artist" component={ArtistHomePage} />
        <ArtistRoute path="/artist/login" component={ArtistLogin} />
        <ArtistRoute path="/artist/register" component={ArtistRegister} />
        <ArtistRoute path="/artist/upload" component={UploadPage} />

        <ArtistRoute path="/artist/*" component={() => <div>not found</div>} />

        <UserRoute component={() => <div>not found</div>} />

        {/* <Route path="/login" component={LoginPage} /> */}
      </Switch>
      <Player></Player>
    </>

  </Router>
);

export default AppRouter;
