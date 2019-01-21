import React from "react";
import { Pane, Button } from "evergreen-ui";
import { Link } from "react-router-dom";

export const NavBar = props => {
  return (
    <Pane display="flex" padding={16} background="tealTint">
      {props.isAuthenticated && (
        <Button>
          <Link to="/profile">Profile</Link>
        </Button>
      )}
      <Link to="/adminview">
        <Button marginRight={12}>admin view</Button>
      </Link>
      <Link to="/">
        <Button marginRight={12} onClick={() => console.log("clicked")}>
          Landing Page
        </Button>
      </Link>

      <Button
        appearance="primary"
        intent="success"
        marginRight={12}
        iconBefore="log-in"
      >
        <a
          href={
            props.isAuthenticated
              ? "http://localhost:9001/auth/google/logout"
              : "http://localhost:9001/auth/google"
          }
        >
          {props.isAuthenticated ? "Logout" : "Login"}
        </a>
      </Button>
    </Pane>
  );
};
