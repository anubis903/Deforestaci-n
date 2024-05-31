const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');
const reforestButton = document.getElementById('reforestButton');

let trees = [];
let isReforesting = false;
const treeWidth = 10;
const treeHeight = 30;
const crownRadius = 20;
const maxTrees = 30; 

function initTrees() {
    for (let i = 0; i < maxTrees; i++) {
        let x = Math.random() * (canvas.width - crownRadius * 2) + crownRadius;
        let y = Math.random() * (canvas.height - treeHeight - crownRadius) + crownRadius;
        trees.push({ x, y });
    }
}

function drawTrees() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trees.forEach(tree => {
        drawTree(tree.x, tree.y);
    });
}

function drawTree(x, y) {
    ctx.beginPath();
    ctx.rect(x - treeWidth / 2, y, treeWidth, treeHeight);
    ctx.fillStyle = 'brown';
    ctx.fill();
    ctx.closePath();

    
    ctx.beginPath();
    ctx.arc(x, y, crownRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

function checkTreeClick(x, y) {
    for (let i = 0; i < trees.length; i++) {
        let tree = trees[i];
        if (x > tree.x - crownRadius && x < tree.x + crownRadius &&
            y > tree.y - crownRadius && y < tree.y + treeHeight + crownRadius) {
            trees.splice(i, 1);
            drawTrees();
            if (trees.length === 0) {
                message.innerText = "Haga click para reforestar";
                reforestButton.style.display = 'block';
            }
            return;
        }
    }
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (!isReforesting) {
        checkTreeClick(x, y);
    } else {
        trees.push({ x: x, y: y - treeHeight });
        drawTrees();
        if (trees.length === maxTrees) {
            message.innerText = "Estás siendo parte del cambio para cuidar nuestro planeta";
            reforestButton.style.display = 'none';
            isReforesting = false;
        }
    }
});

function startReforesting() {
    isReforesting = true;
    message.innerText = "Haz clic para en cualquier parte del cuadrado para reforestar.";
    reforestButton.style.display = 'none';
}


initTrees();
drawTrees();
