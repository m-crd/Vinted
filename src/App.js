import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import Offer from "./containers/Offer";
import Payment from "./containers/Payment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCheck, faRedo } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faCheck, faRedo);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };
  return (
    <Router>
      <Header setUser={setUser} token={token} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
