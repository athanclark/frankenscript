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

module.exports.zipWith = zipWith;
module.exports.app = app;
