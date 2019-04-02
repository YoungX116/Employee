import React, { Component } from "react";

import Form from "./Form";

// HOC for Form
const withRouteChange = OldComponent => {
  class NewComponent extends Component {
    render() {
      const template = {
        new: {
          temp: ""
        },
        edit: {
          temp: ""
        }
      };

      // get the route from this.props
      // use new by default
      const route = this.props.route || "new";
      return <OldComponent {...template[route]} {...this.props} />;
    }
  }

  return NewComponent;
};

export default withRouteChange(Form);
