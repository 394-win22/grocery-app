import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useData } from "./utilities/firebase.js";
import GroceryList from "./components/GroceryList.js";
import AddNewItem from "./components/AddNewItem";

const data = {
  title: "Red Shopping Cart",
  items: {
    "Cheez-It": {
      name: "Cheez-It",
      quantity: { Yvan: 2, Alex: 1 },
      total_quantity: 3,
      purchased: false,
      notes: "for the partyyy",
    },
    "Apple ea": {
      name: "Apples ea",
      quantity: { Hui: 6, Andrew: 1 },
      total_quantity: 7,
      purchased: false,
      notes: "",
    },
    "Artichoke Dip": {
      name: "Artichoke Dip",
      quantity: { Qing: 1, Kevin: 1 },
      total_quantity: 2,
      purchased: false,
      notes: "just get one if it's big",
    },
  },
};

const App = () => {
  const [groceryList, loading, error] = useData("/");

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the grocery list...</h1>;

  return (
    <div className="App">
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
