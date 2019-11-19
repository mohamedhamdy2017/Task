import React, {Component} from 'react';
import Navigation from './Navigation';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';


export class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
        <Navigation />
      </Provider>
    );
  }
}
