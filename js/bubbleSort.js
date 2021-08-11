
// selecting fields
const header = document.querySelector('header')
const headerText = document.querySelector('header .headerText')
const inputField = document.querySelector('.input-field');
const searchedNumber = document.querySelector('.search');
const submit = document.querySelector('.submit');
const containerSpace = document.querySelector('.container-space');
const show = document.querySelector('.show-array');

// animation
const t1 = new TimelineMax();
const screenWidth = screen.width;
if (screenWidth > 681)
    t1.fromTo(show, 1, { height: "100vh", width: "100vw" }, { height: "66vh", width: "60vw", ease: Power2.easeInOut })
else
    t1.fromTo(show, 1, { height: "0vh", width: "0vw" }, { height: "66vh", width: "90vw", ease: Power2.easeInOut })

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
        child.style.marginRight = '20px';
        child.style.backgroundColor = "yellow";
        child.style.color = "black";
        child.textContent = String(ele);
        // height.push(elementHeight);
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

            childArray[j].style.backgroundColor = "greenyellow";
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

                childArray[j + 1].style.backgroundColor = "orange";
                childArray[j + 1].style.color = "white";
                childArray[j].style.backgroundColor = "orange";
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

                childArray[j + 1].style.backgroundColor = "orange";
                childArray[j + 1].style.color = "white";

                childArray[j].style.backgroundColor = "orange";
                childArray[j].style.color = "white";
            }


        }
       
        sleep();
       

    }
}
// clearing fields
function clearFields(){
    containerSpace.innerHTML="";
    inputField.value="";
}
