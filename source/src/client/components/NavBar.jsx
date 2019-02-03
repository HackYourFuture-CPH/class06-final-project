import React from "react";
import { Pane, Button } from "evergreen-ui";
import { Link } from "react-router-dom";
import hyfLogo from "../assets/logo.svg";

export const NavBar = props => {
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      paddingLeft={16}
      paddingRight={16}
      paddingTop={8}
      paddingBottom={8}
      background="tealTint"
    >
      <Pane width={300} height={50}>
        <img
          src={hyfLogo}
          alt="logo"
          style={{ width: "100%", height: "100%" }}
        />
      </Pane>
      <Pane display="flex" alignItems="center">
        <Link to="/">
          <Button marginRight={12}>Home</Button>
        </Link>
        {props.isAuthenticated && (
          <>
            <Link to="/adminview">
              <Button marginRight={12}>Admin</Button>
            </Link>

            <Link to="/profile">
              <Button marginRight={12}>Profile</Button>
            </Link>
          </>
        )}

        <Button
          appearance="primary"
          intent="success"
          marginRight={12}
          iconBefore={props.isAuthenticated ? "log-out" : "log-in"}
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
    </Pane>
  );
};
