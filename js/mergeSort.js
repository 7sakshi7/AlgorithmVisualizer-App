// selecting fields
const header = document.querySelector('header')
const headerText = document.querySelector('header .headerText')
const inputField = document.querySelector('.input-field');
const searchedNumber = document.querySelector('.search');
const submit = document.querySelector('.submit');
const containerSpace = document.querySelector('.container-space');
const show = document.querySelector('.show-array');
let height=new Map();

// animation
const t1 = new TimelineMax();
const screenWidth = screen.width;
if (screenWidth > 681)
    t1.fromTo(show, 1, { height: "0vh", width: "0vw" }, { height: "66vh", width: "60vw", ease: Power2.easeInOut })
else
    t1.fromTo(show, 1, { height: "0vh", width: "0vw" }, { height: "66vh", width: "90vw", ease: Power2.easeInOut })
// color for separating elements
// const color = ["lightBlue", "yellow"];
const color = ["blue", "green", "lightBlue", "yellow"];
// color for merging elements
const mergeColor = ["violet", "greenyellow", "orange"];

// submit button for sorting
submit.addEventListener('click', checkInput);

// checking input fields
function checkInput(e) {
    if (inputField.value == "") {
        headerText.textContent = "Enter Array!!! This field can't be empty"
        setTimeout(() => {
            headerText.textContent = ""

        }, 1500);
        return;
    } 
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
           headerText.textContent = "Enter a valid Array"
           setTimeout(() => {
               headerText.textContent = "";
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
    const arrayCopy = [...array]
    arrayCopy.sort()
    const elementHeight = totalHeight - (array.length) * 20;

    array.forEach((ele, index) => {
       
        const child = document.createElement('div');
        child.classList.add('child')
        
        child.style.width = elementWidth + 'px';
        console.log(arrayCopy.indexOf(ele),ele);
        child.style.height = elementHeight + arrayCopy.indexOf(ele) * 10 + 'px';
        height.set(`${ele}`,elementHeight + arrayCopy.indexOf(ele) * 10 + 'px');
        child.style.marginRight = '20px';
        child.style.backgroundColor = "yellow";
        child.style.color = "black";
        child.textContent = String(ele);
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
            childArray[i].style.height = height.get(`${array[i]}`);
            childArray[i].style.backgroundColor = mergeColor[colorChild];

            await sleep();
            lsize++;
        }
        else {
            array[i] = rightArray[rsize];

            childArray[i].textContent = String(rightArray[rsize]);
            childArray[i].style.height = height.get(`${array[i]}`);
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

    const colorChild = Math.floor(Math.random()*3);
    for (let i = l; i <= r; i++) {
        childArray[i].style.backgroundColor = color[colorChild];
    }
    await sleep();
}

// clearing fields
function clearFields(){
    containerSpace.innerHTML="";
    inputField.value="";
}


// // 90 87 23 45 78 47 22 34 66 88 77
