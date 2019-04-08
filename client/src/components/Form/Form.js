import React, { Component } from "react";

import Avatar from "./Avatar";
import avatar from "./default.png";
import white from "./white.png";

import validateFormInput from "../../utilities/ValidateFormInput";
import validateFormSubmit from "../../utilities/ValidateFormSubmit";
import Error from "./Error";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.route === "new" ? avatar : white,
      name: "",
      title: "",
      gender: "",
      startDate: "",
      officePhone: "",
      cellPhone: "",
      sms: "",
      email: "",
      manager: "",
      error: []
    };
  }

  componentDidUpdate(prevProps) {
    // it would cause an extra re-rendering which can affect the component performance.
    console.log("key", this.props.change);
    if (
      this.props.selected !== prevProps.selected ||
      this.props.change !== prevProps.change
    ) {
      let selected = this.props.selected;
      console.log("selected", selected);
      if (this.props.route === "new") {
        this.setState({
          avatar: avatar,
          name: "",
          title: "",
          gender: "",
          startDate: "",
          officePhone: "",
          cellPhone: "",
          sms: "",
          email: "",
          manager: "",
          error: [],
          avatarKey: Math.random()
        });
        this.props.clearError();
      } else {
        this.setState({
          ...selected,
          manager: selected.manager ? selected.manager._id : "",
          error: [],
          avatarKey: Math.random()
        });
        this.props.clearError();
      }
    }

    return true;
  }

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.state.error.length === 0 && this.validateSubmit()) {
      let data = new FormData();
      data.append(
        "avatar",
        document.querySelector('input[type="file"]').files[0]
      );
      data.append("name", this.state.name);
      data.append("title", this.state.title);
      data.append("gender", this.state.gender);
      data.append("startDate", this.state.startDate);
      data.append("officePhone", this.state.officePhone);
      data.append("cellPhone", this.state.cellPhone);
      data.append("sms", this.state.sms);
      data.append("email", this.state.email);
      data.append("manager", this.state.manager);

      let params = {
        options: this.props.currentPage,
        query: this.props.query
      };

      if (this.props.route === "new") {
        this.props.insertOne(data, params, this.props.history);
      } else if (this.props.route === "edit") {
        this.props.updateOne(
          this.props.selected._id,
          data,
          params,
          this.props.history
        );
      }
    } else {
      this.props.reportError();
    }
  };

  handleInputChange = e => {
    e.persist();
    const target = e.target.name;
    const value = e.target.value;
    this.setState({ [target]: value });

    new Promise((resolve, reject) => {
      let error = this.validateInput(target, value);
      resolve(error);
    })
      .then(error => {
        if (!value || !error) this.resetError(e);
      })
      .then(() => {
        if (this.state.error.length > 0) this.props.reportError();
        else this.props.clearError();
      });
  };

  handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log("image upload: ", file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.setState({
        avatar: reader.result
      });
    };
  };

  validateInput = (field, value, optiaonal) => {
    let error = validateFormInput(field, value, optiaonal);
    if (error !== null) {
      this.setState({
        error: [
          ...this.state.error.filter(err => {
            return err.field !== field;
          }),
          error
        ]
      });
    }
    return error;
  };

  validateSubmit = () => {
    const errorArray = validateFormSubmit(this.state);
    if (errorArray.length === 0) return true;
    else {
      this.setState({ error: errorArray });
      return false;
    }
  };

  resetError = e => {
    if (this.state.error.length > 0) {
      this.setState({
        error: this.state.error.filter(err => {
          return err.field !== e.target.name;
        })
      });
    }
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleFormSubmit}
          id="form"
          method="post"
          encType="multipart/form-data"
          noValidate
        >
          <div className="form-row">
            <div className="col-md-6">
              <Avatar
                src={this.state.avatar}
                handleImageChange={this.handleImageChange}
                avatarKey={this.state.avatarKey}
              />
            </div>

            <div className="col-md-6">
              <div className="form-group col-10">
                <label htmlFor="name">Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                  onFocus={this.resetError}
                />
                <Error error={this.state.error} field="name" />
              </div>

              <div className="form-group col-10">
                <label htmlFor="title">Title:</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  id="title"
                  onChange={this.handleInputChange}
                  value={this.state.title}
                  onFocus={this.resetError}
                />
                <Error error={this.state.error} field="title" />
              </div>

              <div className="form-group col-10">
                <label htmlFor="gender">Gender:</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="M"
                    onChange={this.handleInputChange}
                    checked={this.state.gender === "M"}
                    onFocus={this.resetError}
                  />
                  <label className="form-check-label" htmlFor="gender">
                    {" "}
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="F"
                    onChange={this.handleInputChange}
                    checked={this.state.gender === "F"}
                    onFocus={this.resetError}
                  />
                  <label className="form-check-label" htmlFor="gender">
                    {" "}
                    Female
                  </label>
                </div>
                <Error error={this.state.error} field="gender" />
              </div>

              <div className="form-group col-10">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  className="form-control"
                  type="date"
                  name="startDate"
                  id="startDate"
                  onChange={this.handleInputChange}
                  value={this.state.startDate}
                  onFocus={this.resetError}
                />
                <Error error={this.state.error} field="startDate" />
              </div>

              <div className="form-group col-10">
                <label htmlFor="officePhone">Office Phone:</label>
                <input
                  className="form-control"
                  type="text"
                  name="officePhone"
                  id="officePhone"
                  onChange={this.handleInputChange}
                  value={this.state.officePhone}
                  onFocus={this.resetError}
                />
                <Error error={this.state.error} field="officePhone" />
              </div>

              <div className="form-group col-10">
                <label htmlFor="cellPhone">Cell Phone:</label>
                <input
                  className="form-control"
                  type="text"
                  name="cellPhone"
                  id="cellPhone"
                  onChange={this.handleInputChange}
                  value={this.state.cellPhone}
                  onFocus={this.resetError}
                />
                <Error error={this.state.error} field="cellPhone" />
              </div>

              <div className="form-group col-10">
                <label htmlFor="sms">SMS:</label>
                <input
                  className="form-control"
                  type="text"
                  name="sms"
                  id="sms"
                  onChange={this.handleInputChange}
                  value={this.state.sms}
                  onFocus={this.resetError}
                />
                <Error error={this.state.error} field="sms" />
              </div>

              <div className="form-group col-10">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                  onFocus={this.resetError}
                />
                <Error error={this.state.error} field="email" />
              </div>

              <div className="form-group col-10">
                <label htmlFor="manager">Manager:</label>
                <select
                  className="form-control custom-select "
                  name="manager"
                  id="manager"
                  onChange={this.handleInputChange}
                  onFocus={this.resetError}
                >
                  <option value="" defaultValue>
                    None
                  </option>
                  <option value="5ca062bf5315a623b0ebba13">One</option>
                  <option value="5c9c042d223f6a259c72beab">Two</option>
                </select>
                <Error error={this.state.error} field="manager" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
