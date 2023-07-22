const gridsContainer = document.querySelector('#grid-container');
const sizeButton = document.querySelector('#size-btn');
const enableButton = document.querySelector('#enable-btn');
const overlay = document.querySelector('#disabled-overlay');
const clearButton = document.querySelector('#clear-btn');
const rainbowButton = document.querySelector('#rainbow-btn');

let gridSize = 16;
let enabled = false;
let rainbow = false;
let cells = generateGrid(gridSize);

clearButton.addEventListener('click', function() {
    cells.forEach(function(cell) {
        cell.style.backgroundColor = 'transparent';
    })
})

gridsContainer.addEventListener('click', gridClickHandler, { once: true })

function gridClickHandler() {
    if (!enabled) {
        toggleDrawing();
        enableButton.classList.add('btn-enabled');
        overlay.classList.remove('overlay-on');
    }
}

rainbowButton.addEventListener('click', toggleRainbow);

function toggleRainbow() {
    if (enabled) {
        if (!rainbow) {
            cells.forEach(cell => cell.removeEventListener('mouseover', colorCell));
            cells.forEach(cell => cell.addEventListener('mouseover', colorRainbow));
            rainbowButton.classList.add('btn-enabled');
            rainbow = true;
        } else {
            cells.forEach(cell => cell.addEventListener('mouseover', colorCell));
            cells.forEach(cell => cell.removeEventListener('mouseover', colorRainbow));
            rainbowButton.classList.remove('btn-enabled');
            rainbow = false;
        }
    }
}

enableButton.addEventListener('click', toggleDrawing);

function toggleDrawing() {
    if (enabled) {
        cells.forEach(cell => cell.removeEventListener('mouseover', colorCell));
        cells.forEach(cell => cell.removeEventListener('mouseover', colorRainbow));
        enableButton.classList.remove('btn-enabled');
        rainbowButton.classList.remove('btn-enabled');
        enabled = false;
        rainbow = false;
    } else {
        cells.forEach(cell => cell.addEventListener('mouseover', colorCell));
        enableButton.classList.add('btn-enabled');
        overlay.classList.remove('overlay-on');
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
    document.querySelectorAll('.grid-row').forEach(row => row.remove());
    cells = generateGrid(gridSize);
    overlay.classList.add('overlay-on');
    enabled = true;
    rainbow = true;
    toggleDrawing();
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
    return document.querySelectorAll('.cell');
}

function colorCell() {
    this.style.backgroundColor = 'black';
}

function colorRainbow() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

document.addEventListener('keyup', function(e) {
    if (e.key == 'c') {
        clearButton.click();
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key == 'r') {
        rainbowButton.click();
    }
})

document.addEventListener('keyup', function(e) {
    if (e.key == 'e') {
        enableButton.click();
    }
})

