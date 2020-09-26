import React, { Component } from 'react';

import Pacman from '../Pacman';
import Ghost from '../Ghost';
import Food from '../Food';
import './style.css';

class Board extends Component {

  constructor(props) {
    super(props);

    this.pacmanRef = React.createRef();

    this.foods = [];
    this.amountOfFood = (
      (window.innerWidth - this.props.foodSize)
      * (window.innerHeight - this.props.topScoreBoardHeight)
    ) / (this.props.foodSize * this.props.foodSize) - 1;

    console.log(this.amountOfFood);
    for (let i = 0; i < this.amountOfFood; i++) {
      this['food' + i] = React.createRef();
    }
  }

  componentDidMount() {
    this.intervalFood = setInterval(this.lookForEat, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalFood);
  }

  lookForEat = () => {
    const pacmanX = this.pacmanRef.current.state.position.left;
    const pacmanY = this.pacmanRef.current.state.position.top;
    const pacmanSize = this.pacmanRef.current.props.size

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;

    for (let i = 0; i <= this.amountOfFood; i++) {
      const currentFood = this['food' + i].current;
      if (currentFood) {
        const currentFoodX = currentFood.state.position.left;
        const currentFoodY = currentFood.state.position.top;
        const currentFoodSize = currentFood.props.foodSize;
        const currentFoodLastX = currentFoodX + currentFoodSize / 2;
        const currentFoodLastY = currentFoodY + currentFoodSize / 2;

        if (
          (pacmanX >= currentFoodX && pacmanX <= currentFoodLastX)
          || (pacmanLastX >= currentFoodX && pacmanLastX <= currentFoodLastX)) {
          if ((pacmanY >= currentFoodY && pacmanY <= currentFoodLastY)
            || (pacmanLastY >= currentFoodY && pacmanLastY <= currentFoodLastY)) {
            if (!currentFood.state.hidden) {
              currentFood.ate(); // !hidden
              // this.props.increase(); // increase score
              this.props.setScore((value) => value + 1)
            }
          }
        }
      }
    }
  }

  render() {
    const { foodSize, border, topScoreBoardHeight } = this.props;
    let foods = [];
    let currentTop = 0;
    let currentLeft = 1 * foodSize;
    for (let i = 0; i < this.amountOfFood; i++) {
      if (currentLeft + foodSize >= window.innerWidth - border) {
        currentTop += this.props.foodSize;
        currentLeft = 0;
      }

      if (currentTop + foodSize >= (window.innerHeight - border - topScoreBoardHeight )) {
        break;
      }

      const position = { left: currentLeft, top: currentTop };
      currentLeft += foodSize;
      foods.push(
        <Food
          key={`food-elem-${i}`}
          position={position}
          ref={this['food' + i]}
        />
      );
    }

    return (
      <div className="board">
        {foods}
        <Pacman ref={this.pacmanRef} />
        {/* <Ghost color="yellow" />
        <Ghost color="red" />
        <Ghost color="pink" /> */}
        <Ghost color="blue" />
      </div>
    )
  }
}

// TODO: refactor and move to config
Board.defaultProps = {
  foodSize: 50,
  border: 10 * 2,
  topScoreBoardHeight: 50
}

export default Board;
