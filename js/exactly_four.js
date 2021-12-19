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
    return new Promise(resolve => setTimeout(resolve, 2000));
}
let currState = 0;
async function showSimulation(symbols) {
    // console.log(symbols);
    for (const [index, alphabet] of symbols.entries()) {
        document.querySelectorAll('.input-group span')[index].style.backgroundColor = "black";
        // console.log(alphabet.textContent,typeof(alphabet.textContent),currState);
        if (alphabet.textContent === '0') {
            if (currState == 0) {
                self_loop[0].style.borderColor = "yellow";
                states[0].style.backgroundColor = "white";
                await wait();
               
                self_loop[0].style.borderColor = "black";
                states[0].style.backgroundColor = "yellow";
            }
            else if (currState == 1) {
                self_loop[1].style.borderColor = "yellow";
                states[1].style.backgroundColor = "white";
                await wait();
               
                self_loop[1].style.borderColor = "black";
                states[1].style.backgroundColor = "yellow";
            }
            else if (currState == 2) {
                self_loop[2].style.borderColor = "yellow";
                states[2].style.backgroundColor = "white";
                await wait();
               
                self_loop[2].style.borderColor = "black";
                states[2].style.backgroundColor = "yellow";
            }
            else if (currState == 3) {
                self_loop[3].style.borderColor = "yellow";
                states[3].style.backgroundColor = "white";
                await wait();
               
                self_loop[3].style.borderColor = "black";
                states[3].style.backgroundColor = "yellow";
            }
            else if (currState == 4) {
                self_loop[4].style.borderColor = "yellow";
                states[4].style.backgroundColor = "white";
                await wait();
               
                self_loop[4].style.borderColor = "black";
                states[4].style.backgroundColor = "yellow";
            }
            else{
                self_loop[5].style.borderColor = "yellow";
                states[6].style.backgroundColor = "white";
                await wait();
               
                self_loop[5].style.borderColor = "black";
                states[6].style.backgroundColor = "yellow";
            }
        }
        else {
            if (currState == 0) {
                currState = 1;
                states[0].style.backgroundColor="white";
                transition[1].style.backgroundColor="yellow";
                console.log(transition[1]);
                await wait();
                transition[1].style.backgroundColor="black";
               states[1].style.backgroundColor="yellow";
            }
            else if (currState == 1) {
                currState = 2;
                states[1].style.backgroundColor="white";
                transition[2].style.backgroundColor="yellow";
                console.log(transition[2]);
                await wait();
                transition[2].style.backgroundColor="black";
               states[2].style.backgroundColor="yellow";
            }
            else if (currState == 2) {
                currState = 3;
                states[2].style.backgroundColor="white";
                transition[3].style.backgroundColor="yellow";
                console.log(transition[3]);
                await wait();
                transition[3].style.backgroundColor="black";
               states[3].style.backgroundColor="yellow";
            }
            else if (currState == 3) {
                currState = 4;
                states[3].style.backgroundColor="white";
                transition[4].style.backgroundColor="yellow";
                console.log(transition[4]);
                await wait();
                transition[4].style.backgroundColor="black";
               states[4].style.backgroundColor="yellow";
            }
            else if (currState == 4) {
                currState = -1;
                states[4].style.backgroundColor="white";
                console.log(transition[5]);                                                                                                  
                transition[5].style.backgroundColor="yellow";
                await wait();
                transition[5].style.backgroundColor="black";
               states[6].style.backgroundColor="yellow";
            }
            else{
                self_loop[6].style.borderColor = "yellow";
                states[6].style.backgroundColor = "white";
                await wait();
               
                self_loop[6].style.backgroundColor = "black";
                states[6].style.borderColor = "yellow";
            }
        }
        await sleep();
    }

    states[4].style.backgroundColor = "white";
    symbols.forEach((_, index) => {
        symbols[index].style.backgroundColor = "slateblue";
    });
    if (currState == 4) alert('String is accepted');
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








