import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useData } from "./utilities/firebase.js";
import GroceryList from './components/GroceryList.js' 




const App = () => {
  const [groceryList, loading, error] = useData("/");

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>;

  return (
    <div className="App">
      <GroceryList items = { groceryList.items } />
      <ul>
        {groceryList.items.map((value) => (
          <li>{value.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
