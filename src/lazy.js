module.exports = lazy;

function lazy(raw){
	var rawString = raw.toString();
	// Match raw string for it's parameters, divide it
	if (arguments[2] === undefined) {
		var paramsRe = /\(.*\)/; 
		var params1 = rawString.match(paramsRe);
		var params2 = params1[0].slice(1, params1[0].length-1);
		var params = params2.split(',');
		arguments[1] = params.length;
		arguments[2] = [];
	}
	if (arguments[3] === undefined) {arguments[3] = false;} //Lazy by default
	
	var arity = arguments[1];
	var args = arguments[2];
	var strict = arguments[3];

	function func(next){
		//
		var nexts = []; 
		for (k in arguments) {nexts.push(arguments[k]);}
		var newArgs = clone(args);
		nexts.forEach(function(e){newArgs.push(e);}); //Add chunk to list cache
		if (newArgs.length === arity) {
			if (func.strict === true) {
			  return raw.apply(undefined, newArgs);
			} else {
				return { exec : function () { return raw.apply(undefined, newArgs); } }
			}
		} else {
		  return Ughh.lazy(raw, arity, newArgs, func.strict);
		}
	}
	func.strict = strict;
	func.exec = function () {
		func.strict = true;
		return func;
	}
	return func; 
}
