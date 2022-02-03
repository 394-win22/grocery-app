import React, { useEffect } from "react";
import "./App.css";
import { useData, useUserState, setData } from "./utilities/firebase.js";
import GroceryList from "./components/GroceryList.js";
import UserGroceryList from "./components/UserGroceryList.js";
import ButtonAppBar from "./components/AppBar.js";
import { Button } from "@mui/material";
import AddNewItem from "./components/AddNewItem";
import SimpleBottomNavigation from "./components/BottomNavBar";
import CheckoutButton from "./components/CheckoutButton";
import CreateGroupView from "./components/CreateGroupView";
import { wait } from "@testing-library/user-event/dist/utils";

const App = () => {
  const [database, loading, error] = useData("/");
  const [user] = useUserState();
  // Nav bar value passed into SimpleBottomNavigation & GroceryList
  const [navValue, setNavValue] = React.useState(0);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the grocery list...</h1>;

  return (
    <div className="App">
      {!user ? (
        <>
          <div>
            <ButtonAppBar joinCode="Shared Groceries App" />
          </div>
          <p className="sign-in-remind">Please sign in first</p>
        </>
      ) : database.users[user.uid] &&
        database.users[user.uid].group_id == "unassigned" ? (
        <>
          <div>
            <ButtonAppBar joinCode="Shared Groceries App" />
          </div>
          <CreateGroupView
            userList={database.users}
            groupList={database.groups}
            currentUser={user}
          ></CreateGroupView>
        </>
      ) : (
        <>
          <div>
            <ButtonAppBar joinCode={database.users[user.uid].group_id} />
          </div>
          <div className="grocery-list">
            <GroceryList
              items={database.groups[database.users[user.uid].group_id].items}
              users={database.users}
              navValue={navValue}
              groupId={database.users[user.uid].group_id}
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
                  <AddNewItem
                    user={user}
                    groupId={database.users[user.uid].group_id}
                  />
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
        </>
      )}
    </div>
  );
};

export default App;
