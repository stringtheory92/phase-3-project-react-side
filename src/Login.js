import React, {useState} from 'react'


function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function handleChange(e){
       const {name, value} = e.target

       setFormData({
        ...formData,
        [name]: value
       })

       console.log(e.target.name, e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()

        // fetch(`http://localhost:9292/users/` + new URLSearchParams({username: formData.username, password: formData.password}))
        fetch(`http://localhost:9292/users/${formData.username}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            localStorage.setItem("username", data.user_name)
            // localStorage.getItem("username")
        })
    }


  return (
    <form onSubmit={handleSubmit}>
        <label>
            User name:
            <input type="text" name='username' value={formData.username} onChange={handleChange}/> 
        </label>

        <label>
             password:
            <input type="text" name='password' value={formData.password} onChange={handleChange}/> 
        </label>
        
        <input type="submit"/>

    </form>
  )
}

export default Login