import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ex_plugins/components/ScrollToTop";
// components
import Navbar from "./components/navbar/Navbar";
import Welcome from "./components/pages/Welcome";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import NotFound from "./components/special/NotFound";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Category from "./components/pages/Category";
import Question from "./components/pages/Question";
import AskQuestion from "./components/pages/AskQuestion";

const App = () => {
  return (
    <HashRouter>
      <div>
        <Navbar/>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={ Welcome } />
            <Route path="/signup" component={ SignUp } />
            <Route path="/signin" component={ SignIn } />
            <Route path="/profile/:profileId" component={ Profile } />
            <Route path="/home" component={ Home } />
            <Route path="/category/:category" component={ Category } />
            <Route path="/question/:questionId" component={ Question } />
            <Route path="/ask-question/" component={ AskQuestion } />
            {/* Below is to handle 404 requests */}
            <Route component={ NotFound } />
          </Switch>
        </ScrollToTop>
      </div>
    </HashRouter>
  )
}

export default App;