const container = document.querySelector('.container');
const source = document.querySelector('.source');
const dest = document.querySelector('.dest');
const blocked = document.querySelector('.blocked');
const submit = document.querySelector('.submit');
let blk = 0, src = -1, dst = -1, countSteps = 0;

let xcor = [0, 0, -1, 1];
let ycor = [-1, 1, 0, 0];

let arr = [];
for (let i = 0; i < 531; i++) {
    const cells = document.createElement('div');
    cells.classList.add('cell');
    cells.textContent="0";
    cells.style.backgroundColor="rgb(255, 255, 255)";
    container.appendChild(cells);
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
        e.target.textContent="1";
        console.log(e.target.style.backgroundColor, typeof e.target.style.backgroundColor);
        src = 1;
    }
    else if (dst >= 0 && !dst) {
        e.target.style.backgroundColor = "deeppink";
        e.target.textContent="2";
        dst = 1;
    }
}

// finding source and destination coords
 function findCoords() {
    const cells = document.querySelectorAll('.cell');
    let c = 0;
    let sx=-1,sy=-1,dx=-1,dy=-1;
    for (let i = 1; i <= 14; i++) {
        for (let j = 1; j <= 38; j++) { 
            // console.log(i,j);
            // console.log(cells[((i - 1) * 34) + j]);
            // console.log(c, i, j, (i * (j - 1)), (i + j), (i * j));
            if (getComputedStyle(cells[c]).backgroundColor == "rgb(255, 127, 80)") {
                sx = i, sy = j;
                // console.log(sx, sy, c);
            }
            else if (getComputedStyle(cells[c]).backgroundColor == "rgb(255, 20, 147)") {
                dx = i, dy = j;
                // console.log(dx, dy, c);
            }
            c++;
        }
    }
    if(sx==-1 || sy==-1 || dx==-1 || dy==-1){
        alert('Select Both Source And Destination');
        return;
    }
    // console.log(sx, sy, dx, dy);
    // console.log(cells[((sx - 1) * 38) + sy-1].textContent);
    // console.log(cells[((dx - 1) * 38) + dy-1].textContent);

     findPath(sx,sy,dx,dy);
    // console.log();
}
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 10));
}

// Algorithm
async function findPath(sx,sy,dx,dy) {
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

                if (xcord <= 0 || ycord <= 0 || xcord > 14 || ycord > 38 || (((xcord - 1) * 38) + ycord) >= 532
                || getComputedStyle(cells[((xcord - 1) * 38) + ycord]).backgroundColor != "rgb(255, 255, 255)"){
                    if(xcord==dx && ycord==dy){
                        (((xcord - 1) * 38) + ycord) == 532;
                    }
                    else
                    continue;

                }
                
                if (xcord == dx && ycord == dy) {
                    cells[((xcord - 1) * 38) + ycord-1].style.backgroundColor="#adff2f";
                    console.log('found');
                    return;
                }
                else {
                    cells[((xcord - 1) * 38) + ycord].textContent="1";
                    cells[((xcord - 1) * 38) + ycord].style.backgroundColor = "#d3d8f2";
                    arr.push([xcord, ycord]);
                }
            }
            await sleep();
        }
    }

}