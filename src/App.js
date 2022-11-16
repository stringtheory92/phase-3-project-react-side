import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Trading from "./Trading";
import WatchList from "./WatchList";
import HomeScreen from "./HomeScreen";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userState, setUserState] = useState({});

  useEffect(() => {
    const currentUser = localStorage.getItem("username");

    console.log("localstorageuser: ", currentUser);
    if (currentUser) {
      setIsLoggedIn(true);
      fetch(`http://localhost:9292/users/${currentUser}`)
        .then((resp) => resp.json())
        .then((data) => setUserState(data));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleLogIn = () => {
    setIsLoggedIn((status) => !status);
  };

  console.log("userState: ", userState);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? (
              <HomeScreen toggleLogIn={toggleLogIn} />
            ) : (
              <Login replace to={"/login"} toggleLogIn={toggleLogIn} />
            )
          }
        />
        <Route
          path="/trading"
          element={
            isLoggedIn ? (
              <Trading
                userState={userState}
                toggleLogIn={toggleLogIn}
                isLoggedIn={isLoggedIn}
              />
            ) : (
              <Login replace to={"/login"} />
            )
          }
        />
        <Route
          path="/watchlist"
          element={
            isLoggedIn ? (
              <WatchList userState={userState} toggleLogIn={toggleLogIn} />
            ) : (
              <Login replace to={"/login"} />
            )
          }
        />
      </Routes>
    </Router>
    // <div className="App">
    //   {isLoggedIn}
    // </div>
  );
}

export default App;
