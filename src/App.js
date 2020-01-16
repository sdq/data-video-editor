import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Routers from './routes/routerMap';
import { userFolderId } from '@/selectors/user';
import { connect } from "react-redux";
const customHistory = require("history").createBrowserHistory;

class App extends Component {
  render() {
    return (
      <Router history={customHistory}>
        <Switch>
          {
            Routers.map((item, index) => {
              return <Route key={index} path={item.path} exact render={props => {
                console.log("Route...", this.props.userFolderId);
                if (!item.auth) {  //不是/index页面不需要拦截
                  return <item.component {...props} />
                } else {
                  if (this.props.userFolderId) { // 进入/index页面，有userFolderId
                    return <item.component {...props} />
                  } else { //登陆拦截
                    return <Redirect to={
                      {
                        pathname: '/',
                        state: {
                          from: props.location
                        }

                      }
                    } />
                  }
                }
              }} />
            })
          }
        </Switch>
      </Router>

    );
  }
}
// redux拿到token并挂载到App的props上面
const mapStateToProps = state => {
  return {
    userFolderId: userFolderId(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default App = connect(mapStateToProps, mapDispatchToProps)(App);
//export default App ;