import React, { Component } from 'react';

import { ReactComponent as PacmanSvg } from './pacman.svg';
import './style.css';
class Pacman extends Component {

  state = {
    direction: 'right',
    position: {
      top: 50,
      left: 50
    }
  }

  constructor(props) {
    super(props);
    this.pacmanRef = React.createRef();
  }

  componentDidMount() {
    this.pacmanRef.current.focus();
  }

  handleKeyDown = (event) => {
    console.log(event.keyCode, event.key);
  }

  render() {
    const { direction, position } = this.state;
    return (
      <div
        ref={this.pacmanRef}
        className={`pacman pacman-${direction}`}
        tabIndex="0"
        onKeyDown={this.handleKeyDown}
        style={position}
      >
        <PacmanSvg />
      </div>
    );
  }
}

Pacman.defaultProps = {
  step: 50, // 50px
  size: 50, // pacman size: 50x50px
  // TODO: move to config
  border: 10 * 2,
  topScoreBoardHeight: 50
}

export default Pacman;
