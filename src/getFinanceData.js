import request from 'superagent';

const serverUrl = 'https://google-finance-proxy.herokuapp.com/historical';

export default function(options, cb) {
	request
 		.get(serverUrl)
 		.query(options)
 		.end(function(err, res){
 			cb(err, res.body);
   });
}