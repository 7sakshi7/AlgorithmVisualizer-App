
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
    t1.fromTo(show, 1, { height: "100vh", width: "100vw" }, { height: "66vh", width: "60vw", ease: Power2.easeInOut })
else
    t1.fromTo(show, 1, { height: "0vh", width: "0vw" }, { height: "66vh", width: "90vw", ease: Power2.easeInOut })

submit.addEventListener('click', checkInput);

function checkInput(e) {
    if (inputField.value == "") {
        headerText.textContent = "Enter Array!!! This field can't be empty"
        setTimeout(() => {
            headerText.textContent = ""

        }, 1500);
        return;
    }
    else {
        if (searchedNumber.value == "" || isNaN(Number(searchedNumber.value))) {

            headerText.textContent = "Enter Number To Be Searched!!! This field can't be empty nor it can't be empty"
            setTimeout(() => {
                headerText.textContent = ""

            }, 1500);
            return;
        }

    }
    sortArray(e);
}

// sorting array
async function sortArray(e) {
    e.preventDefault();
    const inputValue = inputField.value;

    const arr = inputValue.split(' ');

    let isValid = 1;
    for (var ele in arr) {
        console.log(Number(ele), typeof Number(ele));
        if (isNaN(Number(ele))) {
            headerText.textContent = "Enter a valid Array"
            setTimeout(() => {
                headerText.textContent = "";
            }, 1000);
            isValid = 0;
            break;
        }

    }
    if (isValid == 0) return;
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
    const elementHeight = totalHeight - (array.length) * 20;

    array.forEach((ele, index) => {

        const child = document.createElement('div');
        child.classList.add('child')

        child.style.width = elementWidth + 'px';
        child.style.height = elementHeight + array.indexOf(ele) * 10 + 'px';
        child.style.marginRight = '20px';
        child.style.backgroundColor = "greenyellow";
        child.style.color = "black";
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
        childArray[mid].style.backgroundColor = "yellow";
        childArray[mid].style.color = "white";
        if (array[mid] == Number(searchedNumber.value)) {
            childArray[mid].style.backgroundColor = "black";

            // header.style.display = "flex";
            // header.style.backgroundColor="blue"
            headerText.textContent = `Number found at ${mid + 1} position`;
            setTimeout(() => {
                headerText.textContent = ""
                // header.style.display = "none";
            }, 2000);
            found = 1;
            inputField.textContent = "";
            searchedNumber.textContent = "";
            containerSpace.innerHTML = "";
            break;
        }
        else if (array[mid] > Number(searchedNumber.value)) {
            high = mid;
        }
        else if (array[mid] < Number(searchedNumber.value))
            low = mid + 1;


    }
    if (found == 0) {
        headerText.textContent = `Number not found `
        setTimeout(() => {
            headerText.textContent = "";
        }, 2000);
        inputField.textContent = "";
        searchedNumber.textContent = "";
        containerSpace.innerHTML = "";

    }

}
