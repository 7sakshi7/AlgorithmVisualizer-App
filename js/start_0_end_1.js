const symbol = document.querySelector('.input-group')
const states = document.querySelectorAll('.circle');
const transition = document.querySelectorAll('.transition');
const self_loop = document.querySelectorAll('.self-loop');
const back_transition = document.querySelectorAll('.back-transition');
// console.log(transition);
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}
function wait() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}
let currState = 0;
async function showSimulation(symbols) {
    console.log(symbols);
    for (const [index, alphabet] of symbols.entries()) {
        document.querySelectorAll('.input-group span')[index].style.backgroundColor = "black";
        console.log(alphabet.textContent,typeof(alphabet.textContent),currState);
        if (alphabet.textContent === '0') {
            if (currState == 0) {
                transition[1].style.backgroundColor = "yellow";
                await wait();
                transition[1].style.backgroundColor = "black";

                states[0].style.backgroundColor = "white";
                states[1].style.backgroundColor = "yellow";

                currState = 1;
            }
            else if (currState == 1) {
                self_loop[0].style.borderColor = "yellow";
                states[1].style.backgroundColor = "white";
                await wait();
                self_loop[0].style.borderColor = "black";
                states[1].style.backgroundColor = "yellow";
            }
            else if (currState == 2) {
                currState = 1;
                states[2].style.backgroundColor = "white";
                back_transition[0].style.borderColor="yellow";
                await wait();
                back_transition[0].style.borderColor="black";
                states[1].style.backgroundColor = "yellow";
            }
            else{
                states[4].style.backgroundColor="white";
                self_loop[2].style.borderColor="yellow";
                await wait();
                states[4].style.backgroundColor="yellow";
                self_loop[2].style.borderColor="black";
            }
        }
        else {
            if (currState == 0) {
                currState = -1;
                states[0].style.backgroundColor="white";
                back_transition[1].style.borderColor="yellow";
                await wait();
                back_transition[1].style.borderColor="black";
               states[4].style.backgroundColor="yellow";
            }
            else if (currState == 1) {
                currState = 2;
                states[1].style.backgroundColor = "white";
                transition[2].style.backgroundColor = "yellow";
                await wait();
                transition[2].style.backgroundColor = "black";
                states[2].style.backgroundColor = "yellow";
            }
            else if (currState == 2) {
                currState = 2;
                states[2].style.backgroundColor = "white";
                self_loop[1].style.borderColor="yellow";
                await wait();
                self_loop[1].style.borderColor="black";
                states[2].style.backgroundColor = "yellow";
            }
            else{
                states[4].style.backgroundColor="white";
                self_loop[2].style.borderColor="yellow";
                await wait();
                states[4].style.backgroundColor="yellow";
                self_loop[2].style.borderColor="black";
            }
        }
        await sleep();
    }

    states[2].style.backgroundColor = "white";
    symbols.forEach((_, index) => {
        symbols[index].style.backgroundColor = "slateblue";
    });
    if (currState == 2) alert('String is accepted');
    else
        alert('String is rejected');
    
}

const btn = document.querySelector('.input-group button');
btn.addEventListener('click', async function () {
    const elements = document.querySelector('.input-field').value;
    const inputString = elements.split(' ');
    console.log(inputString);
    inputString.forEach((ele)=>{
        const span = document.createElement('span');
        span.textContent = ele;
        console.log(span);
        document.querySelector('.input-group').appendChild(span);
    });
    states[0].style.backgroundColor = "yellow";
    await sleep();
    const symbols = document.querySelectorAll('.input-group span');
    showSimulation(symbols);
});








