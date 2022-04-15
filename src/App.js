import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import HocComponent from "./compnents/hoc-component";
import Home from "./compnents/Home/index";

function App() {
  /**
   * Higher order component
   */
  const homeComponent = HocComponent(Home);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {homeComponent}
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
