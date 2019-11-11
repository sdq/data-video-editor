import React, { Component } from 'react';
import EditorView from './views/EditorView';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
            <Route exact path="/" component={EditorView} />
        </Router>
      
    );
  }
}
export default App;
