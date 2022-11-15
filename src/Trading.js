import React, { useState, useEffect } from "react";

function Trading({ userState }) {
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
  }, [user.balance]);
  // console.log("userState: ", userState);
  console.log(
    "(Trading) Local Storage User: ",
    localStorage.getItem("username")
  );

  return <div>Trading</div>;
}

export default Trading;
