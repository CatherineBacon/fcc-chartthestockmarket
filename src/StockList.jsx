import React from 'react';

export default class StockList extends React.Component{
	render() {
		const {stocks, deleteStock} = this.props;
		const stockItems = stocks.map( stock => {
			return (<div className='stockItem' key={stock.name}>
					{stock.name} 
					<button className='btn btn-sm btn-delete' onClick={deleteStock.bind(this, stock.name)}>X</button>
				</div> )
			});
		return <div className='stockItems'>{stockItems}</div>
	}
}