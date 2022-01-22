import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useData } from "./utilities/firebase.js";
import GroceryList from "./components/GroceryList.js";
import AddNewItem from "./components/AddNewItem";
import { signInWithGoogle, useUserState, signOut } from "./utilities/firebase.js";

const App = () => {
  const [groceryList, loading, error] = useData("/");
  const [user] = useUserState();

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the grocery list...</h1>;

  const SignInButton = () => (
    <button
      className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}
    >
      Sign In
    </button>
  );

  const SignOutButton = () => (
	<button className="btn btn-secondary btn-sm"
		onClick={() => signOut()}>
	  Sign Out
	</button>
  );


  return (
    <div className="App">
	  <div>
	  { user ? <SignOutButton /> : <SignInButton /> }
	  </div>
      <div className="grocery-list">
        <p className="list-header"> Shared List </p>
        <GroceryList items={groceryList.items} />

        <div>
          <AddNewItem items={groceryList.items} />
        </div>
      </div>
    </div>
  );
};

export default App;
