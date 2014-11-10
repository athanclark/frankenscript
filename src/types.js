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
	var typeVal;
	typeStrings.forEach(function(e,i,a){if (is(e,obj)) {typeVal = e}});
	return typeVal;
}

module.exports.is = is;
module.exports.type = type;
