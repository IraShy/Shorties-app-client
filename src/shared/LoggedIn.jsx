import React from "react";
import Nav from "react-bootstrap/Nav";

const LoggedIn = (props) => {
  const { isTeacher } = props.context;
  return (
    <React.Fragment>
      {isTeacher && (
        <Nav.Link className="nav-item nav-link" href="/cohorts">
          Cohorts
        </Nav.Link>
      )}
      <Nav.Link className="nav-item nav-link" href="/notes">
        Notes
      </Nav.Link>
      <Nav.Link href="/notes/create">
        <img
          src={require("../assets/add_note.png")}
          width="35"
          height="35"
          alt="icon"
        />
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
  );
};

export default LoggedIn;
