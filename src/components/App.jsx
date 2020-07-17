import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../shared/NavBar";
import Notes from "./Notes";
import Login from "./Login";
import SignUp from "./SignUp";
// import Note from "./Note";


import '../stylesheets/App.scss';


const App = () => {
  return (
    <>
      <NavBar />
     
      
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/notes" component={Notes} />
        {/* <Route exact path="/notes/:id" component={Note} /> */}
      </Switch>
    </>
  );
};

export default App;
