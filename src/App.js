import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import FinanceData from './FinanceData.jsx';
import StockList from './StockList.jsx';
import AddStockForm from './AddStockForm.jsx';

var config = {
  apiKey: "AIzaSyBFiVa7Qt-IzLpFTFpWGLYfcFE0TbNQwgc",
  databaseURL: "https://fcc-stockmarket-22a92.firebaseio.com"
};

firebase.initializeApp(config);

var defaultStocks = [{name:'AAPL'},{name:'XOM'}];

var fb = firebase.database();

class App extends Component {
  constructor() {
    super();
    this.state = {
      stocks: defaultStocks,
      showInvalid: false,
    } 
    fb.ref('stocks').on('value', snapshot => {
      const stocks = snapshot.val();
      this.setState({stocks: stocks})
    })
  }

  addStock(stock) {
    var stockList = this.state.stocks.concat([{name: stock}])
    fb.ref('stocks').set(stockList);
  }

  deleteStock(stock) {
    var stockList = this.state.stocks.filter(el => el.name!==stock);
    fb.ref('stocks').set(stockList);
  }

  removeInvalidStock(stock) {
    var stocks = this.state.stocks.filter(el => el.name!==stock);
    this.setState({
      stocks: stocks,
      showInvalid: true,
    })

    setTimeout( () => this.setState({showInvalid: false}), 3000);
  }

  componentWillUnmount() {
    fb.ref('stocks').off();
  }

  render() {
    const { stocks } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Chart the Stock Market</h2>
        </div>
        <div className="App-intro container-fluid">
          <FinanceData className='black-center row' stocks={ stocks } removeInvalidStock={ this.removeInvalidStock.bind(this) }/>  
          <StockList stocks={ stocks } deleteStock={this.deleteStock.bind(this)} className='stockChart row' />
          <AddStockForm stocks={ stocks } addStock={ this.addStock.bind(this) } className='row'/>
        </div>
        <div className="App-footer">
          <footer>Written and coded by <a href='http://catherinecollinson.com' className='name'>Catherine Bacon</a></footer>
        </div>
      </div>
    )
  }
}

export default App;
