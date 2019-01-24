import React, { Component } from "react";
import { Pane, Card, Text } from "evergreen-ui";
import "./MainPage.scss";

export default class Public extends Component {
  render() {
    return (
      <Pane
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={"MainPageWrapper"}
      >
        <Text>
          Welcome to Hyfer, the calendar for HackYourFuture's classes.{" "}
        </Text>
      </Pane>
    );
  }
}
