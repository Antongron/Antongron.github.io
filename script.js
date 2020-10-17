let numbers = document.querySelectorAll('[data-number]'),
    operations = document.querySelectorAll('[data-operation]'),
    decemalBtn = document.querySelector('[decimal]'),
    clearBtns = document.querySelectorAll('.clear_btn'),
    resultBtn = document.querySelector('[data-equals]'),
    plusMinusBtn = document.querySelector('[plus-minus]'),
    sqrtBtn = document.querySelector('.sqrt'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';
    

for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        NumberPress(e.target.textContent);
    })
};

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
};

for (let i = 0; i < clearBtns.length; i++) {
    
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.srcElement.id);
    });
};

decemalBtn.addEventListener('click', decimal);

plusMinusBtn.addEventListener('click', negativeNumber);

sqrtBtn.addEventListener('click', sqrtFunc);


function NumberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
                display.value = number;
            } else {
                display.value += number;
            }
    }; 
};

function operation(op) {
    let localOperationMemory = display.value;


    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            MemoryCurrentNumber += +localOperationMemory;
        } else if (MemoryPendingOperation === '-') {
            MemoryCurrentNumber -= +localOperationMemory;
        } else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= +localOperationMemory;
        } else if (MemoryPendingOperation === '÷') {
            MemoryCurrentNumber /= +localOperationMemory;
        }  else if (MemoryPendingOperation === '^') {
            MemoryCurrentNumber **= parseFloat(localOperationMemory);
        } else {
            MemoryCurrentNumber= parseFloat(localOperationMemory);
        };
        display.value = Math.round(MemoryCurrentNumber*100000000) / 100000000;
        if (display.value.toString() == NaN.toString()) {
            display.value = "Error, clear all further";
        };
        MemoryPendingOperation = op;
    }

    console.log('click on button with operation ' + op +'!');
};

function decimal(argument) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory ='0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1 ) {
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
};

function clear(id) {
    if (id === 'DEL') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'AC') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
    console.log('click on button with '+ id +'!');
};



function negativeNumber(argument) { 
    let localNegativeNumber = display.value;

    if (MemoryNewNumber) {
        localNegativeNumber *=(-1);
        MemoryNewNumber = false;
    } else {
            localNegativeNumber *= (-1);
        };
    display.value = localNegativeNumber;
};

function sqrtFunc(argument) {
    let localSqrt = display.value;
    localSqrt = +Math.sqrt(localSqrt);
    if (localSqrt.toString() == NaN.toString()) {
        localSqrt = "Error";
    };
    display.value = localSqrt;

    
};

