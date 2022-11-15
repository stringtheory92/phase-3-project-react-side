import './App.css';
import Login from './Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Navbar';
import HomeScreen from './HomeScreen';
import { useState, useEffect } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userState, setUserState] = useState({})

  useEffect(() =>{
    const currentUser = localStorage.getItem("username")
    if (currentUser){
      setIsLoggedIn(true)
      fetch(`http://localhost:9292/user/:${currentUser}`)
      .then(resp => resp.json())
      .then(data => setUserState(data))
    }

    else{
      setIsLoggedIn(false)
    }
  }, [])
  return (

    <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={isLoggedIn ? ( <HomeScreen />) : ( <Login replace to={"/login"}/>)}/>
          <Route path='/trading'/>
          <Route path='/watchlist'/>
        </Routes>
    </Router>
    // <div className="App">
    //   {isLoggedIn}
    // </div>
  );
}

export default App;
