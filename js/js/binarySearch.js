const inputField = document.querySelector('.input-field');
const searchedNumber = document.querySelector('.search');
const submit = document.querySelector('.submit');
const containerSpace = document.querySelector('.container-space');
const header = document.querySelector('.container header')
const headerText = document.querySelector('.container header .headerText')
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
        if (searchedNumber.value == "") {
            header.style.display = "flex";
            headerText.textContent = "Enter Number To Be Searched!!! This field can't be empty"
            setTimeout(() => {
                header.style.display = "none";
            }, 1000);
            return;
        }

    }
    sortArray(e);
}

// sorting array
async function sortArray(e) {
    e.preventDefault();
    const inputValue = inputField.value;
    // console.log(inputValue);
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
    const array = arr.map((ele) => Number(ele));
    showArray(array);

    await sleep();
    containerSpace.innerHTML = "";
    array.sort();
    showArray(array);
    await sleep();
    searchElement(array);
}
// Creating Element
function showArray(array) {

    const totalWidth = containerSpace.offsetWidth - array.length - 1;
    const totalHeight = containerSpace.offsetHeight;
    const elementWidth = totalWidth / array.length;
    const maxElement = Math.max(...array);

    array.forEach((ele, index) => {

        const child = document.createElement('div');
        child.classList.add('child')
        const elementHeight = totalHeight - (maxElement - ele) % 10 * 10;

        child.style.width = elementWidth + 'px';
        child.style.height = elementHeight + 'px';
        child.style.marginRight = '20px';
        child.style.backgroundColor = "black";
        child.textContent = String(ele);
        height.push(elementHeight);
        containerSpace.append(child);
    });
}

function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

// Searching Algorithm
async function searchElement(array) {
    const childArray = document.querySelectorAll('.child');
    const len = array.length;
    let found = 0;
    let low = 0, high = len;

    while (low < high) {
        let mid = Number.parseInt((low + high) / 2);
        console.log(mid, array[mid]);
        // console.log(typeof Number(searchedNumber.value));
        childArray[mid].style.backgroundColor = "lightBlue";
        childArray[mid].style.color = "black";

        await sleep();
        childArray[mid].style.backgroundColor = "black";
        childArray[mid].style.color = "white";
        if (array[mid] == Number(searchedNumber.value)) {
            childArray[mid].style.backgroundColor = "blue";

            header.style.display = "flex";
            header.style.backgroundColor="blue"
            // header.color = "black";
            headerText.textContent = `Number found at ${mid + 1} position`
            setTimeout(() => {
                header.style.display = "none";
            }, 2000);
            found = 1;
            break;
        }
        else if (array[mid] > Number(searchedNumber.value)) {
            high = mid;
        }
        else if (array[mid] < Number(searchedNumber.value))
            low = mid + 1;


    }
    if (found == 0) {
        header.style.display = "flex";
        header.style.backgroundColor="blue"
        // header.color = "black";
        headerText.textContent = `Number not found `
        setTimeout(() => {
            header.style.display = "none";
        }, 2000);
    }

}
