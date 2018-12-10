function getSelector(_selector)
{
    let selector = _selector;
    let element = document.querySelector(selector);
    return element;
}

function setInput(_self){
    let self = _self;
    let input = getSelector("#input");
    if (_self.value !== undefined)
        self = _self.value;
    let temp = input.value;
    temp += self;
    if (isNaN(temp))
        return;        
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

    if (Number.isNaN(Number(input.value)))
        return;

    let inputPointIndex = input.value.indexOf('.');
    let inputDigit = 0;
    if(-1 < inputPointIndex)
    {
        let inputLen = input.value.length;
        inputDigit = inputLen - inputPointIndex - 1;
    }

    let resultPointIndex = result.value.indexOf('.');
    let resultDigit = 0;
    if(-1 < resultPointIndex)
    {
        let resultLen = result.value.length;
        resultDigit = resultLen - resultPointIndex - 1;
    }
    
    let digit = resultDigit;
    if(resultDigit < inputDigit)
        digit = inputDigit;
    let decimal = 10 ** digit;
    if (-1 < inputPointIndex || -1 < resultPointIndex) {
        result.value = (result.value * decimal).toFixed();
        input.value = (input.value * decimal).toFixed();
    }

    let resultNum = Number.parseInt(result.value);
    let inputNum = Number.parseInt(input.value);

    if (Number.isNaN(resultNum))
        resultNum = 0;

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
    if (-1 < inputPointIndex || -1 < resultPointIndex)
        result.value = resultNum / decimal;
    else
        result.value = resultNum;
    input.value = null;
}

document.body.addEventListener("keydown", (event) => {
    let element = document.activeElement;
    if (element.id !== "input") {
        if (event.key === '+' || event.key === '-' ||
            event.key === '*' || event.key === '/')
            this.calculate(event.key);
        else if ('0' <= event.key && event.key <= '9')
            this.setInput(event.key);
        else if (event.key === '.')
            this.setInput(event.key);
        else if (event.key === 'Delete') {
            let input = getSelector("#input");
            let len = input.value.length;
            if(0 < len)
                input.value = input.value.substring(0, len - 1);
        }
    }

})
