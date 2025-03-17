import { SortingAlgorithms } from "./sortingAlgorithms.js";

// Number of bars
let nBars = 10;

// DOM Elements
const numbersBars = document.getElementById('numbersBars');
const stage = document.getElementById('stage');
const selectAlgorithm = document.getElementById('selectAlgorithm');
const generateBtn = document.getElementById('generateBtn');
const solveBtn = document.getElementById('solveBtn');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

let bars = [];
let barsDivs = [];
const sortingAlgorithms = new SortingAlgorithms();

// ✅ Delay function to control animation speed
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* ✅ Initializes the sorting visualization with random bars */
const start = () => {
    stage.innerHTML = ''; // Clear existing bars

    // Generate random bars with heights between 1 and 30
    bars = Array.from({ length: nBars }, (_, i) => ({
        height: Math.floor(Math.random() * 30) + 1, 
        index: i
    }));

    // Create div elements for each bar
    barsDivs = bars.map((bar) => {
        const barDiv = document.createElement('div');
        barDiv.style.height = `${bar.height * 10}px`; // Scale height
        barDiv.style.width = "30px";
        barDiv.classList.add('bar');

        // ✅ Number label inside the bar
        const numberLabel = document.createElement("span");
        numberLabel.classList.add("bar-label");
        numberLabel.innerText = bar.height;
        barDiv.appendChild(numberLabel);

        stage.appendChild(barDiv);
        return barDiv;
    });
};

start();

/* ✅ Swaps two bars visually */
async function swapBars(index1, index2) {
    let bars = document.querySelectorAll(".bar"); // Ensure bars are correctly fetched
    
    if (!bars[index1] || !bars[index2]) {
        console.error("Error: One of the bars is undefined", index1, index2, bars.length);
        return;
    }

    return new Promise(resolve => {
        setTimeout(() => {
            let bar1 = bars[index1];
            let bar2 = bars[index2];

            // Swap heights
            let tempHeight = bar1.style.height;
            bar1.style.height = bar2.style.height;
            bar2.style.height = tempHeight;

            // Swap numbers inside bars
            let span1 = bar1.querySelector("span");
            let span2 = bar2.querySelector("span");

            if (span1 && span2) {
                let tempText = span1.innerText;
                span1.innerText = span2.innerText;
                span2.innerText = tempText;
            } else {
                console.error("Error: Number labels not found inside bars");
            }

            resolve();
        }, 100);
    });
}

/* ✅ Sorts the array and animates the sorting process */
const solve = async () => {
    const array = bars.map(el => el.height);
    const swaps = sortingAlgorithms[selectAlgorithm.value](array);

    for (let { firstPostion, lastPosition } of swaps) {
        await swapBars(firstPostion, lastPosition);
    }
};

/* ✅ Event Listeners */
// Generate new random bars
generateBtn.addEventListener('click', () => {
    nBars = parseInt(numbersBars.value, 10);
    start();
});

// Start sorting visualization
solveBtn.addEventListener('click', solve);

// Toggle dark mode
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle("dark-mode");
    toggleThemeBtn.textContent = document.body.classList.contains("dark-mode") ? "Light" : "Dark";
});
