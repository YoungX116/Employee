import React, { Component } from "react";
import { omit } from "lodash";
// import { withRouter } from "react-router-dom";

import Homepage from "./Homepage";

// HOC for Homepage
const withRouteChange = OldComponent => {
  class NewComponent extends Component {
    render() {
      const template = {
        home: {
          employees: this.props.employees
        },
        manager: {
          employees: this.props.manager
        },
        subordinate: {
          employees: this.props.subordinates
        }
      };

      // get the route from this.props
      // use home by default
      const route = this.props.route || "home";
      const newProps = omit(this.props, "employees");
      return <OldComponent {...template[route]} {...newProps} />;
    }
  }

  return NewComponent;
};

// export default withRouter(withRouteChange(Homepage));
export default withRouteChange(Homepage);
