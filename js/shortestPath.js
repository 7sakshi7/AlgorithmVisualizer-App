const container = document.querySelector('.container');
const source = document.querySelector('.source');
const dest = document.querySelector('.dest');
const blocked = document.querySelector('.blocked');
const submit = document.querySelector('.submit');
let blk = 0, src = -1, dst = -1, countSteps = 0;


// ******************PRIORITY QUEUE*********************
class PriorityQueue {
    constructor() {
        this.Array = []
    }
    enqueue(element) {
        // console.log(element);
        this.Array.push([element[0], element[1], element[2]])
        this.Array.sort()
    }
    dequeue() {
        return this.Array.shift()
    }
}
let xcor = [0, 0, -1, 1];
let ycor = [-1, 1, 0, 0];

let arr = [];
let sx=-1, sy=-1, dx=-1, dy=-1;
for (let i = 0; i < 407; i++) {
    const cells = document.createElement('div');
    cells.classList.add('cell');
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
        console.log(e.target.style.backgroundColor, typeof e.target.style.backgroundColor);
        src = 1;
    }
    else if (dst >= 0 && !dst) {
        e.target.style.backgroundColor = "deeppink";
        dst = 1;
    }
}
// finding source and destination coords
async function findCoords() {
    const cells = document.querySelectorAll('.cell');
    let c = 0;
    for (let i = 1; i <= 12; i++) {
        for (let j = 1; j <= 34; j++) {

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
    console.log(sx, sy, dx, dy);

     await findPath();
    drawPath(sx, sy, countSteps, dx, dy);
}
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 50));
}

// Algorithm
async function findPath() {
    // console.log(sx, sy, dx, dy);
    arr.push([sx, sy])
    let found = 0;
    while (Array.isArray(arr) && arr.length) {
        let sz = arr.length;
        countSteps++;
        while (sz--) {
            let coords = arr.shift();
            for (let i = 0; i < 4; i++) {
                const cells = document.querySelectorAll('.cell');
                let xcord = xcor[i] + coords[0];
                let ycord = ycor[i] + coords[1];

                if (xcord < 1 || ycord < 1 || xcord > 12 || ycord > 34 || (((xcord - 1) * 34) + ycord) >= 408
                    || getComputedStyle(cells[((xcord - 1) * 34) + ycord]).backgroundColor != "rgb(255, 255, 255)")
                        continue;
                    

                if (xcord == dx && ycord == dy) {
                    console.log('found', countSteps - 1);
                    found=1;
                    return;
                }
                else {
                    cells[((xcord - 1) * 34) + ycord].style.backgroundColor = "blue";
                    arr.push([xcord, ycord]);
                }
            }
            await sleep();
        }
    }
    if(!found){
        alert('No Path Found :( All Paths Are Blocked')
        // drawPath(sx, sy, countSteps, dx, dy);
    }
    // else{
    // }

}
neighbours = new Array(407)
function heuristic(x, y, dx, dy) {
    return Math.abs(x - dx) + Math.abs(y - dy)
}

function updateNeighbours(x, y) {
    neighbours[(x - 1) * 34 + y] = new Array()
    if (x - 1 >= 1 && y >= 1 && x - 1 <= 12 && y <= 34) {
        const cells = document.querySelectorAll('.cell');
        const color = getComputedStyle(cells[((x - 2) * 34) + y]).backgroundColor;
        if (color != "rgb(0, 0, 0)") {
            neighbours[(x - 1) * 34 + y].push([x - 1, y])

        }
    }
    if (x + 1 >= 1 && y >= 1 && x + 1 <= 12 && y <= 34) {
        const cells = document.querySelectorAll('.cell');
        const color = getComputedStyle(cells[((x) * 34) + y]).backgroundColor;
        if (color != "rgb(0, 0, 0)") {
            neighbours[(x - 1) * 34 + y].push([x + 1, y])

        }
    }
    if (x >= 1 && y - 1 >= 1 && x <= 12 && y - 1 <= 34) {
        const cells = document.querySelectorAll('.cell');
        const color = getComputedStyle(cells[((x - 1) * 34) + y - 1]).backgroundColor;
        if (color != "rgb(0, 0, 0)") {
            neighbours[(x - 1) * 34 + y].push([x, y - 1])

        }
    }
    if (x >= 1 && y + 1 >= 1 && x <= 12 && y + 1 < 33) {
        const cells = document.querySelectorAll('.cell');
        const color = getComputedStyle(cells[((x - 1) * 34) + y + 1]).backgroundColor;
        if (color != "rgb(0, 0, 0)") {
            neighbours[(x - 1) * 34 + y].push([x, y + 1])
        }
    }
}

