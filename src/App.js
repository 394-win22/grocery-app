import React from "react";
import "./App.css";
import { useData } from "./utilities/firebase.js";
import GroceryList from "./components/GroceryList.js";
import UserGroceryList from "./components/UserGroceryList.js";
import ButtonAppBar from "./components/AppBar.js";
import { Button } from "@mui/material";
import AddNewItem from "./components/AddNewItem";
import SimpleBottomNavigation from "./components/BottomNavBar";
import CheckoutButton from "./components/CheckoutButton";

const App = () => {
  const [groceryList, loading, error] = useData("/");

  // Nav bar value passed into SimpleBottomNavigation & GroceryList
  const [navValue, setNavValue] = React.useState(0);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the grocery list...</h1>;

  return (
    <div className="App">
      <div style={{ height: "36px" }}>
        <ButtonAppBar />
      </div>
      <div className="grocery-list">
        <GroceryList
          items={groceryList.items}
          users={groceryList.users}
          navValue={navValue}
        />
        <div
          style={{
            position: "sticky",
            bottom: "80px",
            width: "90%",
            display: "flex",
            justifyContent: "right",
            maxWidth: "600px",
          }}
        >
          {
            navValue === 0 ? (
              <AddNewItem />
            ) : (
              <></>
            ) /*<CheckoutButton items={groceryList.items}></CheckoutButton>*/
          }
        </div>

        {/* <div className="grocery-list">
        <UserGroceryList items={groceryList.items} users={groceryList.users} /> */}
        {/* </div> */}

        {/* Botton nav component */}
        <SimpleBottomNavigation value={navValue} setValue={setNavValue} />
      </div>
    </div>
  );
};

export default App;
