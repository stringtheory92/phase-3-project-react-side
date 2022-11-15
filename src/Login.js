import React, { useEffect, useState } from "react";

function Login({ toggleLogIn }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [sampleUser, setSampleUser] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(e.target.name, e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // fetch(`http://localhost:9292/users/` + new URLSearchParams({username: formData.username, password: formData.password}))
    fetch(`http://localhost:9292/users/${formData.username}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("username", data.user_name);
        toggleLogIn();
        // localStorage.getItem("username")
      });
  }

  useEffect(() => {
    fetch(`http://localhost:9292/users`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("test user: ", data[0]);
        setSampleUser([data[0].user_name, data[0].password]);
      });
  }, []);

  return (
    <>
      <h1>
        Login User: {sampleUser[0]}, password: {sampleUser[1]}
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          User name:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>

        <label>
          password:
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <input type="submit" />
      </form>
    </>
  );
}

export default Login;
