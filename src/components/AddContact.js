import React, { Component } from "react";
import { Consumer } from "../context";
import axios from "axios";
import TextInputGroup from "./TextInputGroup";

export default class AddContact extends Component {
  // state to save the addition
  state = {
    name: "",
    phone: "",
    email: "",
    errors: {}
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value.trimLeft() });
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    //*check for errors*//
    const errors = {};
    if (!name) errors.name = "Name is requiered";
    if (!email) errors.email = "Email is requiered";
    if (!phone) errors.phone = "Phone is requiered";
    this.setState({ errors });

    if (!Object.keys(errors).length) {
      const newContact = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim()
      };
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newContact
      );
      dispatch({ type: "ADD_CONTACT", payload: res.data });
      this.setState({
        name: "",
        email: "",
        phone: "",
        errors: {}
      });
      //redirect the page to contacts home page ..
      this.props.history.push("/");
    }
  };
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {({ dispatch }) => {
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={e => this.onSubmit(dispatch, e)}>
                  <TextInputGroup
                    label="Name"
                    autoFocus={true}
                    type="text"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  ></TextInputGroup>
                  <TextInputGroup
                    label="Email"
                    autoFocus={true}
                    type="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  ></TextInputGroup>
                  
                  <TextInputGroup
                    label="Phone"
                    autoFocus={true}
                    type="number"
                    name="phone"
                    placeholder="Enter Phone Number..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  ></TextInputGroup>
                  <input
                    type="submit"
                    className="btn btn-light btn-lg btn-block"
                    value="Add Contact"
                  ></input>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
