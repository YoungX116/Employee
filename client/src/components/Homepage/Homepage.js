import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import NavBar from "./NavBar";
import List from "./List";
import Loading from "./Loading";

class Homepage extends Component {
  // componentDidMount() {
  //   if (this.props.route === "manager") {
  //     this.props.selectManager(this.props.manager[0]._id, this.props.history);
  //   }
  // }

  render() {
    return (
      <div>
        <NavBar
          query={this.props.query}
          search={this.props.search}
          reset={this.props.reset}
        />
        <List {...this.props} />
        <Loading isFetching={this.props.isFetching} />
      </div>
    );
  }
}

export default withRouter(Homepage);
// export default Homepage;
