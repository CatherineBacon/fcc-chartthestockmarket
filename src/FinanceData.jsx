import React from 'react';
import googleFinance from 'google-finance';
import Highstock from 'react-highcharts/ReactHighstock'

export default class FinanceData extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			chartData: [[1,5],[2,4],[3,6]],
		}

		googleFinance.historical({
		  symbol: 'NASDAQ:AAPL',
		  from: '2000-01-01',
		  to: '2017-07-31'
		}, (err, quotes) => {
		  if (err) return console.log(err);
		  const data = quotes.map(quote => [quote.date.getTime(), quote.close]);
			this.setState({ 
				loading: false,
				chartData: data,
			});
		});
	}

	render() {
		if (this.state.loading) return <p>loading...</p>;

		const config = {
			series: [{
				name: 'AAPL',
				data: this.state.chartData,
			}]
		}

		return <Highstock config={config}/>
	}

}

