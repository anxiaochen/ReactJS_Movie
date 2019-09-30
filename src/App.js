import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import routes from './router/index';
import 'antd/dist/antd.css';

import TopHeader from './components/TopHeader'

class App extends Component {

  componentDidMount() {
    // console.log(this)
  }

  render() {
    return (
      <div>
        <Router>
          <TopHeader {...routes}></TopHeader>
          <div>
            <Switch>
              {
                routes.map((item, i) => {
                  if (item.exact) {

                    return <Route exact path={item.path} key={i}
                      render={ props => (<item.component {...props} routes={item.subs} />)} />
                  } else {
                    return <Route path={item.path} key={i}
                      render={ props => (<item.component {...props}  routes={item.subs}/>)} />
                  }
                })
              }
            </Switch>
          </div>
          </Router>
      </div>
    );
  }

}

export default App;
