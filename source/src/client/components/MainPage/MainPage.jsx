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
        height={"calc(100% - 66px)"}
      >
        <Card
          paddingX={"calc(32px + 2vw)"}
          paddingY={"calc(24px + 2vh)"}
          textAlign="center"
          width={"calc(100% - 20vw)"}
          backgroundColor={"rgba(0, 0, 0,.25)"}
        >
          <Pane>
            <Text
              fontSize={"calc(36px + 2vw)"}
              color="white"
              lineHeight={2}
              fontWeight={900}
              fontFamily="Bad Script"
              letterSpacing={6}
              TextTransform="capitalize"
            >
              Welcome to Hyfer
            </Text>
          </Pane>

          <Pane>
            <Text
              fontSize={"calc(16px + 1vw)"}
              color="white"
              fontStyle="italic"
              lineHeight={2}
              fontWeight={100}
              fontFamily="Open Sans"
              letterSpacing={1}
            >
              The curriculum calendar for HackYourFuture
            </Text>
          </Pane>
        </Card>
      </Pane>
    );
  }
}
