import React, { useState } from 'react';

import Header from './components/Header';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      <Header score={score} />
      {/* <Board /> */}
    </div>
  );
}

export default App;
