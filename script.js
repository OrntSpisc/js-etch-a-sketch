const gridsContainer = document.querySelector('#grid-container');
const sizeButton = document.querySelector('#size-btn');
const toggleButton = document.querySelector('.toggle-btn');
let gridSize = 16;
let enabled = false;
generateGrid(gridSize);
const cells = document.querySelectorAll('.cell');

gridsContainer.addEventListener('click', function() {
    if (!enabled) {
        toggleDrawing();
        toggleButton.classList.add('btn-enabled')
    }
}, { once: true })

toggleButton.addEventListener('click', function() {
    toggleDrawing();
})

function toggleDrawing() {
    if (enabled) {
        cells.forEach(cell => cell.removeEventListener('mouseover', colorCell));
        toggleButton.classList.remove('btn-enabled');
        enabled = false
    } else {
        cells.forEach(cell => cell.addEventListener('mouseover', colorCell));
        toggleButton.classList.add('btn-enabled');
        enabled = true
    }
}

sizeButton.addEventListener('click', () => {
    gridSize = prompt('Type grid size (max 100)');
    if (gridSize > 100 || gridSize === null || gridSize === '') {
        if (gridSize > 100) {
            alert("More than 100 squares will explode your pc!")
        }
        return;
    }
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
            row.appendChild(cell);
        }
    }

}




function colorCell() {
    this.style.backgroundColor = 'black';
}

