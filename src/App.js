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
      newStock: '',
      showInvalid: false,
    } 
  }

  handleInputChange(e) {
    this.setState({
      newStock: e.target.value
    });
  }

  addStock(e) {
    e.preventDefault();
    var stock = this.state.newStock.trim().toUpperCase();
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
      newStock: '',
      showInvalid: false,
    });
  }

  deleteStock(stock) {
    var stockList = this.state.stocks.filter(el => el.name!=stock);
    this.setState({
      stocks: stockList
    })
  }

  removeInvalidStock(stock) {
    var stocks = this.state.stocks.filter(el => el.name!==stock);
    this.setState({
      stocks: stocks,
      showInvalid: true,
    })
  }

  render() {
    const { stocks, newStock } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Chart the Stock Market</h2>
        </div>
        <div className="App-intro">
          <FinanceData stocks={ stocks } removeInvalidStock={ this.removeInvalidStock.bind(this) }/>
          {stocks.map( stock => <p key={stock.name}>{stock.name} <button className='btn' onClick={this.deleteStock.bind(this, stock.name)}>X</button></p> )}
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
            {this.state.showInvalid ? <p className='invalidStock'>Incorrect or not existing stock code</p> : null}
        </form>
        <div className="App-footer">
          <footer>Written and coded by <span className='name'>Catherine Bacon</span></footer>
        </div>
      </div>
    )
  }
}

export default App;
