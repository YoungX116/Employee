import React, { Component } from "react";

import NavBar from "./NavBar";

// HOC for NavBar
const withRouteChange = OldComponent => {
  class NewComponent extends Component {
    render() {
      const template = {
        new: {
          head: "New Employee",
          submit: "Submit"
        },
        edit: {
          head: "Edit Employee",
          submit: "Modify"
        }
      };

      // get the route from this.props
      // use new by default
      const route = this.props.route || "new";
      return (
        <OldComponent
          {...template[route]}
          hasError={this.props.hasError}
          resetForm={this.props.resetForm}
        />
      );
    }
  }

  return NewComponent;
};

export default withRouteChange(NavBar);
