window.onload = function() {
    document.getElementById('yesBtn').addEventListener('click', function() {
        document.getElementById('valentineQuestion').style.display = 'none';
        document.getElementById('gameArea').style.display = 'block';
        startGame();
    });

    document.getElementById('noBtn').addEventListener('mouseover', function(event) {
        const x = Math.random() * (window.innerWidth - this.clientWidth);
        const y = Math.random() * (window.innerHeight - this.clientHeight);
        this.style.position = 'absolute';
        this.style.left = `${x}px`;
        this.style.top = `${y}px`;
    });
};

const backgrounds = ['ice_cream.jpg', 'cakes.jpg', 'chocolates.jpg']; // Ensure these paths are correct
const targetImage = 'girl_with_glasses.png'; // Ensure this path is correct
let round = 0;
let targetX, targetY, targetWidth, targetHeight;
let imgTarget, canvas, ctx, moveInterval;
let backgroundImage = new Image(); // Global background image
let scaleFactor = 0.1; // Scale factor for the target image

function startGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    imgTarget = new Image();
    imgTarget.src = targetImage;

    backgroundImage.src = backgrounds[round]; // Load the background image for the current round

    imgTarget.onload = function() {
        targetWidth = imgTarget.width * scaleFactor;
        targetHeight = imgTarget.height * scaleFactor;
        moveInterval = setInterval(moveTargetRandomly, 1000); // Move every 1000 milliseconds for faster movement
    };

    backgroundImage.onload = function() {
        redraw(); // Ensure redraw after background image loads
    };

    setupClickHandler();
}

function moveTargetRandomly() {
    targetX = Math.random() * (canvas.width - targetWidth);
    targetY = Math.random() * (canvas.height - targetHeight);
    redraw();
}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Redraw the background
    ctx.drawImage(imgTarget, targetX, targetY, targetWidth, targetHeight); // Draw the target at new position
}

function setupClickHandler() {
    canvas.onclick = function(event) {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        if (clickX >= targetX && clickX <= targetX + targetWidth && clickY >= targetY && clickY <= targetY + targetHeight) {
            clearInterval(moveInterval); // Stop moving the target
            round++;
            if (round >= backgrounds.length) {
                document.getElementById('gameArea').style.display = 'none';
                document.getElementById('finalMessage').style.display = 'block';
            } else {
                startGame();
            }
        }
    };
}
