import React from 'react';

import getFinanceData from './getFinanceData';

export default class AddStockForm extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			newStock: '',
			showInvalid: false
		}
	}

	handleInputChange(e) {
    	this.setState({
      		newStock: e.target.value
    	});
  	}

	checkAddStock(e) {
		e.preventDefault();
		var stocks = this.props.stocks;
		var stock = this.state.newStock.trim().toUpperCase();
		var found = stocks.some(el => el.name===stock);
		if(found || !stock) return;
    this.setState({newStock: ''})
		this.checkData(stock);
	}

	checkData(stock) {
		var date = new Date();
		date = date.setDate(date.getDate() - 2);
	  var from = (new Date(date)).toISOString().split('T')[0];
	  var to = (new Date()).toISOString().split('T')[0];

    getFinanceData({
    	symbols: stock,
    	from: from,
    	to: to
    }, (err, results) => {
    	if (err) return console.log(err);
    	if(results[stock].length===0) {
    		this.setState({
    			showInvalid: true,
    		})
    		setTimeout( () => this.setState({showInvalid: false}), 3000);
    		return;
    	}
    	this.props.addStock(stock);
    })
  }

	render() {
		return (
			<div>
				<form onSubmit={this.checkAddStock.bind(this)}>
          			<input 
            			type='text'
            			placeholder='Stock Code'
            			value={this.state.newStock}
            			onChange={this.handleInputChange.bind(this)}
          			/>
          			<input type='submit' value='Add' />
            		{this.state.showInvalid ? 
                  <p className='invalidStock' style={{visibility: 'visible'}}>Stock code not found</p> 
                  : <p className='invalidStock' style={{visibility: 'hidden'}}>Stock code not found</p>}
        		</form>
			</div>
		);
	}
}


