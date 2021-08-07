// selecting fields
const inputField = document.querySelector('.input-field');
const searchedNumber = document.querySelector('.search');
const submit = document.querySelector('.submit');
const containerSpace = document.querySelector('.container-space');
let height = [];

// submit button for sorting
submit.addEventListener('click', checkInput);

// checking input fields
function checkInput(e) {
    if (inputField.value == "") {
        header.style.display = "flex";
        headerText.textContent = "Enter Array!!! This field can't be empty"
        setTimeout(() => {
            header.style.display = "none";
        }, 1000);
        return;
    }
    else
    showArray(e);
}

// computing styles 
function showArray(e) {
    e.preventDefault();
  
    const inputValue = inputField.value;
    const arr = inputValue.split(' ');

    // checking whether array does not have any invalid number
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

    // if everything is good
    const array = arr.map((ele) => Number(ele));
   
    create(array);
    const totalWidth = containerSpace.offsetWidth - array.length - 1;
    const elementWidth = totalWidth / array.length;

    //    searchElement(array,elementWidth);90 87 23 45 78 47 22
    sortElement(array, elementWidth);
}

function create(array) {
    const totalWidth = containerSpace.offsetWidth - array.length - 1;
    const totalHeight = containerSpace.offsetHeight;
    const elementWidth = totalWidth / array.length;
    const maxElement = Math.max(...array);

    array.forEach((ele, index) => {
        // console.log(ele);
        const child = document.createElement('div');
        child.classList.add('child')
        const elementHeight = totalHeight - (maxElement - ele) % 10 * 10;

        // console.log(`element height is${elementHeight} and total height is ${totalHeight}`);
        child.style.width = elementWidth + 'px';
        child.style.height = elementHeight + 'px';
        child.style.marginRight = '20px';
        child.style.backgroundColor = "black";
        child.textContent = String(ele);
        height.push(elementHeight);
        containerSpace.append(child);

    });
}

// sleep function to pause the execution of the code
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}
async function sortElement(array, elementWidth) {
    const len = array.length;
    // console.log(len);

    // Algorithm for sorting
    for (let i = 0; i < len - 1; i++) {
        let min = i;
        
        const childArray = document.querySelectorAll('.child');
        childArray[i].style.backgroundColor = "white";
        childArray[i].style.color = "black";
       
        for (let j = i + 1; j < len; j++) {

            // changing colors of blocks

            childArray[j].style.backgroundColor = "lightBlue";
            childArray[j].style.color = "black";
            // console.log(array[j], array[j + 1]);
            await sleep();

            if (array[min] > array[j]) {
                
                childArray[min].style.backgroundColor = "black";
                childArray[min].style.color = "white";
                childArray[j].style.backgroundColor = "white";
                childArray[j].style.color = "black";
                min = j;
                // console.log(array);
                await sleep();
            }
            else {

                childArray[i].style.backgroundColor = "black";
                childArray[i].style.color = "white";

                childArray[j].style.backgroundColor = "black";
                childArray[j].style.color = "white";
            }
        }
        if (min != i) {
            const temp = array[i];
            const tempStyle = getComputedStyle(childArray[i]).height;
            childArray[i].style.height = getComputedStyle(childArray[min]).height;
            childArray[i].textContent = childArray[min].textContent;
            childArray[min].textContent = temp;
            childArray[min].style.height = tempStyle;

            array[i] = array[min];
            array[min] = temp;

            childArray[i].style.backgroundColor="black";
            childArray[min].style.backgroundColor="black";
            childArray[i].style.color="white";
            childArray[min].style.color="white";
            await sleep();
        }


    }
}