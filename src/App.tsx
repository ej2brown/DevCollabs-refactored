import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { Home, Group, GithubSearch, CodeRoom } from "./containers";

import NavBar from "./components/NavBar";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/group" component={Group} />
            <Route path="/coderoom" component={CodeRoom} />
            <Route path="/githubsearch" component={GithubSearch} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
};

export default App;
