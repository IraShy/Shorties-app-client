import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Notes from "./Notes";
// import Note from "./Note";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/notes" component={Notes} />
        {/* <Route exact path="/notes/:id" component={Note} /> */}
      </Switch>
    </>
  );
};

export default App;
