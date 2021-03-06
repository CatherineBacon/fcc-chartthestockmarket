import React from 'react';
import Highstock from 'react-highcharts/ReactHighstock'

import getFinanceData from './getFinanceData';

export default class FinanceData extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			chartData: [
				{ name: 'APPL', data: [[1,5],[2,4],[3,6]] }, 
				{ name:'XOM', data: [[1,4],[2,5],[3,8]] }
			],
		}

		this.getData(this.props);
	}

	getData(props) {
		var symbols = props.stocks.map(function(stock) {
			return stock.name;
		});

		var from = '2010-01-01';
		var to = (new Date()).toISOString().split('T')[0];

		getFinanceData({
		  	symbols: symbols.join(','),
		  	from: from,
		  	to: to
		}, (err, results) => {
		  	if (err) return console.log(err);
		  	const data = symbols.map(symbol => {
		  		var name = symbol;
		  		var nameData = results[name].map(result => {
		  			var date = new Date(result.date);
		  			return [date.getTime(), result.close]
		  		});
		  		if(nameData.length===0) this.props.removeInvalidStock(name); 
		  		return {
		  			name: name, 
		  			data: nameData,
		  			tooltip: {
      					valueDecimals: 2
    				}
		  		};
		  	});
			this.setState({ 
				loading: false,
				chartData: data,
			});
		});
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.stocks!==nextProps.stocks) {
			this.getData(nextProps);
		}
	}

	render() {
		if (this.state.loading) return <p className='chart-block' style={{height: 400, backgroundColor: '#F8F8FF'}}>loading...</p>;

		const config = {
			series: this.state.chartData,
		}

		return <Highstock config={config} />
	}

}

