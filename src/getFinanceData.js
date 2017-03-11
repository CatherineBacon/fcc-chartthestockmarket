import request from 'superagent';

const serverUrl = 'http://localhost:3001/historical';

export default function(options, cb) {
	request
 		.get(serverUrl)
 		.query(options)
 		.end(function(err, res){
 			cb(err, res.body);
   });
}