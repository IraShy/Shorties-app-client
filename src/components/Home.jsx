import React, { Component } from 'react';
import { Context } from "../context/Context";
import Dropdown from '../shared/Dropdown';

class Home extends Component {
  static contextType = Context;
 
  render() { 
    return ( 
      <>
      <Dropdown allCategories={this.context.categories}/>
      </>
     );
  }
}
 
export default Home;