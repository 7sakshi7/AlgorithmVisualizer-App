// selecting fields
const inputField = document.querySelector('.input-field');
const searchedNumber = document.querySelector('.search');
const submit = document.querySelector('.submit');
const containerSpace = document.querySelector('.container-space');
const headerText = document.querySelector('.headerText');
let height = [];

// color for separating elements
const color = ["blue", "green", "brown", "aqua"];
// color for merging elements
const mergeColor = ["violet", "red", "orange"];

// submit button for sorting
submit.addEventListener('click', checkInput);

// checking input fields
function checkInput(e) {
    if (inputField.value == "") console.log('Enter the array');
    showArray(e);
}

// computing styles 
function showArray(e) {
    e.preventDefault();

    const inputValue = inputField.value;
    const arr = inputValue.split(' ');
    const array = arr.map((ele) => Number(ele));

    create(array);
    const totalWidth = containerSpace.offsetWidth - array.length - 1;
    const elementWidth = totalWidth / array.length;

    //    searchElement(array,elementWidth);90 87 23 45 78 47 22
    sortElement(array, elementWidth);
}


// createing array div
function create(array) {
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

// sleep function to pause the execution of the code
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}
function sortElement(array, elementWidth) {
    const len = array.length;

    // Algorithm for sorting
    mergeSort(0, len - 1, array);
}

async function mergeSort(l, r, array) {
    if (l >= r) return;
    let mid = Number.parseInt((l + r) / 2);

    // l to mid
    
    await addElements(l, mid);
    headerText.textContent = `Divided the array and calling mergeSort from elements ${l+1} (${array[l]}) to ${mid+1} (${array[mid]})`;
    await sleep();
    await mergeSort(l, mid, array);

    // mid+1 to r
    await addElements(mid + 1, r);
    headerText.textContent = `Divided the array and calling mergeSort from elements ${mid+2} (${array[mid+1]}) to ${r+1} (${array[r]})`;
    await sleep();
    await mergeSort(mid + 1, r, array);

    // merge
    await merge(l, r, mid, array);
}

async function merge(l, r, mid, array) {
    headerText.textContent = `Merging from position ${l+1} (${array[l]}) to ${r+1} (${array[r]})`;
    await sleep();
    const childArray = document.querySelectorAll('.child');
    let leftArray = [], rightArray = [];
    
    for (let i = l; i <= mid; i++) {
        leftArray.push(array[i]);
    }
    
    for (let i = mid + 1; i <= r; i++) {
        rightArray.push(array[i]);
    }
    
    leftArray.push(Number.MAX_VALUE);
    rightArray.push(Number.MAX_VALUE);
    let lsize = 0, rsize = 0;
    const colorChild = Math.floor(Math.random() * 3);
    console.log(colorChild, 'color child ');
   
    for (let i = l; i <= r; i++) {
        if (leftArray[lsize] < rightArray[rsize]) {
            array[i] = leftArray[lsize];

            childArray[i].textContent = String(leftArray[lsize]);
            childArray[i].style.backgroundColor = mergeColor[colorChild];

            await sleep();
            lsize++;
        }
        else {
            array[i] = rightArray[rsize];

            childArray[i].textContent = String(rightArray[rsize]);
            childArray[i].style.backgroundColor = mergeColor[colorChild];
            await sleep();
            rsize++;

        }
    }
    headerText.textContent = "";
}

async function addElements(l, r) {
    console.log('add');
    const childArray = document.querySelectorAll('.child');

    const colorChild = Math.floor(Math.random() * 3);
    for (let i = l; i <= r; i++) {
        childArray[i].style.backgroundColor = color[colorChild];
    }
    await sleep();
}



// // selecting fields
// const inputField = document.querySelector('.input-field');
// const searchedNumber = document.querySelector('.search');
// const submit = document.querySelector('.submit');
// const containerSpace = document.querySelector('.container-space');
// let height = [];
// // let array;
// // submit button for sorting
// submit.addEventListener('click', checkInput);

// // checking input fields
// function checkInput(e) {
//     if (inputField.value == "") console.log('Enter the array');
//     showArray(e);
// }

// // computing styles 
// function showArray(e) {
//     e.preventDefault();

//     const inputValue = inputField.value;
//     const arr = inputValue.split(' ');
//      const array = arr.map((ele) => Number(ele));
//      console.log(array);
//     create(array);
//     const totalWidth = containerSpace.offsetWidth - array.length - 1;
//     const elementWidth = totalWidth / array.length;

//     //    searchElement(array,elementWidth);90 87 23 45 78 47 22
//     sortElement(array,elementWidth);
// }   

// function create(array) {
//     console.log('create called');
//     const totalWidth = containerSpace.offsetWidth - array.length - 1;
//     const totalHeight = containerSpace.offsetHeight;
//     const elementWidth = totalWidth / array.length;
//     const maxElement = Math.max(...array);

//     array.forEach((ele, index) => {
//         console.log(ele);
//         const child = document.createElement('div');
//         child.classList.add('child')
//         const elementHeight = totalHeight - (maxElement - ele) % 10 * 10;


//         child.style.width = elementWidth + 'px';
//         child.style.height = elementHeight + 'px';
//         height.push(elementHeight);
//         child.style.marginRight = '20px';
//         child.style.backgroundColor = "black";
//         child.textContent = String(ele);
//         containerSpace.append(child);
//          console.log('appende');
//     });


// }

// // sleep function to pause the execution of the code
// function sleep() {
//     return new Promise(resolve => setTimeout(resolve, 1500));
// }
// async function sortElement(array, elementWidth) {
//     const len = array.length;
//     const childArray = document.querySelectorAll('.child');
//     mergeSort(0,len-1,array);
// }
// // 90 87 23 45 78 47 22 34 66 88 77
