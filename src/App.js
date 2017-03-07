import React, { Component } from 'react';
import './App.css';

var stockList = ['AAPL','TSLA','XOM'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      stocks: stockList
    } 
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chart the Stock Market</h2>
        </div>
        <p className="App-intro">
          {this.state.stocks.map(function(stock) {
            return <p>{stock}</p>;
          })}
        </p>
      </div>
    );
  }
}

export default App;
