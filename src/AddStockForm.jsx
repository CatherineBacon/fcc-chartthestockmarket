import React from 'react';
import googleFinance from 'google-finance';

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
  		if(found) {
  			this.setState({newStock: ''})
  			return;
  		}
  		if(!stock) {
  			return;
  		}
  		this.checkFinanceData(stock);
  	}

  	checkFinanceData(stock) {
  		var date = new Date();
  		date = date.setDate(date.getDate() - 2);
		var from = (new Date(date)).toISOString().split('T')[0];
		var to = (new Date()).toISOString().split('T')[0];

		googleFinance.historical({
		  	symbol: stock,
		  	from: from,
		  	to: to
		}, (err, results) => {
		  	if (err) return console.log(err);
		  	if(results.length===0) {
		  		this.setState({
		  			showInvalid: true,
		  			newStock: '' 
		  		})
		  		setTimeout( () => this.setState({showInvalid: false}), 3000);
		  		return;
		  	}
  			this.props.addStock(stock);
  			this.setState({
  				newStock: '',
  			})
  			return;
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
                  <p className='invalidStock' style={{visibility: 'visible'}}>Incorrect or not existing stock code</p> 
                  : <p className='invalidStock' style={{visibility: 'hidden'}}>Incorrect or not existing stock code</p>}
        		</form>
			</div>
		);
	}
}


