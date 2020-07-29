import React, { Component } from "react";
import { Context } from "../context/Context";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

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

  render() {
    const path = window.location.pathname;
    console.log(this.context)
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="/notes">
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
            )
  }
          </Nav>

          <Nav>
            {this.context.currentUser ? (
              <React.Fragment>
                <Nav.Link className="nav-item nav-link" href="/notes">
                  Notes
                </Nav.Link>
                <Nav.Link href="/notes/create">
                  <img
                    src={require("../assets/add_note.png")}
                    width="30"
                    height="30"
                    alt="icon"
                  />
                </Nav.Link>
                <Nav.Link className="nav-item nav-link" href="/cohorts">
                  Cohorts
                </Nav.Link>
                <Nav.Link className="nav-item nav-link" href="/categories">
                  Categories
                </Nav.Link>

                <Nav.Link
                  href="/login"
                  className="nav-item nav-link"
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link href="/Login" data-testid="login"> Login</Nav.Link>
                <Nav.Link eventKey={2} href="/signup" data-testid="signup">
                  Sign Up
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
