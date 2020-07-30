import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { loadReCaptcha } from "react-recaptcha-google";
import NavBar from "../shared/NavBar";
import { Context, dispatchUser } from "../context/Context";
import Notes from "./Notes";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import NotFound from "./NotFound";
import AddNote from "./AddNote";
import ShowNote from "./ShowNote";
import EditNote from "./EditNote";
import AddCohort from "./AddCohort";
import Cohorts from "./Cohorts";
import ShowCohort from "./ShowCohort";
import Categories from "./Categories";
import ShowCategory from "./ShowCategory";
import CompletedNotes from "./CompletedNotes";
import "../stylesheets/App.scss";

class App extends Component {
  state = {
    notes: [],
    search: "",
    categories: [],
    dispatchUser: dispatchUser.bind(this),
  };

  componentDidMount() {
    loadReCaptcha();
  }

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
          <ProtectedRoute
            exact
            path="/notes/completed"
            component={CompletedNotes}
          />
          <ProtectedRoute exact path="/notes/:id" component={ShowNote} />
          <ProtectedRoute exact path="/notes/:id/edit" component={EditNote} />
          <ProtectedRoute exact path="/cohorts" component={Cohorts} />
          <ProtectedRoute exact path="/cohorts/create" component={AddCohort} />
          <ProtectedRoute exact path="/cohorts/:id" component={ShowCohort} />

          <ProtectedRoute exact path="/categories" component={Categories} />
          <ProtectedRoute
            exact
            path="/categories/:id"
            component={ShowCategory}
          />

          <Route component={NotFound} />
        </Switch>
      </Context.Provider>
    );
  }
}

export default App;
