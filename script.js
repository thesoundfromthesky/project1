function getSelector(_selector)
{
    let selector = _selector;
    let element = document.querySelector(selector);
    return element;
}

function setInput(_self){
    let self = _self;
    let input = getSelector("#input");
    if(_self.value !== undefined)
        self = _self.value;
    input.value += self;
}

function clearInput(){
    let result = getSelector("#result");
    let input = getSelector("#input");
    result.value = null;
    input.value = null;
}

function calculate(_operator){
    let operator = _operator;
    let result = getSelector("#result");
    let input = getSelector("#input");
    let resultNum = Number.parseFloat(result.value);
    let inputNum = Number.parseFloat(input.value);
    if (isNaN(resultNum))
        resultNum = 0;
    if (isNaN(inputNum))
        inputNum = 0;
    if (_operator.value !== undefined)
        operator = _operator.value;

    switch (operator) {
        case '+':
            resultNum += inputNum;
            break;
        case '-':
            resultNum -= inputNum;
            break;
        case '*':
            resultNum *= inputNum;
            break;
        case '/':
            resultNum /= inputNum;
            break;
        default:
            return;
    }
    result.value = resultNum;
    input.value = null;
}

document.body.addEventListener("keydown", (event) =>{
    if(event.key === '+' || event.key === '-' || 
    event.key === '*' || event.key === '/')
        this.calculate(event.key);
    else if('0' <= event.key && event.key <= '9' )
        this.setInput(event.key);
})

