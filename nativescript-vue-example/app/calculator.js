//중위표현식 -> 후위 표현식
function fn_infixToPostfix(infixStr) { //012+2*3 로 입력 받았을때 ->  12 + 2 * 3 ->  = 12 + 6 ->   = 18
 
  const valInfix = infixStr;
  const arrayInfix = valInfix.split('');
  console.log("arrayInfix : " + arrayInfix);  //0,1,2,+,2,*,3
  const arrayOperators = []; //연산자 배열
  const arrayPostfix   = []; //후위 표기식 배열 

  // 0. 우선순위 순서 :  '(' ')' < '+' '-' < '*' '/'
  const objCharPriority = {
    '*' : 3,
    '/' : 3,
    '+' : 2,
    '-' : 2,
    '(' : 1,
    ')' : 1
  }

  // 1. 입력받은 중위 표기식에서 한 글자씩 읽어들인다.
  let tempNumberInput = '';
  
  console.log("arrayInfix.length : " + arrayInfix.length); //7
  
  for (let i = 0; i < arrayInfix.length; i++) {

    // 2. 읽어들인 글자가 피연산자이면 후위 표기식에 적는다
    if (arrayInfix[i] >= '0' && arrayInfix[i] <= '9' || arrayInfix[i] == '.') {
      tempNumberInput += arrayInfix[i];
      console.log("if tempNumberInput : " + tempNumberInput);  //012 | 2 | 3
  
    } else {
      
      // 숫자는 1문자가 아니다!
      if (tempNumberInput != '') {
        arrayPostfix.push(parseFloat(tempNumberInput)); // parseFloat():문자열을 분석해 부동소수점 실수로 반환 / push():배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환
        tempNumberInput = ''; //push 하고 초기화 

        console.log("숫자 뽑기 - arrayPostfix : " + arrayPostfix);  // 12 | 2 | 3 
      }
      
      if (arrayInfix[i] === ' ') continue; // 중위표현식이 ' ' 될때 까지 실행 
      
      // 3. 읽어들인 글자가 연산자이면
    
      if (arrayInfix[i] === '(') {
        // 3-1. 왼쪽 괄호일 경우 스택에 넣는다.
        arrayOperators.push(arrayInfix[i]);  

      } else if (arrayInfix[i] === ')') {
        // 3-2. 오른쪽 괄호일 경우 왼쪽 괄호를 꺼낼 때까지 스택에서 하나씩 꺼내 후위 표기식에 적고 왼쪽 괄호를 뽑으면 버리고 끝낸다.
        let tmp = '';
        while (arrayOperators.length) {
          tmp = arrayOperators.pop();
          if (tmp === '(') break;
          arrayPostfix.push(tmp);
        }
        console.log("()계산을 위한 - arrayPostfix : " + arrayPostfix); 

      } else {
        // 3-3. 나머지 사칙 연산자의 경우 그 연산자가 스택의 최상위 노드보다 우선순위가 높을 때까지 스택의 최상위 노드를 꺼내 후위 표기식에 적는다.

        while (arrayOperators.length && objCharPriority[arrayOperators[arrayOperators.length - 1]] >= objCharPriority[arrayInfix[i]]) {
          const tmp = arrayOperators.pop();
          arrayPostfix.push(tmp);
        }

        console.log("사칙연산을 위한  - arrayPostfix : " + arrayPostfix); 
        
        // 현재 연산자가 스택의 최상위 노드보다 우선순위가 높아졌다면 스택에 넣고 끝낸다. 
        arrayOperators.push(arrayInfix[i]);

        console.log("사칙연산을 위한  - arrayOperators : " + arrayOperators); 
        
      }
      
    }   
        
  }
  
  // 숫자는 1문자가 아니다!
  if (tempNumberInput != '') {
    arrayPostfix.push(parseFloat(tempNumberInput));
    tempNumberInput = '';

    console.log("마지막 ===== arrayPostfix : " + arrayPostfix); 
  }
  
  // 4. 1~3 을 반복해서 중위 표기식을 모두 읽어들였다면 스택에 있는 연산자를 최상위 노드부터 꺼내 후위 표기식에 적는다.
  while (arrayOperators.length)
    arrayPostfix.push(arrayOperators.pop());

    console.log("마지막 ====== arrayPostfix : " + arrayPostfix); 
        
  return postfix = arrayPostfix.join(' ');

}

//후위표현식 계산 
function fn_calcPostfix(postfix){

try {

const operatorFunctions = {
  '*' : (o1, o2) => { return o1 * o2 },
  '/' : (o1, o2) => { return o1 / o2 },
  '+' : (o1, o2) => { return o1 + o2 },
  '-' : (o1, o2) => { return o1 - o2 }
}

const stringPostfix = postfix;

const arrayPostfix = postfix.split(' ');

const arrayCalcStack = [];

for (let i = 0; i < arrayPostfix.length; i++) {
  
  if (!isNaN(arrayPostfix[i])) {
    // 숫자로 인식되는 부분만큼 읽어서 스택에 푸시한다.
    arrayCalcStack.push(parseFloat(arrayPostfix[i]));
  } else {
    
    // 연산자인경우 피연산자 두개를 꺼내서 연산 후 결과를 스택에 넣는다.
    const operator = arrayPostfix[i];
    
    const operand2 = arrayCalcStack.pop();
    const operand1 = arrayCalcStack.pop();
            
    const operateResult = operatorFunctions[operator](operand1, operand2);
    
    arrayCalcStack.push(operateResult);
            
  }
  
}

// 마지막으로 스택에 남아있는 값이 최종연산된 값이다
return arrayCalcStack.pop();

} catch (e) {
// 표기식 오류
}
}

function fn_inputUser(input){
  console.log("fn_inputUser=>init#######")
  //while, prompt 제거 
  if (input != "=") //012-+2*3 -> 012+2*3
   {        
          let lastChar = rst.charAt(rst.length-1); //문자열의 마지막 문자 가져오기 
          console.log("lastChar : " + lastChar);
      

          if(isNumeric(input) && isNumeric(lastChar)){ //숫자일때 - 이음
            rst += input;
            console.log("숫자를 연속으로 입력 받을때(이음) : " + rst);

          }else if((/^\+$|^\-$|^\*$|^\/$/).test(input) && isNumeric(lastChar) ){ //연산자이고, 마지막문자열이 숫자일때
              rst += input; 
              console.log("연산자이고, 마지막문자열이 숫자일때 : " + rst);
                

          }else if((/^\+$|^\-$|^\*$|^\/$/).test(lastChar) && (/^\+$|^\-$|^\*$|^\/$/).test(input)){ // 마지막문자열이 연산자이고, 입력문자가 연산자일때

              //rst char pop
              rst =rst.slice(0, -1); 
              //rst.substring(0, rst.length - 1); 
              rst += input; 
              console.log("마지막문자열이 연산자일때 : " + rst); 
                
          }else if((/^\+$|^\-$|^\*$|^\/$/).test(lastChar) && isNumeric(input) ){ // 마지막문자열이 연산자이고, 입력문자가 숫자일때
                
            rst += input; 
            console.log("마지막문자열이 연산자이고, 입력문자가 숫자일때 : " + rst);
            
          }
    
  } 

  let infixToPostfix = fn_infixToPostfix(rst);
  console.log("==========infixToPostfix========== : " + infixToPostfix);

  let calcPostfix = fn_calcPostfix(infixToPostfix);
  console.log("==========calcPostfix========== : " + calcPostfix);

  return calcPostfix

}


function isNumeric(s) {
  s += ''; // 문자열로 변환
  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
  if (s == '' || isNaN(s)) return false;
  return true;
}