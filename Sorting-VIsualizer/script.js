let array = [];
let originalArray = [];
let sorting = false;
let paused = false;
let currentAlgorithm = "bubble";
let darkMode = false;

document.getElementById("algorithm").addEventListener("change", function () {
    currentAlgorithm = this.value;
});

function generateArray() {
    array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 250) + 50);
    originalArray = [...array];
    displayArray();
    sorting = false;
    paused = false;
}

function displayArray() {
    const container = document.getElementById("bars-container");
    container.innerHTML = "";
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        container.appendChild(bar);
    });
}

function resetSorting() {
    sorting = false;
    paused = false;
    array = [...originalArray];
    
    displayArray();
}

async function startSorting() {
    if (sorting) return;
    resetSorting();
    sorting = true;
    paused = false;

    if (currentAlgorithm === "bubble") await bubbleSort();
    else if (currentAlgorithm === "selection") await selectionSort();
    else if (currentAlgorithm === "insertion") await insertionSort();

    sorting = false;
}

function pauseSorting() {
    if (!sorting) return;
    paused = !paused;
}

async function waitWhilePaused() {
    while (paused) await new Promise(resolve => setTimeout(resolve, 100));
}

async function swapAndUpdate(i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    displayArray();
    await new Promise(resolve => setTimeout(resolve, 100));
}

// 🟢 Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            await waitWhilePaused();
            if (!sorting) return;
            if (array[j] > array[j + 1]) await swapAndUpdate(j, j + 1);
        }
    }
}

// 🟢 Selection Sort
async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            await waitWhilePaused();
            if (!sorting) return;
            if (array[j] < array[minIndex]) minIndex = j;
        }
        if (minIndex !== i) await swapAndUpdate(i, minIndex);
    }
}

// 🟢 Insertion Sort
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i], j = i - 1;
        while (j >= 0 && array[j] > key) {
            await waitWhilePaused();
            if (!sorting) return;
            array[j + 1] = array[j];
            displayArray();
            await new Promise(resolve => setTimeout(resolve, 100));
            j--;
        }
        array[j + 1] = key;
        displayArray();
    }
}

// 🟢 Dark Mode Toggle
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    document.getElementById("dark-mode-btn").textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
}

document.getElementById("start").addEventListener("click", startSorting);
document.getElementById("pause").addEventListener("click", pauseSorting);
document.getElementById("reset").addEventListener("click", resetSorting);
document.getElementById("generate").addEventListener("click", generateArray);

generateArray();
