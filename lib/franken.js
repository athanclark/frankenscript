var types = require('./types.js');
var utils = require('./utils.js');

var is = types.is;
var zipWith = utils.zipWith;
var app = utils.app;

function clone(obj) {
	if (null == obj || "object" != typeof obj) return obj;
	var copy = obj.constructor();
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	}
	return copy;
}

function Ughh(raw){
	if (arguments[2] === undefined) {
		var paramsRe = /\(.*\)/;
		var params1 = raw.toString().match(paramsRe);
		var params2 = params1[0].slice(1, params1[0].length-1);
		var params = params2.split(',');
		arguments[1] = params.length;
		arguments[2] = [];
	}
	var arity = arguments[1];
	var args = arguments[2];

	function func(next){
		var nexts = [];
		for (k in arguments) {nexts.push(arguments[k]);}
		var newArgs = clone(args);
		nexts.forEach(function(e){newArgs.push(e);});
		if (newArgs.length === arity) {
			return raw.apply(undefined, newArgs);
		} else {
			return Ughh(raw, arity, newArgs);
		}
	}
	return func;
}

Ughh.lazy = require('./lazy.js');
Ughh.typed = types.typed;


module.exports = Ughh;
module.exports.types = types;
module.exports.utils = utils;
