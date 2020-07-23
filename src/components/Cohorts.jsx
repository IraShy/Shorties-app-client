import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

class Cohorts extends Component {
  static contextType = Context;

  renderCohorts = () => {
    return (
    <p>in Cohorts</p>
    )
  }

  render() {
    
      return <React.Fragment>{this.renderCohorts}</React.Fragment>;
    
  }
}

export default Cohorts;