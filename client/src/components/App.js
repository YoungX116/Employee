import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

import Homepage from "./Homepage";
import NewEmployee from "./New";
import EditEmployee from "./Edit";

class App extends Component {
  componentDidMount() {
    console.log("Homepage component did mount");

    let params = {
      options: this.props.currentPage,
      query: this.props.query
    };
    this.props.getCurrent(params);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route
              exact={true}
              path="/"
              render={() => <Homepage route="home" {...this.props} />}
            />
            <Route
              path="/manager"
              render={() => <Homepage route="manager" {...this.props} />}
            />
            <Route
              path="/subordinate"
              render={() => <Homepage route="subordinate" {...this.props} />}
            />
            <Route
              path="/new"
              render={() => <NewEmployee route="new" {...this.props} />}
            />
            <Route
              path="/edit"
              render={() => <EditEmployee route="edit" {...this.props} />}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.apiRequest.isFetching,
    employees: state.apiRequest.employees,
    manager: state.apiRequest.manager,
    subordinates: state.apiRequest.subordinates,
    selected: state.apiRequest.selected,
    pagination: state.apiRequest.pagination,
    currentPage: state.apiRequest.currentPage,
    nextPage: state.apiRequest.nextPage,
    query: state.apiRequest.query
  };
};

export default connect(
  mapStateToProps,
  actions
)(App);
