import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WeTransferComponent } from './components/wetransfer.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeTransferComponent/>
      </header>
    </div>
  );
}

export default App;
