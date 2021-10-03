
import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css'

import MainPage from "./pages/MainPage";
import DetailsPage from "./pages/DetailsPage";

import history from "./history"

export default function App() {
  return (
    <div className="main-div">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route path="/station" component={DetailsPage}/>

        </Switch>
      </Router>

    </div>
  )
}

