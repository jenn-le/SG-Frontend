import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import TeamStats from "./TeamStats.js";
import TeamCompare from "./TeamCompare.js";

const Landing = () => (
  <div>
    <p className="App-intro">
      The purpose of this demo site is to display working functionality of the
      Statgeek Analytics API. To get started, pick an action from below.
    </p>
    <div className="container row">
      <div>
        <Link to="/stats" className="btn btn-dark">
          See Team Stats
        </Link>

        <Link to="/compare" className="btn btn-dark ml-3">
          Compare Teams
        </Link>
      </div>
    </div>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Link to="/">
              <header className="App-header mt-5">
                <h1 className="App-title" style={{ color: "black" }}>
                  Statgeek Analytics Demo
                </h1>
              </header>
            </Link>
            <Route exact path="/" component={Landing} />
            <Route exact path="/stats" component={TeamStats} />
            <Route exact path="/compare" component={TeamCompare} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
