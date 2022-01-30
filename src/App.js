import React from "react";
import "./App.css";
import { useData } from "./utilities/firebase.js";
import GroceryList from "./components/GroceryList.js";
import UserGroceryList from "./components/UserGroceryList.js";
import ButtonAppBar from "./components/AppBar.js";
import AddNewItem from "./components/AddNewItem";
import SimpleBottomNavigation from "./components/BottomNavBar";

const App = () => {
  const [groceryList, loading, error] = useData("/");
  const [navValue, setNavValue] = React.useState(0);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the grocery list...</h1>;

  return (
    <div className="App">
      <div>
        <ButtonAppBar />
      </div>
      <div className="grocery-list">
        <GroceryList items={groceryList.items} users={groceryList.users} navValue={navValue} />
        <div>
          <AddNewItem />
        </div>
		
        {/* <div className="grocery-list">
        <UserGroceryList items={groceryList.items} users={groceryList.users} /> */}
        {/* </div> */}

		<SimpleBottomNavigation value={navValue} setValue={setNavValue}/>
      </div>
    </div>
  );
};

export default App;
