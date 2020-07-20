import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import NavBar from "../shared/NavBar";
import { Context, dispatchUser } from "../context/Context";
import Notes from "./Notes";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import NotFound from "./NotFound";
import AddNote from "./AddNote";

import "../stylesheets/App.scss";

class App extends Component {
  state = { notes: [], search: "", categories: [], dispatchUser: dispatchUser.bind(this) };
  render() {
    return (
      <Context.Provider value={this.state}>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <ProtectedRoute exact path="/notes" component={Notes} />
          <ProtectedRoute exact path="/notes/create" component={AddNote} />

          {/* <Route exact path="/notes/:id" component={Note} /> */}
          <Route component={NotFound} />
        </Switch>
      </Context.Provider>
    );
  }
}


export default App;
