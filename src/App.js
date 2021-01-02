import React, { Component } from "react";
import Container from "reactstrap/lib/Container";
import Variations from "./module/Variations/index";
class App extends Component {
  render() {
    return (
      <Container>
        {" "}
        <Variations />
      </Container>
    );
  }
}

export default App;
