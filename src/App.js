import React, { Component } from 'react'

import './App.css'

import { saveDataLocalStorage } from './helpers/helpers'
import NavigationBar from'./components/NavigationBar/NavigationBar'

class App extends Component {

  render() {
    saveDataLocalStorage()

    return (
      <NavigationBar />
    );
  }
}

export default App;
