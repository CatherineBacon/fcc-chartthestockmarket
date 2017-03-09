import React from 'react';
import googleFinance from 'google-finance';

export default class AddStockForm extends React.Componenet{
	constructor(props) {
		super(props);

		this.state = {
			newStock: ''
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={this.addStock.bind(this)}>
          			<input 
            			type='text'
            			placeholder='Stock Code'
            			value={newStock}
            			onChange={this.handleInputChange.bind(this)}
          			/>
          			<input type='submit' value='Add' />
            		{this.state.showInvalid ? <p className='invalidStock'>Incorrect or not existing stock code</p> : null}
        		</form>
			</div>
		);
	}
}


