import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import avatar from "../../utilities/default.png";

class Tbody extends Component {
  constructor(props) {
    super(props);
    this.state = { src: avatar };
  }

  componentDidMount() {
    axios.get(`/api/getavatar/${this.props._id}`).then(res => {
      if (res.data.avatar)
        this.setState({
          src: `/avatar/${res.data.avatar}`,
          avatar: res.data.avatar
        });
    });
  }

  render() {
    const style = { verticalAlign: "middle" };
    let params = {
      options: this.props.currentPage,
      query: this.props.query
    };
    return (
      <tr>
        <td style={style}>
          <img src={this.state.src} alt="avatar" className="image-avatar" />
        </td>
        <td style={style}>{this.props.name}</td>
        <td style={style}>{this.props.title}</td>
        <td style={style}>{this.props.gender}</td>
        <td style={style}>{this.props.startDate}</td>
        <td style={style}>{this.props.officePhone}</td>
        <td style={style}>{this.props.cellPhone}</td>
        <td style={style}>{this.props.sms}</td>
        <td style={style}>{this.props.email}</td>
        <td
          style={style}
          className="link"
          onClick={() => {
            if (this.props.manager)
              this.props.selectManager(
                this.props.manager._id,
                this.props.history
              );
          }}
        >
          {this.props.manager ? this.props.manager.name : ""}
        </td>
        <td
          style={style}
          className={this.props.directReports.length ? "link" : ""}
          onClick={() => {
            if (this.props.directReports.length)
              this.props.selectSubordinates(this.props._id, this.props.history);
          }}
        >
          {this.props.directReports.length}
        </td>
        <td style={style}>
          <Link to="/edit" className="link">
            <i
              className="fas fa-edit"
              onClick={() => {
                this.props.getOne(this.props._id);
                this.props.getAvatar(this.props._id);
              }}
            />
          </Link>
        </td>
        <td style={style}>
          <i
            className="fas fa-trash-alt"
            onClick={() => {
              this.props.deleteOne(this.props._id, params);
              this.props.deleteAvatar(this.state.avatar);
            }}
          />
        </td>
      </tr>
    );
  }
}

export default Tbody;
