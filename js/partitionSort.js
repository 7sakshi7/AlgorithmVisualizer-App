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
    return new Promise(resolve => setTimeout(resolve, 1500));
}

function sortElement(array, elementWidth) {
    const len = array.length;

    // Algorithm for sorting
    partitonSort(0, len - 1, array);
    // addElements(0,len-1);
}

async function partitonSort(l, r, array) {
    if (l >= r) return;

    let p = await partition(l, r, array);

    headerText.textContent = `Array is partitioned from index ${l + 1} 
    (${array[l]}) to ${p + 1} (${array[p]}) and  ${p + 2} (${array[p + 1]}) to ${r + 1} (${array[r]})`;
    await sleep();
    await sleep();

    headerText.textContent = `Applying Quick Sort from index ${l + 1} (${array[l]}) to ${p + 1} (${array[p]}) `;
    await sleep();
    await addElements(l, p);
    await partitonSort(l, p, array);

    headerText.textContent = `Applying Quick Sort from index ${p + 2} (${array[p + 1]}) to ${r + 1} (${array[r]}) `;
    await sleep();
    await addElements(p + 1, r);
    await partitonSort(p + 1, r, array);
}

async function partition(l, r, array) {
    const childArray = document.querySelectorAll('.child');
    let pivot = array[l];
    headerText.textContent = `Pivot element is ${array[l]}`;
    await sleep();

    const prevColor = childArray[l].style.backgroundColor;
    childArray[l].style.backgroundColor = "darkorange";
    await sleep();
    let low = l - 1, high = r + 1;
    while (true) {
        do {
            headerText.textContent = "Checking first greater element than pivot from left side..-----> ";
            low++;
            if (array[low] != pivot) {

                childArray[low].style.backgroundColor = "coral";
                headerText.textContent += `Checking whether ${array[low]} is greater than pivot ${pivot}?`;
                await sleep();
                if (array[low] < pivot)
                    childArray[low].style.backgroundColor = prevColor;
            }

        } while (array[low] < pivot);

        do {
            headerText.textContent = "Checking first smaller element than pivot from right side..-----> ";
            high--;
            if (array[high] != pivot) {
                childArray[high].style.backgroundColor = "deeppink";
                headerText.textContent += `Checking whether ${array[high]} is smaller than pivot ${pivot}?`;
                await sleep();
                if (array[high] > pivot)
                    childArray[high].style.backgroundColor = prevColor;
            }

        } while (array[high] > pivot);

        if (low >= high) {
            childArray[low].style.backgroundColor = prevColor;
            return high;
        }
        else {
            headerText.textContent = `Swapping ${array[low]} and ${array[high]}`;
            await sleep();

            //   exchanging height
            const hi = childArray[high].style.height;
            childArray[high].style.height = childArray[low].style.height;
            childArray[low].style.height = hi;

            const temp = array[high];
            // swapping childarray text
            childArray[high].textContent = array[low];
            childArray[low].textContent = array[high];


            //   swappping array elements
            array[high] = array[low];
            array[low] = temp;

            // console.log(array[low],array[high]);

            // changing color to back
            childArray[low].style.backgroundColor = prevColor;
            childArray[high].style.backgroundColor = prevColor;

            if(array[high]==pivot){
                childArray[high].style.backgroundColor = "darkorange";
            }
        }
    }

}
async function addElements(l, r) {
    console.log('add');
    const childArray = document.querySelectorAll('.child');

    const colorChild = Math.floor(Math.random() * 3);
    for (let i = l; i <= r; i++) {
        childArray[i].style.backgroundColor = color[colorChild];
    }
}

// 90 87 23 45 78 47 22 34 66 88 77