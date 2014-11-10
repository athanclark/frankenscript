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

function zipWith(f, a, b){
	var result = []
	function goL(elem, index, array){
		result[index] = f(elem)(b[index]);
	}
	function goR(elem, index, array){
		result[index] = f(a[index])(elem);
	}
	if (a.length <= b.length) {
		a.forEach(goL);
		return result;
	} else {
		b.forEach(goR);
		return result;
	}
}

function app(fs, a){
	var result = [];
	function iterateeFromSelf(elem, index, array){
		result[index] = elem(a[index]);
	}
	function iterateeFromOther(elem, index, array){
		result[index] = fs[index](elem);
	}
	if (fs.length <= a.length) {
		fs.forEach(iterateeFromSelf);
		return result;
	} else {
		a.forEach(iterateeFromOther);
		return result;
	}
}
