
let numbers = document.querySelectorAll('#number');
let res = document.querySelector('.disp');
let equal = document.querySelector('.equal');
let opers = document.querySelectorAll('#operator');
let actions = document.querySelectorAll('.common');
let del = document.querySelector('.del');


let equalPressed = false;

let exp = '';

let allOperators = ['+', '-', '/', '=', '*', ')', '('];



del.addEventListener('click', ()=> {
    res.innerText = '';
    exp = '';
});

for (let i = 0; i < actions.length; i++) {
    actions[i].addEventListener('click', () => {
        if (!~allOperators.indexOf(actions[i].innerText)) {
            exp = exp + actions[i].innerText;
            res.innerText = '';
            dispCount(exp);
        } else {
            if (exp !== '') {
            exp = exp + " " + actions[i].innerText + " ";
            res.innerText = '';
            dispCount(exp);
            }
        }
    });
}

equal.addEventListener('click', () => {
    equalPressed = true;
    // res.innerText = reversePolish(toPostfix(exp));
    let postArr = toPostfix(exp).replace(/\s+/g, ' ').trim().split(" ");
    exp = fixLast(postArr).join(' ');
    res.innerText = reversePolish(exp);
    exp = '';
});

function fixLast(postArr) {
    let num = "";

    for (let i = 0; i < postArr.length; i++) {
        if (~allOperators.indexOf(postArr[i][0])) {
            postArr[i] = postArr[i].split("").join(' ');
        }
    }
    let last = postArr[postArr.length - 1];
    for (let i = 0; i < last.length; i++) {
        if (~allOperators.indexOf(last[i])) {
            postArr.push(last[i]);
        } else {
            num += last[i];
        }
    }
    postArr[postArr.indexOf(last)] = num;


    return postArr
}

function dispCount(exp) {
    for (let i = 0; i < exp.length; i++) {
        res.innerText += exp[i];
    }
}


function toPostfix(infixExp) {
    let stack = [];
    let postfixExp = "";
    let operators = {
	    "+": 1,
	    "-": 1,
	    "*": 2,
	    "/": 2
    };
    function parse(expression) {
    	if (expression.length === 0) {
    	    if (stack.length > 0) {
        		while(stack.length > 0) {
        		    postfixExp += stack.pop();
        		}
    	    }
    	    return postfixExp;
    	}
    	if (/[0-9]/.test(expression[0])) {
    	    postfixExp += expression[0]
    	}
    	else {
    	    if (expression[0] in operators) {
        		while (stack.length > 0) {
        		    if (operators[expression[0]] <= operators[stack[stack.length-1]]) {
        			    postfixExp += stack.pop();
        		    } else {
                        postfixExp += " ";
        			    break;
        		    }
        		}
        		stack.push(expression[0]);
    	    }
    	    else if (expression[0] === "(") {
    		    stack.push(expression[0]);
    	    }
    	    else if (expression[0] === ")") {
        		while (stack[stack.length-1] !== "(") {
        		    postfixExp += stack.pop();
        		}
    		    stack.pop();
    	    }
            postfixExp += " ";
    	}
    	expression = expression.slice(1);
    	return parse(expression);
    }
    return parse(infixExp);
}

function reversePolish(newExpr) {
    let expr = newExpr.split(" ");
    let stack =[];
     if(expr === ''){
      return 0;
    }
  
    for(let i=0; i<expr.length; i++) {
      if(!isNaN(expr[i]) && isFinite(expr[i])) {
        stack.push(expr[i]);
  
      }else {
        let a = stack.pop();
        let b = stack.pop();
        if(expr[i] === "+") {
          stack.push(parseInt(a) + parseInt(b));
        } else if(expr[i] === "-") {
            stack.push(parseInt(b) - parseInt(a));
          } else if(expr[i] === "*") {
              stack.push(parseInt(a) * parseInt(b));
          } else if(expr[i] === "/") {
              stack.push(parseInt(b) / parseInt(a));
          } else if(expr[i] === "^") {
              stack.push(Math.pow(parseInt(b), parseInt(a)));
          }
      }
    }
  
    if(stack.length > 1) {
      return "ERROR";
    }else {
      return stack[0];
    }
  
  }