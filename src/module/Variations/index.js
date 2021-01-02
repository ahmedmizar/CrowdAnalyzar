import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
import AnyInput from "./containers/AnyInput";
import "./styles/Input.scss";
import "./styles/Index.scss";

class Index extends Component {
  state = {
    booleanQuery: false
  }
  render() {

    return (
      <div className="variation-container">
        <h3>Create a New Sub-query</h3>
        <Form>
          <FormGroup>
            <CustomInput
              type="switch"
              id="customSwitch"
              name="customSwitch"
              label="Boolean Query Mode"
              onChange={(e) => this.setState({ booleanQuery: e.target.checked })}
            />
          </FormGroup>
        </Form>

        <Row>
          <Col md="12">
            <p><i className="fa fa-exclamation-triangle"></i> Disclaimer: Special query syntax is not supported yet (i.e user_id:id)</p>
            <AnyInput />
          </Col>
        </Row>

      </div>
    );
  }
}

export default Index