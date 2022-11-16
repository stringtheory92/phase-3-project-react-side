import React, { useState, useEffect } from "react";

function Trading({ userState, toggleLogIn, isLoggedIn }) {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    balance: "",
  });
  // localStorage.setItem({key: value})

  const updateUser = ({ user_name: userName, password, balance }) => {
    const newBalance = balance === user.balance ? balance : user.balance;

    setUser({ ...user, balance: newBalance });
  };

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:9292/users/${localStorage.getItem("username")}`)
        .then((resp) => resp.json())
        .then((data) => {
          console.log("trading user: ", data);
          // const newBalance = (balance === user.balance) ? balance : user.balance
          // const { user_name: userName, password, balance } = data;
          updateUser(data);
        });
    }
  }, [user.balance, isLoggedIn]);
  console.log("user: ", user);
  console.log(
    "(Trading) Local Storage User: ",
    localStorage.getItem("username")
  );

  const handleClick = () => {
    toggleLogIn();
    localStorage.clear();
  };

  return (
    <div>
      <h2>Trading</h2>
      <button className="logoutButton" onClick={handleClick}>
        Log Out
      </button>
    </div>
  );
}

export default Trading;
