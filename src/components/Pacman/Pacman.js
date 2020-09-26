import React, { Component } from 'react';

import { ReactComponent as PacmanSvg } from './pacman.svg';
import './style.css';
class Pacman extends Component {

  state = {
    direction: 'right',
    position: {
      top: 0,
      left: 0
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

    const currentTop = this.state.position.top;
    const currentLeft = this.state.position.left;
    const { step } = this.props;

    // 39 ArrowRight
    // 40 ArrowDown
    // 37 ArrowLeft
    // 38 ArrowUp
    if (event.key === 'ArrowUp') {
      this.setState({
        position: {
          top: currentTop - step,
          left: currentLeft
        },
        direction: 'up'
      });
    } else if (event.key === 'ArrowRight') {
      this.setState({
        position: {
          top: currentTop,
          left: currentLeft + step
        },
        direction: 'right'
      });
    } else if (event.key === 'ArrowDown') {
      this.setState({
        position: {
          top: currentTop + step,
          left: currentLeft
        },
        direction: 'down'
      });
    } else if (event.key === 'ArrowLeft') {
      this.setState({
        position: {
          top: currentTop,
          left: currentLeft - step
        },
        direction: 'left'
      });
    }
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
