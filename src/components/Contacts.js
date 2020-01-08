import React, { Component, Fragment } from "react";
import Contact from "./Contact";
import { Consumer } from "../context";

export default class Contacts extends Component {
	render() {
		return (
			<Consumer>
				{value => {
					const { contacts } = value;
					return (
						<Fragment>
							<h1 className="display-4 mb-2">
								<span className="text-danger">Contact</span>
								{/* List the contact by calling get API */}
								{contacts.map(contact => (
									<Contact key={contact.id} contact={contact}></Contact>
								))}
							</h1>
						</Fragment>
					);
				}}
			</Consumer>
		);
	}
}
