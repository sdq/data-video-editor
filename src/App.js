import React, { Component } from 'react';
import EditorView from './views/EditorView';
import ProjectView from './views/ProjectView';
import LoginView from './views/User/Login/LogInView'
import RegisteView from './views/User/Registe/RegisteView'

import { BrowserRouter as Router, Route } from "react-router-dom";
const customHistory = require("history").createBrowserHistory;

class App extends Component {
  render() {
    return (
        <Router history  = {customHistory}>
            {/* <Route exact path='/' component={LoginView}/>
            <Route exact path="/index" component={EditorView} /> */}
            <Route exact path="/" component={EditorView} />
            <Route exact path="/register" component={RegisteView} />
            <Route exact path="/projects" component={ProjectView} />
            <Route exact path="/editor" component={EditorView} />
        </Router>
      
    );
  }
}
export default App;
