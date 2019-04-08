import React, { Component } from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top bg-light">
        <SearchBar query={this.props.query} search={this.props.search} />
        <div className="btn-group">
          <button
            type="button"
            className="btn reset"
            onClick={() => {
              this.props.reset();
            }}
          >
            Reset Filter
          </button>
          <button type="button" className="btn submit">
            <Link to="/new" className="submit-link">
              Add New Employee
            </Link>
          </button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
