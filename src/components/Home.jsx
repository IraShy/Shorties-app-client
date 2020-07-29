import React, { Component } from "react";
import { Context } from "../context/Context";
import "../stylesheets/Home.scss";

class Home extends Component {
  static contextType = Context;

  render() {
    return (
      <div className="ext">
        <h1 className="home">Shorties</h1>
        <div className="home-container">
          <span id="home-span">
            <p id="first-in-home">Coder students, get pumped!</p>
            <p>
              Shorties is here to keep your short notes and cheat sheets in one
              place.
            </p>
            <p>
              If your teacher wants to share helpful bits with you - guess what?
              they'll be here too!
            </p>
            <p id="question">
              <span className="question">"Is it    </span><span className="code">bundle</span><span className="question">    or    </span>
              <span className="code" id="code-2">bundle install</span> <span className="question">  ?..."</span> </p>
              <p>- It's either.
              Actually, <span className="code">bundle i</span> will work just as
              well.
            </p>
            <p>
              You don't have to remember everything, Shorties will do it for you
              ;)
            </p>
          </span>
        </div>
      </div>
    );
  }
}

export default Home;
