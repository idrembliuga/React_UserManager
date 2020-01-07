import React, { Component } from "react";
import axios from "axios";

// *This is where i will create a context object
const Context = React.createContext();

// Create a Provider ... that will hold the state
// Provider access to state for all components with it's wrapper

export class Provider extends Component {
  state = {
    contacts: [
      // will add id, name, email, phone of user
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ contacts: res.data });
    console.log(this.state.contacts);
  }

  // Provider component with state as props
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Contex.Consumer;

const reducer = (state, action) => {
  // reducer to add (POST, UPDATE, PUT, Delete)

  switch (action.type) {
    case "DELETE_CONTACT":
      //return state
      return {
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        contacts: [action.payload, ...state.contacts]
      };
    case "UPDATE_CONTACT":
      return {
        contacts: state.contacts.map(contact => {
          if (contact.id === action.payload.id) {
            contact = action.payload;
          }
          return contact;
        })
      };
    default:
      return state;
  }
};
