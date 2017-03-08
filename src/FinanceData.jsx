import React from 'react';
import googleFinance from 'google-finance';
import Highstock from 'react-highcharts/ReactHighstock'

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

		this.getFinanceData(this.props);
	}

	getFinanceData(props) {
		var symbols = props.stocks.map(function(stock) {
			return stock.name;
		});

		var from = '2015-01-01';
		var to = (new Date()).toISOString().split('T')[0];

		googleFinance.historical({
		  	symbols: symbols,
		  	from: from,
		  	to: to
		}, (err, results) => {
		  	if (err) return console.log(err);
		  	console.log(results)
		  	const data = symbols.map(symbol => {
		  		var name = symbol;
		  		var nameData = results[name].map(result => [result.date.getTime(), result.close]);
		  		if(nameData.length===0) this.props.removeStock(name); 
		  		return {name: name, data: nameData};
		  	});
			this.setState({ 
				loading: false,
				chartData: data,
			});
		});
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.stocks!==nextProps.stocks) {
			console.log(nextProps)
			this.getFinanceData(nextProps);
		}
	}

	render() {
		if (this.state.loading) return <p className='chart-block'>loading...</p>;

		const config = {
			series: this.state.chartData,
		}

		return <Highstock config={config}/>
	}

}

