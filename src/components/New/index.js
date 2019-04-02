import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Header from "../Header";
import Form from "../Form";

class NewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, change: 0 };
  }

  reportError = () => {
    this.setState({ hasError: true });
  };

  clearError = () => {
    this.setState({ hasError: false });
  };

  resetForm = () => {
    console.log("reset!");
    this.setState({ change: Math.random() });
  };

  render() {
    console.log(this.props.selected);
    return (
      <div className="container">
        <Header
          {...this.props}
          hasError={this.state.hasError}
          resetForm={this.resetForm}
        />
        <Form
          {...this.props}
          change={this.state.change}
          reportError={this.reportError}
          clearError={this.clearError}
        />
      </div>
    );
  }
}

export default withRouter(NewEmployee);
