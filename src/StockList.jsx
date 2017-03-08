import React from 'react';

export default class StockList extends React.Component{
	render() {
		const {stocks, deleteStock} = this.props;
		const stockItems = stocks.map( stock => {
			return (<p className='stockItem' key={stock.name}>
					{stock.name} 
					<button className='btn-delete' onClick={deleteStock.bind(this, stock.name)}>X</button>
				</p> )
			});
		return <div>{stockItems}</div>
	}
}