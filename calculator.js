// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Do_not_ever_use_eval!
// NEVER USE Eval() 

function add(a, b) {
	return (a + b);
}
function subtract(a, b){
	return (a - b);
}
function multiply(a, b){
	return (a * b);
}
function divide(a, b){
	if (!b) {
		return ((a*1.0)/b)
	} else {
		return (Infinity)
	}
	
}
function operate(operator, a, b){
	switch (operator) {
		case "+":
			add(a, b);
			break;
		case "-":
			subtract(a, b);
			break;
		case "*":
			multiply(a, b);
			break;
		case "/":
			divide(a, b);
			break;
		default:
			break;
	}
}