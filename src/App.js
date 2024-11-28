import React from 'react';
import './App.css';
import ExpandableCard from './components/ExpandableCard';

function App() {
  return (
    <div className="App">
      <div className="card-container">
        <ExpandableCard 
          initialText="Click to expand this card. Once expanded, click again to edit the text. Press Escape or click outside to save your changes."
        />
      </div>
    </div>
  );
}

export default App;
