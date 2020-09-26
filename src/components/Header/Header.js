import React from 'react';

function Header({ score }) {
  return (
    <div>
      <span>SCORE: {score}</span>
    </div>
  );
}

Header.defaultProps = {
  score: 0
};

export default Header;
