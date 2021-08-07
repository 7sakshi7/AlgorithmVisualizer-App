// selecting fields
const inputField = document.querySelector('.input-field');
const searchedNumber = document.querySelector('.search');
const submit = document.querySelector('.submit');
const containerSpace = document.querySelector('.container-space');

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
         containerSpace.append(child);

    });
}

// sleep function to pause the execution of the code
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}
async function sortElement(array, elementWidth) {
    const len = array.length;
   

    // Algorithm for sorting
    for (let i = 1; i < len; i++) {
        let j = i-1;
      
        const element = array[i];
        const childArray = document.querySelectorAll('.child');
        childArray[i].style.backgroundColor = "white";
        childArray[i].style.color = "black";
       
        while(j>=0 && array[j]>element) {

            // changing colors of blocks

            childArray[j].style.backgroundColor = "lightBlue";
            childArray[j].style.color = "black";
           
            await sleep();
            const temp1 = getComputedStyle(childArray[j+1]).height;
            childArray[j+1].style.backgroundColor = "black";
            childArray[j+1].style.color = "white";
            childArray[j+1].style.height = getComputedStyle(childArray[j]).height;
            childArray[j+1].textContent = array[j];
           
            childArray[j].style.height = temp1;
            childArray[j].textContent = element;


            array[j+1] = array[j];
            j--;
            
        }
        array[j+1] = element;
        console.log(`after ${i} pass`);
        console.log(array);
        childArray[j+1].style.backgroundColor="black";
        childArray[j+1].style.color="white";
        childArray[j+1].textContent = element;
        await sleep();
    }
}