import React from "react";
import "./App.css";
import { Provider } from "./context";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact"

function App() {
	return (
		<div className="App">
			{/* This is where we will provide state management connection */}
			<Provider>
				<div>
					<BrowserRouter>
						<Header branding="User Manager"></Header>
						<div className="container">
							<Switch>
								<Route exact path="/" component={Contacts}></Route>
								<Route exact path="/about" component={About}></Route>
								<Route exact path="/contact/add" component={AddContact}></Route>
							</Switch>
						</div>
					</BrowserRouter>
				</div>
			</Provider>
		</div>
	);
}

export default App;
