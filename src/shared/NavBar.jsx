import React from "react";
import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFileCode, faSearch } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">
        {" "}
        <FontAwesomeIcon icon={faFileCode} size="2x" color="grey" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">
              <FontAwesomeIcon icon={faSearch} />
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
