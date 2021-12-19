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
    // console.log(len);

    // Algorithm for sorting
    for (let i = 0; i < len - 1; i++) {
        let min = i;
        
        const childArray = document.querySelectorAll('.child');
        childArray[i].style.backgroundColor = "greenyellow";
        childArray[i].style.color = "black";
       
        for (let j = i + 1; j < len; j++) {

            // changing colors of blocks

            childArray[j].style.backgroundColor = "lightBlue";
            childArray[j].style.color = "black";
            // console.log(array[j], array[j + 1]);
            await sleep();

            if (array[min] > array[j]) {
                
                childArray[min].style.backgroundColor = "yellow";
                childArray[min].style.color = "black";
                childArray[j].style.backgroundColor = "orange";
                childArray[j].style.color = "white";
                min = j;
                await sleep();
            }
            else {

                childArray[i].style.backgroundColor = "yellow";
                childArray[i].style.color = "black";

                childArray[j].style.backgroundColor = "yellow";
                childArray[j].style.color = "black";
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

            childArray[i].style.backgroundColor="yellow";
            childArray[min].style.backgroundColor="yellow";
            childArray[i].style.color="black";
            childArray[min].style.color="black";
            await sleep();
        }


    }
}
// clearing fields
function clearFields(){
    containerSpace.innerHTML="";
    inputField.value="";
}