import React, { Component } from "react";

import Thead from "./Thead";
import Tbody from "./Tbody";

class List extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.props.employees.length &&
      !this.props.isFetching &&
      this.props.employees.length < this.props.pagination.totalDocs &&
      this.props.pagination.currentPage < this.props.pagination.totalPages
    ) {
      console.log("current employees", this.props.employees.length);
      console.log("page sort:", this.props.nextPage.sort);
      console.log("page:", this.props.nextPage.page);
      this.props.getNextPage({
        options: this.props.nextPage,
        query: this.props.query
      });
    }
  };

  tags = [
    "Avatar",
    "Name",
    "Title",
    "Gender",
    "Start Date",
    "Office Phone",
    "Cell Phone",
    "SMS",
    "Email",
    "Manager",
    "# of DR",
    "Edit",
    "Delete"
  ];

  width = [
    "5%",
    "9%",
    "9%",
    "7%",
    "9%",
    "9%",
    "9%",
    "9%",
    "9%",
    "9%",
    "8%",
    "4%",
    "4%"
  ];

  sortValue = [
    "",
    "name",
    "title",
    "gender",
    "startDate",
    "",
    "",
    "",
    "",
    "manager",
    "#ofDR",
    "",
    ""
  ];

  render() {
    return (
      <div className="table-responsive-sm">
        <table className="table table-hover">
          <thead>
            <tr>
              {this.tags.map((tag, index) => (
                <Thead
                  key={index}
                  tag={tag}
                  value={this.sortValue[index]}
                  currentPage={this.props.currentPage}
                  sortBy={
                    this.props.currentPage.sort
                      ? Object.keys(this.props.currentPage.sort)[0]
                      : ""
                  }
                  sort={this.props.sort}
                  width={this.width[index]}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {this.props.employees.map(record => {
              return (
                <Tbody
                  key={record._id}
                  {...record}
                  history={this.props.history}
                  currentPage={this.props.currentPage}
                  query={this.props.query}
                  getOne={this.props.getOne}
                  getAvatar={this.props.getAvatar}
                  deleteOne={this.props.deleteOne}
                  deleteAvatar={this.props.deleteAvatar}
                  selectManager={this.props.selectManager}
                  selectSubordinates={this.props.selectSubordinates}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
