// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Do_not_ever_use_eval!
// NEVER USE Eval() 

let byClass = document.getElementsByClassName.bind(document);

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



function display(){
	document.querySelectorAll('input.btn').forEach(item => {
		item.addEventListener('mousedown', event =>{
			if (event.buttons === 1 ){
				if (isNaN(item.value) && item.value !== "."){
					byClass('operator')[0].textContent = item.value;
				}
				else 
				{
					if (item.value == "."){
						byClass('display')[0].value += item.value;	
					}
					let el = byClass('display')[0];
					el.value += item.value;
					// This syntax took me so long to get UGH (ive tried direction: rtl but that has set backs)
					el.scrollLeft = el.scrollWidth;
				}
			}
		})
	})
}