function reConstructPath(came_from, dx, dy, x, y) {

    a = dx, b = dy
    const cells = document.querySelectorAll('.cell');
    cells[((dx - 1) * 34) + dy-1].style.backgroundColor = "rgb(255, 255, 16)";
    // console.log(came_from.get([5, 6]));
    while (came_from.get(`[${a},${b}]`) !=undefined && came_from.get(`[${a},${b}]`) != [x, y] ) {
        // console.log(came_from.get(`[${a},${b}]`));
        temp = came_from.get(`[${a},${b}]`);
        // console.log(temp);
        a = temp[0]
        b = temp[1]
        cells[((a - 1) * 34) + b].style.backgroundColor = "rgb(255, 255, 16)";
    }
    // cells[((a - 1) * 34) + b-1].style.backgroundColor = "rgb(255, 255, 16)";
}
function drawPath(x, y, count, dx, dy) {
    updateNeighbours(x, y);
    countCost = 0;  
    p = new PriorityQueue();
    p.enqueue([0, countCost, [x, y]]);

    openSet = new Set();
    openSet.add([x, y])
    came_from = new Map();
    cost_till_this_node = new Array(12);

    for (let i = 0; i < 12; i++) {
        cost_till_this_node[i] = new Array(34);
        for (let j = 0; j < 34; j++) {
            cost_till_this_node[i][j] = Number.POSITIVE_INFINITY;
        }
    }
    cost_till_this_node[x - 1][y - 1] = 0;

    total_cost = new Array(12);

    for (let i = 0; i < 12; i++) {
        total_cost[i] = new Array(34);
        for (let j = 0; j < 34; j++) {
            total_cost[i][j] = Number.POSITIVE_INFINITY;
        }
    }
    total_cost[x - 1][y - 1] = heuristic(x, y, dx, dy);

    while (Array.isArray(p.Array) && p.Array.length) {
        currentValue = p.dequeue()
        // console.log(currentValue);
        current = currentValue[2]
        openSet.delete([current[0], current[1]])
        updateNeighbours(current[0], current[1]);

        if (current[0] == dx && current[1] == dy) {
            console.log('reached');
            break;
        }
        neighbour = neighbours[(current[0] - 1) * 34 + current[1]]
        console.log(neighbour);
        // for(const nodes in neighbour){
        for (let i = 0; i < neighbour.length; i++) {
            const nodes = neighbour[i]
            // console.log(nodes);
            // updateNeighbours(nodes[0],nodes[1])
            tempCost = cost_till_this_node[current[0] - 1][current[1] - 1] + 1

            if (tempCost < cost_till_this_node[nodes[0] - 1][nodes[1] - 1]) {
                cost_till_this_node[nodes[0] - 1][nodes[1] - 1] = tempCost;
                came_from.set(`[${nodes[0]},${nodes[1]}]`, [current[0], current[1]]);
                total_cost[nodes[0] - 1][nodes[1] - 1] = tempCost + heuristic(nodes[0], nodes[1], dx, dy);

                if (!openSet.has([nodes[0], nodes[1]])) {
                    countCost++;
                    p.enqueue([total_cost[nodes[0] - 1][nodes[1] - 1], countCost, [nodes[0], nodes[1]]])
                    openSet.add([nodes[0], nodes[1]])
                }
            }


        }
        console.log(came_from);


    }
    reConstructPath(came_from, dx, dy, x, y)


}
