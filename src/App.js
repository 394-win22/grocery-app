import React, { useEffect } from "react";
import "./App.css";
import { useData , useUserState} from "./utilities/firebase.js";
import GroceryList from "./components/GroceryList.js";
import UserGroceryList from "./components/UserGroceryList.js";
import ButtonAppBar from "./components/AppBar.js";
import { Button } from "@mui/material";
import AddNewItem from "./components/AddNewItem";
import SimpleBottomNavigation from "./components/BottomNavBar";
import CheckoutButton from "./components/CheckoutButton";
import CreateGroupView from "./components/CreateGroupView";

const App = () => {
  const [database, loading, error] = useData("/");
  const [user] = useUserState();
  // Nav bar value passed into SimpleBottomNavigation & GroceryList
  const [navValue, setNavValue] = React.useState(0);
  useEffect(() => {
    if (database && user && !database.users[user.uid])
        storeUserInfo(user);
  }, [database, user]);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the grocery list...</h1>;
  return (
    <div className="App">
      <div>
        <ButtonAppBar />
      </div>
      {!user ? 
    <p className="sign-in-remind">Please sign in first</p>
    : !database.users[user.uid].group_id ? <CreateGroupView userList = {database.users} currentUser={user}></CreateGroupView>
      :
      <div className="grocery-list">
        <GroceryList
          items={database.items}
          users={database.users}
          navValue={navValue}
        />
        <div
          style={{
            position: "sticky",
            bottom: "120px",
            width: "90%",
            display: "flex",
            justifyContent: "right",
            maxWidth: "600px",
          }}
        >
          {
            navValue === 0 ? (
              <AddNewItem user={user}/>
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
    }
    </div>
  );
};

const storeUserInfo = (user) => {
  // console.log("storeinfo");
  if (!user) {
    return;
  }
  const userInfo = {
    email: user.email,
    display_name: user.displayName,
    photo_url: user.photoURL,
    group_id: null
  };

  setData(`users/${user.uid}`, userInfo);
};

export default App;
