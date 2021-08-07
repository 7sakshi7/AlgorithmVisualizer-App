
const header = document.querySelector('.container header')
const headerText = document.querySelector('.container header .headerText')
const inputField = document.querySelector('.input-field');
const searchedNumber = document.querySelector('.search');
const submit = document.querySelector('.submit');
const containerSpace = document.querySelector('.container-space');
let height = [];

submit.addEventListener('click', checkInput);
function checkInput(e) {
    if (inputField.value == "") {
        header.style.display = "flex";
        headerText.textContent = "Enter Array!!! This field can't be empty"
        setTimeout(() => {
            header.style.display = "none";
        }, 1000);
        return;
    }
    else {
        if (searchedNumber.value == "" || isNaN(Number(searchedNumber.value))) {
            header.style.display = "flex";
            headerText.textContent = "Enter Number To Be Searched!!! This field can't be empty nor it can't be invalis"
            setTimeout(() => {
                header.style.display = "none";
            }, 1000);
            return;
        }

    }
    showArray(e);

}

// Creating Element
function showArray(e) {
    e.preventDefault();
    console.log(inputField.value, typeof inputField.value);
    const inputValue = inputField.value;
    console.log(inputValue);
    const arr = inputValue.split(' ');

    let isValid = 1;
    for(var ele in arr){
        console.log(Number(ele),typeof Number(ele));
        if (isNaN(Number(ele))) {
            header.style.display = "flex";
            headerText.textContent = "Enter a valid Array"
            setTimeout(() => {
                header.style.display = "none";
            }, 1000);
            isValid = 0;
            break;
        }

    }
    if (isValid==0) return;

    const array = arr.map((ele) =>Number(ele));
    console.log(array);

    const totalWidth = containerSpace.offsetWidth - array.length - 1;
    const totalHeight = containerSpace.offsetHeight;
    const elementWidth = totalWidth / array.length;
    const maxElement = Math.max(...array);

    array.forEach((ele, index) => {
        console.log(ele);
        const child = document.createElement('div');
        child.classList.add('child')
        const elementHeight = totalHeight - (maxElement - ele) % 10 * 10;

        console.log(`element height is${elementHeight} and total height is ${totalHeight}`);
        child.style.width = elementWidth + 'px';
        child.style.height = elementHeight + 'px';
        child.style.marginRight = '20px';
        child.style.backgroundColor = "black";
        child.textContent = String(ele);
        height.push(elementHeight);
        containerSpace.append(child);

    });

    searchElement(array, elementWidth);
}

// Searching Algorithm
function searchElement(array, elementWidth) {
    const childArray = document.querySelectorAll('.child');
    const len = array.length;
    let index = 0;
    let result = 0;
    let id = setInterval(() => {
        result = check(array, index, height, elementWidth, childArray[index]);
        console.log(`result of ${array[index]} is ${result}`);
        if (result) {
            clear(id);
           
            header.style.display = "flex";
            header.style.backgroundColor="blue";
            headerText.textContent = `Element ${array[index]} found at ${index}`
            setTimeout(() => {
                header.style.display = "none";
            }, 1500);
            return;
        }
        else
            index++;
    }, 1000);


    setTimeout(() => {
        clearInterval(id);
        if (!result) {
            header.style.display = "flex";
            header.style.backgroundColor="blue";
            headerText.textContent = `Element ${searchedNumber} not found`
            setTimeout(() => {
                header.style.display = "none";
            }, 1500);
        }
    }, (len) * 1000);
}
function clear(id) {
    setTimeout(() => {
        clearInterval(id);
    });

}

// function sleep(){
//     return new Promise(resolve => setTimeout(resolve, 1500));
// }
function check(array, index, height, elementWidth, oldChild) {
    const child = document.createElement('div');
    child.classList.add('child')
    child.style.width = elementWidth + 'px';
    child.style.height = height[index] + 'px';
    child.style.marginRight = '20px';
    child.style.backgroundColor = "white";
    child.style.color = "black";
    child.textContent = String(array[index]);
    containerSpace.replaceChild(child, oldChild);

    if (Number(searchedNumber.value) === array[index]) {
        console.log(Number(searchedNumber.value), array[index]);
        child.style.backgroundColor = "blue";
        return true;
    }

    setTimeout(() => {
        child.style.backgroundColor = "black";
        child.style.color = "white";
    }, 500);
    return false;
}