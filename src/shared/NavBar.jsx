import React, { Component } from "react";
import { Context } from "../context/Context";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import LoggedIn from "../shared/LoggedIn";
import LoggedOut from "../shared/LoggedOut";

class NavBar extends Component {
  static contextType = Context;

  onSearchChange(event) {
    this.context.search = event.target.value;
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    if (this.context.search) {
      let query = this.context.search;
      this.context.dispatchUser("search", query);
      this.context.search = "";
      document.getElementById("searchInput").value = "";
    }
  };

  renderNavBar = () => {
    const { currentUser } = this.context;
    return currentUser || localStorage.getItem("token") ? (
      <LoggedIn history={this.props.history} context={this.context} />
    ) : (
      <LoggedOut />
    );
  };

  render() {
    const path = window.location.pathname;
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="navbar_container"
      >
        <Navbar.Brand href="/">
          <img
            src={require("../assets/note_taking.png")}
            width="40"
            height="40"
            alt="icon"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {path === "/notes" && (
              <Form inline className="m-2" onSubmit={this.handleSearchSubmit}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 "
                  id="searchInput"
                  onChange={(e) => {
                    this.onSearchChange(e);
                  }}
                />
                <Button variant="outline-success">
                  <img
                    src={require("../assets/search.png")}
                    width="25"
                    height="25"
                    alt="icon"
                    type="submit"
                    onClick={this.handleSearchSubmit}
                  />
                </Button>
              </Form>
            )}
          </Nav>

          <Nav>{this.renderNavBar()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
