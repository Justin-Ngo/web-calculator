let calculatorNamespace = {
	// object literal notation (you could use direct assignment as well i.e. calculatorNamepsace.rawr = something;)
	lastBgColor: ""
}

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
	if (b) {
		return ((a*1.0)/b);
	} else {
		return (Infinity);
	}
	
}

function operate(operator, a, b){
	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "*":
			return multiply(a, b);
		case "/":
			return divide(a, b);
		default:
			byClass("display")[0].classList.add("invalid");
			return "Invalid Input";
	}
}

function validateInput(screenDisplay){
	// check to see if input string is valid i.e. one period
	// Needed when input[type=text] is not readonly
	if ((screenDisplay[0].value.split('.').length-1) > 1 || isNaN(screenDisplay[0].value)){
		screenDisplay[0].value = "Invalid Input";
		screenDisplay[0].classList.add("invalid");
		return false;
	}
	return true;
}

function init_btns() {
	document.querySelectorAll('input.btn').forEach(item => {
		item.addEventListener('mousedown', event =>{
			if (event.buttons === 1 ){
				display(item.value);
			}
		})
	})	
}


function display(val){
	let screenDisplay = byClass('display');

	if (byClass('invalid').length > 0){
		screenDisplay[0].value = "";
		byClass('operator')[0].textContent = "";
		screenDisplay[0].classList.remove("invalid");
	}

	if (isNaN(val) && val !== "."){
		let op = byClass('operator')[0];
		op.textContent = val;
		let inputs = byClass("input-container");
		if (val == "C") {
			screenDisplay[0].value = "";
			inputs[0].dataset.operator = "";
			inputs[0].dataset.a = "";
			inputs[0].dataset.b = "";
			inputs[0].classList.remove("new-num");
		} else {

			if (validateInput(screenDisplay)) {
				if (inputs[0].dataset.a == ""){
					inputs[0].dataset.a = screenDisplay[0].value;
				} else {
					inputs[0].dataset.b = screenDisplay[0].value;
				}
			}
			
			if (inputs[0].dataset.a !=="" && inputs[0].dataset.b !==""){
				let ans = operate(inputs[0].dataset.operator, Number(inputs[0].dataset.a), Number(inputs[0].dataset.b));
				if (val !== "="){
					screenDisplay[0].value = String(ans);
					inputs[0].dataset.a = String(ans);
					inputs[0].dataset.b = "";
				} else {
					screenDisplay[0].value = String(ans);
					inputs[0].dataset.a = "";
					inputs[0].dataset.b = "";
				}
			
			}

			inputs[0].classList.add("new-num");
			if (val !== "="){
				inputs[0].dataset.operator = val;
			} else {
				inputs[0].dataset.operator = "";
			}
		}
	}
	else 
	{
		if (byClass('new-num').length > 0){
			screenDisplay[0].value = "";
			byClass("input-container")[0].classList.remove("new-num");
		}
		if (val === "." && validateInput(screenDisplay)){
			screenDisplay[0].value += val;	
		} else {
			screenDisplay[0].value += val;
		}
		// This syntax took me so long to get UGH (ive tried direction: rtl but that has set backs)
		screenDisplay[0].scrollLeft = screenDisplay[0].scrollWidth;
	}
}


// Sets button color with keyboard input
// Assigns keyboard input to buttons
function toggleKeyPress(key, action) {
	let btnClass;
		let bgColor = "#74f790";
	switch(key) {
	case("1"):
		btnClass = "btn one";
		break;
	case("2"):
		btnClass = "btn two";
		break;
	case("3"):
		btnClass = "btn three";
		break;
	case("4"):
		btnClass = "btn four";
		break;
	case("5"):
		btnClass = "btn five";
		break;
	case("6"):
		btnClass = "btn six";
		break;  
	case("7"):
		btnClass = "btn seven";
		break;
	case("8"):
		btnClass = "btn eight";
		break;
	case("9"):
		btnClass = "btn nine";
		break;
	case("0"):
		btnClass = "btn zero";
		break;
	case("Enter"):
		btnClass = "btn equal";
		bgColor = "#be1ba9";
		break;
	case("Backspace"):
		btnClass = "display";
		break;
	case("-"):
		btnClass = "btn subtract";
		break;
	case("+"):
		btnClass = "btn add";
		break;
	case("*"):
		btnClass = "btn multiply";
		break;
	case("/"):
		btnClass = "btn divide";
		break;
	case("."):
		btnClass = "btn dot";
		break;
	default:
		return;
	}
	let buttonStyle =  byClass(btnClass);
	if (action == "keydown") {
		if (calculatorNamespace.lastBgColor.length === 0) {
			calculatorNamespace.lastBgColor = buttonStyle[0].style.backgroundColor;
		}
		buttonStyle[0].style.backgroundColor = bgColor;
	}
	if (action == "keyup") {
		calculatorNamespace.lastBgColor = "";
		buttonStyle[0].style.backgroundColor = calculatorNamespace.lastBgColor;
		}
}


window.addEventListener("keydown", function(event){
	event.preventDefault(); // enter triggers a click event for accessibility thats why you need
	let input;
	switch(event.key){
		case("Enter"):
			input = "=";
			break;
		case("Backspace"):
			byClass("display")[0].value = byClass("display")[0].value.slice(0,-1);
			return;
		default:
			input = event.key;
			break;
	}
	event.preventDefault();
	toggleKeyPress(event.key, "keydown");
	display(input);
})

window.addEventListener("keyup", event=>{
	event.preventDefault();
	toggleKeyPress(event.key, "keyup");
	event.preventDefault();
})