import React, { Component } from 'react';
import firebase from 'firebase';
import reactFire from 'reactfire';

import './App.css';
import FinanceData from './FinanceData.jsx';
import StockList from './StockList.jsx';
import AddStockForm from './AddStockForm.jsx';


var defaultStocks = [{name:'AAPL'},{name:'TSLA'},{name:'XOM'}];

var database = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = {
      stocks: defaultStocks,
      showInvalid: false,
    } 
  }

  addStock(stock) {
    var stockList = this.state.stocks.concat([{name: stock}])
    this.setState({
      stocks: stockList,
    });
  }

  deleteStock(stock) {
    var stockList = this.state.stocks.filter(el => el.name!==stock);
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

    setTimeout( () => this.setState({showInvalid: false}), 3000);
  }

  render() {
    const { stocks } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Chart the Stock Market</h2>
        </div>
        <div className="App-intro">
          <FinanceData stocks={ stocks } removeInvalidStock={ this.removeInvalidStock.bind(this) }/>  
        </div>
        <StockList stocks={ stocks } deleteStock={this.deleteStock} className='stockChart' />
        <AddStockForm stocks={ stocks } addStock={ this.addStock.bind(this) } />
        <div className="App-footer">
          <footer>Written and coded by <a href='http://catherinecollinson.com' className='name'>Catherine Bacon</a></footer>
        </div>
      </div>
    )
  }
}

export default App;
