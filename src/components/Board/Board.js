import React, { Component } from 'react';

import Pacman from '../Pacman';
import Ghost from '../Ghost';
import Food from '../Food';
import './style.css';

class Board extends Component {
  render() {
    return (
      <div className="board">
        <Food position={{top: 100, left: 100 }} />
        <Food position={{top: 50, left: 100 }} />
        <Food position={{top: 250, left: 100 }} />
        <Pacman />
        {/* <Ghost color="yellow" />
        <Ghost color="red" />
        <Ghost color="pink" /> */}
        <Ghost color="blue" />
      </div>
    )
  }
}

export default Board;
