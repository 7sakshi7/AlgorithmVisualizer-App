const inputField = document.querySelector('.input-field');
const containerSpace = document.querySelector('.container-space');
const inputValue = inputField.value;
const arr = inputValue.split(' ');
const array = arr.map((ele) => Number(ele));
let elementWidth;

function create() {
    const totalWidth = containerSpace.offsetWidth - array.length - 1;
    elementWidth = totalWidth / array.length;
    const totalHeight = containerSpace.offsetHeight;
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
        containerSpace.append(child);
    });
}

// sleep function to pause the execution of the code
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

export {array,create,sleep,elementWidth};

