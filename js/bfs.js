const container = document.querySelector('.container');
const source = document.querySelector('.source');
const dest = document.querySelector('.dest');
const blocked = document.querySelector('.blocked');
const submit = document.querySelector('.submit');
let blk = 0, src = -1, dst = -1, countSteps = 0;

let xcor = [0, 0, -1, 1];
let ycor = [-1, 1, 0, 0];

let arr = [];
let lenWidth = screen.width;
let totalColEle = Math.floor(lenWidth / 40);
let lenHeight = Math.floor(screen.height / 2 + screen.height / 5);
let totalRowEle = Math.floor(lenHeight / 40);

console.log(totalColEle, totalRowEle, totalColEle + totalRowEle);
// console.log(lenHeight);
for (let i = 0; i < totalRowEle; i++) {
    for (let j = 0; j < totalColEle; j++) {

        const cells = document.createElement('div');
        cells.classList.add('cell');
        cells.textContent = "0";
        cells.style.backgroundColor = "rgb(255, 255, 255)";
        container.appendChild(cells);
    }
}

source.addEventListener('click', () => {
    container.removeEventListener('mouseover', color)
    if (src == -1)
        src = 0;
    else
        alert('Source already choosen');
    blk = 0;
});
dest.addEventListener('click', () => {
    container.removeEventListener('mouseover', color)
    if (dst == -1)
        dst = 0;
    else
        alert('Source already choosen');
    blk = 0;
});
blocked.addEventListener('click', () => {
    container.addEventListener('mouseover', color);
    blk = 1
});
submit.addEventListener('click', findCoords)

container.addEventListener('click', color);

function color(e) {
    if (!e.target.classList.contains('cell')) return;

    if (blk)
        e.target.style.backgroundColor = "rgb(0, 0, 0)";
    else if (src >= 0 && !src) {
        e.target.style.backgroundColor = "coral";
        e.target.textContent = "1";
        console.log(e.target.style.backgroundColor, typeof e.target.style.backgroundColor);
        src = 1;
    }
    else if (dst >= 0 && !dst) {
        e.target.style.backgroundColor = "deeppink";
        e.target.textContent = "2";
        dst = 1;
    }
}

// finding source and destination coords
function findCoords() {
    const cells = document.querySelectorAll('.cell');
    let c = 0;
    let sx = -1, sy = -1, dx = -1, dy = -1;
    for (let i = 0; i < totalRowEle; i++) {
        for (let j = 0; j < totalColEle; j++) {
            // console.log(i,j);
            // console.log(cells[((i - 1) * 34) + j]);
            // console.log(c, i, j, (i * (j - 1)), (i + j), (i * j));
            if (getComputedStyle(cells[(i * totalColEle) + j]).backgroundColor == "rgb(255, 127, 80)") {
                sx = i, sy = j;
                // console.log(sx, sy, c);
            }
            else if (getComputedStyle(cells[(i * totalColEle) + j]).backgroundColor == "rgb(255, 20, 147)") {
                dx = i, dy = j;
                // console.log(dx, dy, c);
            }
            c++;
        }
    }
    if (sx == -1 || sy == -1 || dx == -1 || dy == -1) {
        alert('Select Both Source And Destination');
        return;
    }
    console.log(sx, sy, dx, dy);
    // console.log(cells[((sx - 1) * 38) + sy-1].textContent);
    // console.log(cells[((dx - 1) * 38) + dy-1].textContent);

    findPath(sx, sy, dx, dy);
    // console.log();
}
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 10));
}

// Algorithm
async function findPath(sx, sy, dx, dy) {
    arr.push([sx, sy])
    let found = 0;
    while (Array.isArray(arr) && arr.length) {
        let sz = arr.length;
        while (sz--) {
            let coords = arr.shift();
            for (let i = 0; i < 4; i++) {
                const cells = document.querySelectorAll('.cell');
                let xcord = xcor[i] + coords[0];
                let ycord = ycor[i] + coords[1];
                console.log(xcord, ycord);

                if (xcord == dx && ycord == dy) {
                    cells[((xcord) * totalColEle) + ycord].style.backgroundColor = "#adff2f";
                    console.log('found');
                    return;
                }

                if (xcord < 0 || ycord < 0 || xcord >= totalRowEle || ycord >= totalColEle
                    || (((xcord) * totalColEle) + ycord) >= totalColEle * totalRowEle
                    || getComputedStyle(cells[((xcord) * totalColEle) + ycord]).backgroundColor != "rgb(255, 255, 255)") continue;

                console.log('passed');


                cells[((xcord) * totalColEle) + ycord].textContent = "1";
                cells[((xcord) * totalColEle) + ycord].style.backgroundColor = "#d3d8f2";
                arr.push([xcord, ycord]);
                console.log('pushed');

            }
            await sleep();
        }
    }

}
