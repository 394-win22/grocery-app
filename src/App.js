import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useData } from "./utilities/firebase.js";
import GroceryList from "./components/GroceryList.js";
import AddNewItem from "./components/AddNewItem";

const App = () => {
  const [groceryList, loading, error] = useData("/");

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the grocery list...</h1>;

  return (
    <div className="App">
      <div className="grocery-list">
        <p className="list-header"> Shared List </p>
        {groceryList.items ? <GroceryList items={groceryList.items} /> : <></>}
        <div>
          <AddNewItem />
        </div>
      </div>
    </div>
  );
};

export default App;
