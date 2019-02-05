const r2 = require('r2');
const querystring = require('querystring');
const config = require('../config');

const CAT_API_URL = 'https://api.thecatapi.com/';
const CAT_API_KEY = config.catapi.apikey;

var exports = (module.exports = {});

exports.getImage = function(sub_id, type, breeds) {
	return new Promise(async function(resolve, reject) {
		var headers = {
			'X-API-KEY': CAT_API_KEY
		};
		var query_params = {
			has_breeds: breeds,
			mime_types: type,
			sub_id: sub_id,
			limit: 1
		};

		let queryString = querystring.stringify(query_params);
		let _url = CAT_API_URL + `v1/images/search?${queryString}`;

		webRequest(_url, headers).then(
			result => {
				resolve(result);
			},
			error => {
				reject(error);
			}
		);
	});
};

function webRequest(_url, headers) {
	return new Promise(function(resolve, reject) {
		try {
			resolve(r2.get(_url, { headers }).json);
		} catch (e) {
			reject(e);
		}
	});
}
