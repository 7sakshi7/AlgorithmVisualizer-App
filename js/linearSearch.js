
const header = document.querySelector('header')
const headerText = document.querySelector('header .headerText')
const inputField = document.querySelector('.input-field');
const searchedNumber = document.querySelector('.search');
const submit = document.querySelector('.submit');
const containerSpace = document.querySelector('.container-space');
const show = document.querySelector('.show-array');
let height = [];

const t1 = new TimelineMax();
const screenWidth = screen.width;
if (screenWidth > 681)
    t1.fromTo(show, 1, { height: "0vh", width: "0vw" }, { height: "66vh", width: "60vw", ease: Power2.easeInOut })
else
    t1.fromTo(show, 1, { height: "0vh", width: "0vw" }, { height: "66vh", width: "90vw", ease: Power2.easeInOut })


submit.addEventListener('click', checkInput);
function checkInput(e) {
    console.log('entered');
    if (inputField.value == "") {
        if (screenWidth > 681) {

            headerText.textContent = "Enter Array!!! This field can't be empty"
            setTimeout(() => {
                headerText.textContent = ""

            }, 1500);
        }
        else {
            alert('Enter Array!!! This field can\'t be empty')
        }
        return;
    }
    else {
        if (searchedNumber.value == "" || isNaN(Number(searchedNumber.value))) {
            if (screenWidth > 681) {

                headerText.textContent = "Enter Number To Be Searched!!! This field can't be empty nor it can't be empty"
                setTimeout(() => {
                    headerText.textContent = ""

                }, 1500);
            }
            else {
                alert("Enter Number To Be Searched!!! This field can't be empty nor it can't be empty")
            }
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
    for (var ele in arr) {
        console.log(Number(ele), typeof Number(ele));
        if (isNaN(Number(ele))) {
            if (screenWidth > 681) {
                headerText.textContent = "Enter a valid Array"
                setTimeout(() => {
                    headerText.textContent = "";
                }, 1000);
            }
            else {
                alert("Enter a valid Array");
            }
            isValid = 0;
            containerSpace.innerHTML = "";

            break;
        }

    }
    if (isValid == 0) return;

    const array = arr.map((ele) => Number(ele));
    console.log(array);

    const totalWidth = containerSpace.offsetWidth - array.length - 1;
    const totalHeight = containerSpace.offsetHeight;
    const elementWidth = totalWidth / array.length;
    const arrayCopy = [...array]
    arrayCopy.sort()
    const elementHeight = totalHeight - (array.length) * 20;

    array.forEach((ele, index) => {
        console.log(ele);
        const child = document.createElement('div');
        child.classList.add('child')

        console.log(`element height is${elementHeight} and total height is ${totalHeight}`);
        child.style.width = elementWidth + 'px';
        child.style.height = elementHeight + arrayCopy.indexOf(ele) * 10 + 'px';

        child.style.marginRight = '20px';
        child.style.backgroundColor = "greenyellow";
        child.style.color = "black";
        child.textContent = String(ele);
        height.push(elementHeight + arrayCopy.indexOf(ele) * 10);
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

            if (screenWidth > 681) {
                headerText.textContent = `Element ${array[index]} found at ${index + 1}`
                setTimeout(() => {
                    headerText.textContent = "";
                }, 1500);
            }
            else {
                alert(`Element ${array[index]} found at ${index + 1}`);
            }
            inputField.value = "";
            searchedNumber.value = "";
            containerSpace.innerHTML = "";
            return;
        }
        else
            index++;
    }, 1000);


    setTimeout(() => {
        clearInterval(id);
        if (!result) {
            
            if (screenWidth > 681){
                headerText.textContent = `Element ${searchedNumber.value} not found`
                setTimeout(() => {
                }, 1500);
            }
            else{
                alert(`Element ${searchedNumber.value} not found`)
            }          
            headerText.textContent = "";
            inputField.textContent = "";
            searchedNumber.textContent = "";
            containerSpace.innerHTML = "";
        }
    }, (len) * 1100);
}
function clear(id) {
    setTimeout(() => {
        clearInterval(id);
    }, 1000);

}

function check(array, index, height, elementWidth, oldChild) {
    const child = document.createElement('div');
    child.classList.add('child')
    child.style.width = elementWidth + 'px';
    child.style.height = height[index] + 'px';
    child.style.marginRight = '20px';
    child.style.backgroundColor = "yellow";
    child.style.color = "black";
    child.textContent = String(array[index]);
    containerSpace.replaceChild(child, oldChild);

    if (Number(searchedNumber.value) === array[index]) {
        console.log(Number(searchedNumber.value), array[index]);
        child.style.backgroundColor = "black";
        child.style.color = "white";
        return true;
    }
    else
        return false;
}