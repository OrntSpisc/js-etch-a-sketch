const gridsContainer = document.querySelector('#grid-container');
const sizeButton = document.querySelector('#size-btn');

let gridSize = 16;

sizeButton.addEventListener('click', () => {
    gridSize = prompt('Type grid size (max 100)');
    while (gridsContainer.hasChildNodes()) {
        gridsContainer.removeChild(gridsContainer.firstChild);
    }
    generateGrid(gridSize);
})
function generateGrid(size) {
    if (size > 100) {
        return;
    }
    for (let i = 0; i < size; i++) {
        console.log(`Generate ${size}`);
        const row = document.createElement('div');
        row.classList.add('grid-row');
        gridsContainer.appendChild(row);
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('mouseover', colorCell);
            row.appendChild(cell);
        }
    }
}

const cells = document.querySelectorAll('.cell');

function colorCell() {
    this.style.backgroundColor = 'black';
}

generateGrid(gridSize);



cells.forEach(cell => cell.addEventListener('mouseover', color(cell)));