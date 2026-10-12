const container = document.querySelector("#grid-container");
const resizeButton = document.querySelector("#resize-button");

function createGrid(size) {
    // Remove the existing squares
    container.innerHTML = "";

    // Calculate the size of each square
    const squareSize = 960 / size;

    // Create the squares using JavaScript
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");

        square.classList.add("square");

        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Change the square's color when the mouse enters it
        square.addEventListener("mouseenter", () => {
            // Generate a random RGB color
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);

            square.style.backgroundColor =
                `rgb(${red}, ${green}, ${blue})`;

            // Darken the square progressively
            let darkness = Number(square.dataset.darkness || 0);
            darkness = Math.min(darkness + 0.1, 1);

            square.dataset.darkness = darkness;
            square.style.opacity = darkness;
        });

        container.appendChild(square);
    }
}

// Create the initial 16 × 16 grid
createGrid(16);

// Ask the user for a new grid size
resizeButton.addEventListener("click", () => {
    const answer = prompt(
        "Enter the number of squares per side (1–100):"
    );

    // Do nothing if the user cancels
    if (answer === null || answer.trim() === "") {
        return;
    }

    const size = Number(answer);

    // Validate the input
    if (!Number.isInteger(size) || size < 1 || size > 100) {
        alert("Please enter a whole number between 1 and 100.");
        return;
    }

    createGrid(size);
});