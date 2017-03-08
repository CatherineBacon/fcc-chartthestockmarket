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
				{name:'XOM', data: [[1,4],[2,5],[3,8]] }
			],
		}

		var symbols = this.props.stocks.map(function(stock) {
			return stock.name;
		});

		googleFinance.historical({
		  	symbols: symbols,
		  	from: '2015-01-01',
		  	to: '2017-07-31'
		}, (err, results) => {
		  	if (err) return console.log(err);
		  	console.log(results)
		  	const data = symbols.map(symbol => {
		  		var name = symbol;
		  		var nameData = results[name].map(result => [result.date.getTime(), result.close]); 
		  		return {name: name, data: nameData};
		  	});
		  	//const data = quotes.map(quote => [quote.date.getTime(), quote.close]);
			this.setState({ 
				loading: false,
				chartData: data,
			});
		});
	}

	render() {
		if (this.state.loading) return <p>loading...</p>;

		const config = {
			series: this.state.chartData,
		}

		return <Highstock config={config}/>
	}

}

