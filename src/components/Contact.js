import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { Consumer } from "../context";

export default class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onShowClick = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  };

  onDeleteClick = async (id, dispatch) => {
    // Delete the user info from out fake database..
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }

    // Similar to Action Creator
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              {
                <h4>
                  {`${name} `}
                  {/* Show the rest of details like email and phone */}
                  <i
                    onClick={this.onShowClick}
                    className="fas fa-sort-down"
                    style={{ cursor: "pointer" }}
                  ></i>

                  {/* Delete the User Entry */}
                  <i
                    onClick={() => this.onDeleteClick(id, dispatch)}
                    className="fas fa-times"
                    style={{ cursor: "pointer", float: "right", color: "red" }}
                  ></i>
                  {/* This is to edit the contact from the page */}
                  <Link to={`contact/edit/${id}`}>
                    <i
                      className="fas fa-pencil-alt"
                      style={{
                        cursor: "pointer",
                        float: "right",
                        color: "black",
                        marginRight: "1rem"
                      }}
                    ></i>
                  </Link>
                </h4>
              }
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
