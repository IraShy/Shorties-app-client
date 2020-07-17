import React from "react";
import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">
        <img src={require('../assets/note_taking.png')} width="40" height="40" alt="icon"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Form inline className="m-2">
            <FormControl type="text" placeholder="Search" className="mr-sm-2 " />
            <Button variant="outline-success">
              <img src={require('../assets/search.png')} width="25" height="25" alt="icon"/>
            </Button>
          </Form>
          <Nav.Link href="/notes/create">add</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/Login"> login</Nav.Link>
          <Nav.Link eventKey={2} href="/sign-up">
            Sign Up
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
