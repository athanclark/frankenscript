//Type _checking_ for native javascript values
function is(type, obj){
	var clas = Object.prototype.toString.call(obj).slice(8, -1);
	return obj !== undefined && obj !== null && clas === type
}

var typeStrings = [ 'String'
, 'Number'
, 'Boolean'
, 'Date'
, 'Error'
, 'Array'
, 'Function'
, 'RegExp'
, 'Object'];

function type(obj){
	var typeVal = "";
	typeStrings.forEach(function(e,i,a){if (is(e,obj)) {typeVal = e}});
	if (typeVal === "") {
		typeVal = 'Undefined';
	}
	return typeVal;
}

module.exports.is = is;
module.exports.type = type;

//Ughh revamp for type enforcement on parameters for functions
// Right now, I only have trivial type enforcement of parameters,
// through the signature.
module.exports.typed = typed;

//       typed(typesig, raw, arity, args, postDeclaration)
function typed(typesig, raw){
	var types = new Array();
	types = typesig.split(' -> ');
	console.log("Types First: ");
	console.log(types);
	if (arguments[3] === undefined) {
		var paramsRe = /\(.*\)/;
		var params1 = raw.toString().match(paramsRe);
		var params2 = params1[0].slice(1, params1[0].length-1);
		var params = params2.split(',');
		arguments[2] = params.length;
		arguments[3] = [];
	}
	if (arguments[4] === undefined) {
		arguments[4] = false;
	}
	var postDeclaration = arguments[4];
	var arity = arguments[2];
	if (!(arity === (types.length - 1)) && !postDeclaration) {
		return new Error("Function definition does not match type signature");
	}
	var args = arguments[3];

	function func(next){
		var nexts = new Array();
		for (k in arguments) {if (!(k === undefined)) {nexts.push(arguments[k]);}}
		console.log("Nexts: ");
		console.log(nexts);
		var newTypes1 = clone(types);
		var newTypes = new Array();
		for (k in newTypes1) {if (!(k === undefined)) {newTypes.push(newTypes1[k]);}}
		nexts.forEach(function(e,i,k){
			if (!(type(e) === newTypes[i])) { //check each parameter type
				return new Error("Parameter " + e + " does not match type signature");
			} else {
				newTypes = newTypes.slice(1,newTypes.length);
			}
		});
		console.log("NewTypes: ");
		console.log(newTypes);
		var newArgs1 = clone(args);
		var newArgs = new Array();
		for (k in newArgs1) {if (!(k === undefined)) {newArgs.push(newArgs1[k]);}}
		console.log("newArgs: ");
		console.log(newArgs);
		nexts.forEach(function(e){newArgs.push(e);});
		console.log("newArgs again: ");
		console.log(newArgs);
		if (newArgs.length === arity) {
			var result = raw.apply(undefined, newArgs);
			if (!(type(result) === newTypes[0])) { //check result type
				console.log("Results: ");
				console.log(type(result));
				console.log(newTypes);
				return new Error("Result " + result + " does not match type signature");
			} else {
				return result;
			}
		} else {
			var renderedTypes = "";
			newTypes.forEach(function(e,i,a){
				if (i === (a.length-1)) {
					renderedTypes = renderedTypes + e;
				} else {
					renderedTypes = renderedTypes + e + ' -> ';
				}
			});
			console.log("RenderedTypes: ");
			console.log(renderedTypes);
			return Ughh.typed(renderedTypes, raw, arity, newArgs, true);
		}
	}
	return func;
}
