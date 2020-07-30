import React from "react";
import Nav from "react-bootstrap/Nav";

const LoggedOut = () => {
  return (
    <React.Fragment>
      <Nav.Link href="/Login" data-testid="login">
        Login
      </Nav.Link>
      <Nav.Link eventKey={2} href="/signup" data-testid="signup">
        Sign Up
      </Nav.Link>
    </React.Fragment>
  );
};

export default LoggedOut;
