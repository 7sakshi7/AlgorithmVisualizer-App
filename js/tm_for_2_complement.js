const symbol = document.querySelector('.input-group')
const states = document.querySelectorAll('.circle');
const transition = document.querySelectorAll('.transition');
const self_loop = document.querySelectorAll('.self-loop');
const back_transition = document.querySelectorAll('.back-transition');

function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}
function wait() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}
let currState = 0;
// 0 for right and 1 for left
let direction = 0;
async function showSimulation(symbols) {
    console.log(symbols);
    for (const [index, alphabet] of symbols.entries()) {
        if (direction) {
            document.querySelectorAll('.input-group span')[index].style.backgroundColor = "orange";
        }
        else
            document.querySelectorAll('.input-group span')[index].style.backgroundColor = "black";
        console.log(alphabet.textContent, typeof (alphabet.textContent), currState);
        if (alphabet.textContent === '0') {
            if (currState == 1) {
                transition[2].style.backgroundColor = "yellow";
                states[1].style.backgroundColor = "white";
                await wait();
                transition[2].style.backgroundColor = "black";
                states[2].style.backgroundColor = "yellow";

                currState = 2;
            }
            else if (currState == 2) {
                self_loop[0].style.borderColor = "yellow";
                states[2].style.backgroundColor = "white";
                await wait();
                self_loop[0].style.borderColor = "black";
                states[2].style.backgroundColor = "yellow";
            }
            else if (currState == 3) {
                self_loop[1].style.borderColor = "yellow";
                states[2].style.backgroundColor = "white";
                await wait();
                self_loop[1].style.borderColor = "black";
                states[3].style.backgroundColor = "yellow";
            }
            else if (currState == 4) {
                self_loop[2].style.borderColor = "yellow";
                states[4].style.backgroundColor = "white";
                await wait();
                self_loop[2].style.borderColor = "black";
                states[4].style.backgroundColor = "yellow";

                document.querySelectorAll('.input-group span')[index].textContent = "1";
                await wait();
            }
        }
        else if (alphabet.textContent == '#') {
            if (currState == 0) {
                transition[1].style.backgroundColor = "yellow";
                console.log(transition[1].style.borderColor);
                states[0].style.backgroundColor = "white";
                await wait();
                transition[1].style.backgroundColor = "black";
                states[1].style.backgroundColor = "yellow";

                currState = 1;
            }
            else if (currState == 2) {
                transition[3].style.backgroundColor = "yellow";
                states[2].style.backgroundColor = "white";
                await wait();
                transition[3].style.backgroundColor = "black";
                states[3].style.backgroundColor = "yellow";

                currState = 3;
                direction = 1;
            }
            else if (currState == 4) {
                transition[5].style.backgroundColor = "yellow";
                states[4].style.backgroundColor = "white";
                await wait();
                transition[5].style.backgroundColor = "black";
                states[5].style.backgroundColor = "yellow";

                currState = 5;
            }
        }
        else {
            if (currState == 1) {
                transition[2].style.backgroundColor = "yellow";
                states[1].style.backgroundColor = "white";
                await wait();
                transition[2].style.backgroundColor = "black";
                states[2].style.backgroundColor = "yellow";

                currState = 2;
            }
            else if (currState == 2) {
                self_loop[0].style.borderColor = "yellow";
                states[2].style.backgroundColor = "white";
                await wait();
                self_loop[0].style.borderColor = "black";
                states[2].style.backgroundColor = "yellow";
            }
            else if (currState == 3) {
                transition[4].style.backgroundColor = "yellow";
                states[3].style.backgroundColor = "white";
                await wait();
                transition[4].style.backgroundColor = "black";
                states[4].style.backgroundColor = "yellow";

                currState = 4;
            }
            else if (currState == 4) {
                self_loop[2].style.borderColor = "yellow";
                states[4].style.backgroundColor = "white";
                await wait();
                self_loop[2].style.borderColor = "black";
                states[4].style.backgroundColor = "yellow";

                document.querySelectorAll('.input-group span')[index].textContent = "0";
                await wait();
            }
        }
        await sleep();
    }
    let index = symbols.length;
    while (index--) {
        if(index == symbols.length-1)continue;
        if (direction) {
            document.querySelectorAll('.input-group span')[index].style.backgroundColor = "orange";
            await wait();
        }
        else
            document.querySelectorAll('.input-group span')[index].style.backgroundColor = "black";
        if (symbols[index].textContent === '0') {
            if (currState == 1) {
                transition[2].style.backgroundColor = "yellow";
                states[1].style.backgroundColor = "white";
                await wait();
                transition[2].style.backgroundColor = "black";
                states[2].style.backgroundColor = "yellow";

                currState = 2;
            }
            else if (currState == 2) {
                self_loop[0].style.borderColor = "yellow";
                states[2].style.backgroundColor = "white";
                await wait();
                self_loop[0].style.borderColor = "black";
                states[2].style.backgroundColor = "yellow";
            }
            else if (currState == 3) {
                self_loop[1].style.borderColor = "yellow";
                states[2].style.backgroundColor = "white";
                await wait();
                self_loop[1].style.borderColor = "black";
                states[3].style.backgroundColor = "yellow";
            }
            else if (currState == 4) {
                self_loop[2].style.borderColor = "yellow";
                states[4].style.backgroundColor = "white";
                await wait();
                self_loop[2].style.borderColor = "black";
                states[4].style.backgroundColor = "yellow";

                document.querySelectorAll('.input-group span')[index].textContent = "1";
                await wait();
            }
        }
        else if (symbols[index].textContent === '#') {
            if (currState == 0) {
                transition[1].style.backgroundColor = "yellow";
                states[0].style.backgroundColor = "white";
                await wait();
                transition[1].style.backgroundColor = "black";
                states[1].style.backgroundColor = "yellow";

                currState = 1;
            }
            else if (currState == 2) {
                transition[3].style.backgroundColor = "yellow";
                states[2].style.backgroundColor = "white";
                await wait();
                transition[3].style.backgroundColor = "black";
                states[3].style.backgroundColor = "yellow";

                currState = 3;
                direction = 1;
            }
            else if (currState == 4) {
                transition[5].style.backgroundColor = "yellow";
                states[4].style.backgroundColor = "white";
                await wait();
                transition[5].style.backgroundColor = "black";
                states[5].style.backgroundColor = "yellow";

                currState = 5;
            }
        }
        else {
            if (currState == 1) {
                transition[2].style.backgroundColor = "yellow";
                states[1].style.backgroundColor = "white";
                await wait();
                transition[2].style.backgroundColor = "black";
                states[2].style.backgroundColor = "yellow";

                currState = 2;
            }
            else if (currState == 2) {
                self_loop[0].style.borderColor = "yellow";
                states[2].style.backgroundColor = "white";
                await wait();
                self_loop[0].style.borderColor = "black";
                states[2].style.backgroundColor = "yellow";
            }
            else if (currState == 3) {
                transition[4].style.backgroundColor = "yellow";
                states[3].style.backgroundColor = "white";
                await wait();
                transition[4].style.backgroundColor = "black";
                states[4].style.backgroundColor = "yellow";

                currState = 4;
            }
            else if (currState == 4) {
                self_loop[2].style.borderColor = "yellow";
                states[4].style.backgroundColor = "white";
                await wait();
                self_loop[2].style.borderColor = "black";
                states[4].style.backgroundColor = "yellow";

                document.querySelectorAll('.input-group span')[index].textContent = "0";
                await wait();
            }
        }
        await sleep();
    }
}

const btn = document.querySelector('.input-group button');
btn.addEventListener('click', async function () {
    const elements = document.querySelector('.input-field').value;
    const inputString = elements.split(' ');
    console.log(inputString);

    // adding blank at the begining
    const spanBeg = document.createElement('span');
    spanBeg.textContent = '#';
    document.querySelector('.input-group').appendChild(spanBeg);

    // input string
    inputString.forEach((ele) => {
        const span = document.createElement('span');
        span.textContent = ele;
        console.log(span);
        document.querySelector('.input-group').appendChild(span);
    });

    // adding blank at the end
    const spanEnd = document.createElement('span');
    spanEnd.textContent = '#';
    console.log(spanEnd);
    document.querySelector('.input-group').appendChild(spanEnd);

    states[0].style.backgroundColor = "yellow";
    await sleep();
    const symbols = document.querySelectorAll('.input-group span');
    showSimulation(symbols);
});








