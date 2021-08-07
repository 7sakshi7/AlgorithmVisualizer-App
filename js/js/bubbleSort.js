
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
    return new Promise(resolve => setTimeout(resolve, 1500));
}
async function sortElement(array, elementWidth) {
    const len = array.length;
   

    // Algorithm for sorting
    for (let i = 0; i < len - 1; i++) {
        const childArray = document.querySelectorAll('.child');
        for (let j = 0; j < len - i - 1; j++) {

            // changing colors of blocks

            childArray[j].style.backgroundColor = "white";
            childArray[j].style.color = "black";
            childArray[j + 1].style.backgroundColor = "lightBlue";
            childArray[j + 1].style.color = "black";
            console.log(array[j], array[j + 1]);
            await sleep();
            
            if (array[j] > array[j + 1]) {

                // swapping
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                childArray[j + 1].style.backgroundColor = "black";
                childArray[j + 1].style.color = "white";
                childArray[j].style.backgroundColor = "black";
                childArray[j].style.color = "white";
                console.log(array);

                const tempStyle = getComputedStyle(childArray[j]).height;
                childArray[j].style.height = getComputedStyle(childArray[j + 1]).height;
                childArray[j].textContent = childArray[j + 1].textContent;
                childArray[j + 1].textContent = temp;
                childArray[j + 1].style.height = tempStyle;
                sleep();
            }
            else {

                childArray[j + 1].style.backgroundColor = "black";
                childArray[j + 1].style.color = "white";

                childArray[j].style.backgroundColor = "black";
                childArray[j].style.color = "white";
            }


        }
       
        sleep();
       

    }
}




// function removeAllChild() {
//     while (containerSpace.firstChild) {
//         containerSpace.removeChild(containerSpace.firstChild);
//     }
// }

//  create(elementWidth,j,array,"lightBlue",childArray[j]);
// function create(elementWidth,index,array,color,oldChild) {
    // const child = document.createElement('div');
    // child.classList.add('child')
    // child.style.width = elementWidth + 'px';
    // child.style.height = height[index] + 'px';
    // child.style.marginRight = '20px';
    // child.style.backgroundColor = color;
    // child.textContent = String(array[index]);
    // console.log(index,oldChild);
    // containerSpace.replaceChild(child,oldChild);
    // return child;
// }
// const child1 = childArray[i].cloneNode(true);
// const child2 = childArray[j].cloneNode(true);
// console.log(child1,child2);
// console.log('i');
// create(elementWidth,i,array,"black",child2);
// console.log('j');
// create(elementWidth,j,array,"black",child1);
// const text =child1.textContent;

// childArray[i].style.height=height[j]+'px';
// childArray[i].style.backgroundColor="black";
// childArray[i].textContent = child2.textContent;

// childArray[j].style.height=height[i]+'px';
// childArray[j].style.backgroundColor="black";
// childArray[j].textContent = text;
// console.log(child1,child1.parentElement);

// containerSpace.insertBefore(child2,child1);
//    console.log(child1,child2); 
//    const temp = childArray[i].cloneNode(true);
// //    console.log(temp);
//    containerSpace.replaceChild(childArray[i],childArray[j]);
//    containerSpace.replaceChild(temp,child2);
// console.log(tempStyle);
                // console.log(tempNode);
                // childArray[j].parentNode.replaceChild(childArray[j+1], childArray[j]);
                // childArray[j+1].parentNode.replaceChild(tempNode, childArray[j+1]);

                // childArray[j+1].parentNode.replaceChild(childArray[j], tempNode);
                // await sleep();