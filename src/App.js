import './App.css';
import Login from './Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Navbar';
import Trading from './Trading';
import WatchList from './WatchList';
import HomeScreen from './HomeScreen';
import { useState, useEffect } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userState, setUserState] = useState({})

  useEffect(() =>{
    const currentUser = localStorage.getItem("username")

    console.log(currentUser)
    if (currentUser){
      setIsLoggedIn(true)
      fetch(`http://localhost:9292/users/${currentUser}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setUserState(data)})
    }

    else{
      setIsLoggedIn(false)
    }

  }, [])

  console.log(userState)
  return (

    <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={isLoggedIn ? ( <HomeScreen />) : ( <Login replace to={"/login"}/>)}/>
          <Route path='/trading' element={<Trading userState={userState}/>}/>
          <Route path='/watchlist' element={<WatchList userState={userState}/>}/>
        </Routes>
    </Router>
    // <div className="App">
    //   {isLoggedIn}
    // </div>
  );
}

export default App;
