import './App.css';
import Login from './Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Navbar';
import HomeScreen from './HomeScreen';

function App() {
  const isLoggedIn = localStorage.getItem("username") ? <HomeScreen /> : <Login />
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
