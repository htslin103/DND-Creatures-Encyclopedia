
import React from "react";
import { Switch, Route, Link } from "react-router-dom"; //Using react router to create our URL routes
import "bootstrap/dist/css/bootstrap.min.css"; //Used to style the app 
import {BrowserRouter} from "react-router-dom";

import AddCreature from "./components/add-creature";
import CreaturesList from "./components/creatures-list";
import Creature from "./components/creatures";
import Login from "./components/login";

function App() {
  //TODO: This is just a dummy login system, set the user to the details. Implement with full system later. Maybe Google sign in or Oath later
  const [user, setUser] = React.useState(null); //Create usestate to use, set to null first

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null) 
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
     {/* Logo */}
        <Link to={"/creatures"} a className="navbar-brand">      
          Spooky Creatures
        </Link>

        <div className="navbar-nav mr-auto">

          <li className="nav-item">
            <Link to={"/creatures"} className="nav-link">
              Creatures
            </Link>
          </li>

          <li className="nav-item" >
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}
          </li>

        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/creatures"]} component={CreaturesList} />
          <Route 
            path="/creatures/:id/"
            render={(props) => (
              <Creature {...props} user={user} />
            )}
          />
          <Route 
            path="/creatures/:id"
            render={(props) => (
              <Creature {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;