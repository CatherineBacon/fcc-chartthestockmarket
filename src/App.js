import React, { Component } from 'react';
import './App.css';
import FinanceData from './FinanceData.jsx';

// dummy list of stocks
var stockList = [{name:'AAPL'},{name:'TSLA'},{name:'XOM'}];

class App extends Component {
  constructor() {
    super();
    this.state = {
      stocks: stockList,
      newStock: ''
    } 
  }

  handleInputChange(e) {
    this.setState({
      newStock: e.target.value
    });
  }

  addStock(e) {
    e.preventDefault();
    var stock = this.state.newStock.trim();
    var found = this.state.stocks.some(function(el) {
      return el.name === stock;
    });
    if(found) {
      this.setState({newStock: ''})
      return;
    }
    if (!stock) {
      return;
      //// also need to handle invlaid/nonexistant stock
    }
    this.setState({
      stocks: this.state.stocks.concat([{name: stock}]),
      newStock: ''
    });
  }

  render() {
    const { stocks, newStock } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Chart the Stock Market</h2>
        </div>
        <div className="App-intro">
          <FinanceData stocks={ stocks }/>
          {stocks.map( stock => <p key={stock.name}>{stock.name}</p> )}
        </div>
        <form onSubmit={this.addStock.bind(this)}>
          <input 
            type='text'
            placeholder='Stock Code'
            value={newStock}
            onChange={this.handleInputChange.bind(this)}
          />
          <input type='submit'
            value='Add' />
        </form>
        <div className="App-footer">
          <footer>Written and coded by <span className='name'>Catherine Bacon</span></footer>
        </div>
      </div>
    )
  }
}

export default App;
