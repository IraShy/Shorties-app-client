import React, { Component } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import "../stylesheets/Home.scss";

class Home extends Component {
  static contextType = Context;

  render() {
    return (
      <div className="ext">
        <div className="home-container">
          <h1 className="home">Shorties</h1>
          <div className="card-home">
            <p className="home-header">Be productive</p>
            <div className="home-body">
              <p id="first-in-home">Coder students, get pumped!</p>
              <p>
                Shorties is here to keep your short notes and cheat sheets in
                one place.
              </p>
              <p>
                If your teacher wants to share helpful bits with you - guess
                what? they'll be here too!
              </p>
            </div>
          </div>
          <div className=" card-home" id="card-question">
            <div id="question">
              Should I use <span className="bundle">bundle</span> or{" "}
              <span className="bundle">bundle install</span>?
            </div>
            <div id="reply">
              {" "}
              Either... Actually, <span className="bundle">bundle i</span> will
              work just as well.
            </div>
          </div>
          <div className="card-home">
            <p className="home-header">Keep it together</p>
            <div className="home-body">
              <p>
                You don't have to remember everything,{" "}
                <span id="shorties-home">Shorties</span> will do it for you!
              </p>
              <div className="button-block">
                <Link to={"/login"}>
                  <button className="viewbutton" id="btn-home">
                    START
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
