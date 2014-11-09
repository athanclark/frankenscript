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
		var newArgs = clone(args);
		newArgs.push(next);
		if (newArgs.length === arity) {
			return raw.apply(undefined, newArgs);
		} else {
			return Ughh(raw, arity, newArgs);
		}
	}
	return func;
}
