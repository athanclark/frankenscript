var ld = require("lodash");

//Type _checking_ for native javascript values
function is(type, obj){
	var clas = Object.prototype.toString.call(obj).slice(8, -1);
	return obj !== undefined && obj !== null && clas === type
}

//Cloning Arrays
function cloneArray(arr){
	var arr1 = clone(arr);
	var result = new Array();
	for (k in arr1) {if (!(k === undefined)) {result.push(arr1[k]);}}
	return result;
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

function typeAst(string){
	var results = string.split('->');
	results = ld.map(results, function(s){return s.trim();});
	return results;
}

function renderTypeSig(typeArr){
	var renderedTypes1 = "";
	typeArr.forEach(function(e,i,a){
		if (i === (a.length-1)) {
			renderedTypes1 = renderedTypes1 + e;
		} else {
			renderedTypes1 = renderedTypes1 + e + ' -> ';
		}
	});
	return renderedTypes1;
}

function parameterAst(raw){	
	var paramsRe = /\(.*\)/;
	var params1 = raw.toString().match(paramsRe);
	var params2 = params1[0].slice(1, params1[0].length-1);
	var params = params2.split(',');
	return params;
}

function type(obj){
	var typeVal = "";
	typeStrings.forEach(function(e,i,a){if (is(e,obj)) {typeVal = e}});
	if (typeVal === "") {
		typeVal = 'Undefined';
	}
	return typeVal;
}




//Ughh revamp for type enforcement on parameters for functions
// Right now, I only have trivial type enforcement of parameters,
// through the signature.

//       typed(typesig, raw, arity, args, postDeclaration)
function typed(typesig, raw){
	// ---- Initialize implicit variables
	var types = new Array();
	types = typeAst(typesig);
	if (arguments[3] === undefined) {
		var params = parameterAst(raw);
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
	// ---- End Initialize implicit variables

	function func(next){
		var nexts = new Array();
		for (k in arguments) {if (!(k === undefined)) {nexts.push(arguments[k]);}}
		var newTypes = cloneArray(types);
		var failed = false;
		// Simple typecheck of applied parameters
		nexts.forEach(function(e,i,k){
			if (!(type(e) === newTypes[i])) { //check each parameter type
				failed = true;
			} else {
				newTypes = newTypes.slice(1,newTypes.length);
			}
		});
		if (failed) {return new Error("Parameter(s) does not match type signature");}
		var newArgs = cloneArray(args);
		nexts.forEach(function(e){newArgs.push(e);});

		// Ready for computing
		if (newArgs.length === arity) {
			var result = raw.apply(undefined, newArgs);
			if (!(type(result) === newTypes[0])) { //check result type
				return new Error("Result " + result + " does not match type signature");
			} else {
				return result;
			}
		} else {
			// Print new type signature
			var renderedTypes = renderTypeSig(newTypes);
			return Ughh.typed(renderedTypes, raw, arity, newArgs, true);
		}
	}
	func.typeSig = renderTypeSig(types);
	return func;
}


module.exports = { typed : typed
		, is : is
		, type : type
		, cloneArray : cloneArray
		, typeAst : typeAst
		, renderTypeSig : renderTypeSig
		, parameterAst : parameterAst
}
