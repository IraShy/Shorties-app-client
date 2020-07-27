import React, { Component } from 'react';
import { Context } from "../context/Context";


class Home extends Component {
  static contextType = Context;
 
  render() { 
    return ( 
      <>
      <h1>Home</h1>
      </>
     );
  }
}
 
export default Home;