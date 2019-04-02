import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.props.search(e.target.value);
  };

  onInputChange = e => {
    this.setState({ query: e.target.value });
    this.props.search(e.target.value);
  };

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="search employee..."
          value={
            Object.keys(this.props.query).length === 0 &&
            this.props.query.constructor === Object
              ? ""
              : this.state.query
          }
          onChange={this.onInputChange}
        />
        <i className="fa fa-search search-icon" />
      </div>
    );
  }
}

export default SearchBar;
