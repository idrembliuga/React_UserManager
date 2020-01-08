import React, { Component } from "react";
import axios from "axios";

// * This is where we will create the context object
const Context = React.createContext();

// Create provider .. that will hold the state ..
// Provider access to state for all components with it's wrapper
export class Provider extends Component {
	// State, render and did mount method.
	state = {
		contacts: [
			// Will have id, name, email. phone and other details of user
		],
		dispatch: action => {
			this.setState(state => reducer(state, action));
		}
	};
	async componentDidMount() {
		const res = await axios.get("https://jsonplaceholder.typicode.com/users");
		this.setState({ contacts: res.data });
	}

	// Hear we crate provider component
	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export const Consumer = Context.Consumer;

// We want reducer to add(POST), update(PUT) and Delete the api call
const reducer = (state, action) => {
	switch (action.type) {
		case "DELETE_CONTACT":
			return {
				//...state
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
