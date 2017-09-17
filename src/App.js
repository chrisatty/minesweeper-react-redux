import React, { Component } from 'react'
import './App.css'
import GridContainer from './containers/GridContainer'
import GameFormContainer from './containers/GameFormContainer'
import GameBarContainer from './containers/GameBarContainer'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Minesweeper</h2>
        </div>
        <GameFormContainer />
        <GameBarContainer />
        <GridContainer />
      </div>
    );
  }
}

export default App;
