const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener('input', updateColor)
let color;
function updateColor (event) {
    color = event.target.value;
}

sizePicker = document.getElementById("sizePicker");
sizePicker.addEventListener('input', updateSize);
let radius = 10;
function updateSize (event) {
    radius = parseInt(event.target.value, 10);
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

let isDrawing = false;
canvas.addEventListener('mousedown', () => {
    isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    context.beginPath(); 
});

let previousPos = null;
canvas.addEventListener('mousemove', draw);

function lerp(start, end, frac) {
    return start + frac * (end - start);
}

function draw (event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left; // Adjust for canvas position
    const mouseY = event.clientY - rect.top;  // Adjust for canvas position
    if (isDrawing) {
        context.beginPath();
        context.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
        context.closePath();
        if (previousPos !== null) {
            for (let i=0;i<100;i++) {
                const frac = i/100;
                context.beginPath();
                context.arc(lerp(previousPos[0], mouseX, frac), lerp(previousPos[1], mouseY, frac), radius, 0, 2 * Math.PI);
                context.fillStyle = color;
                context.fill();
                context.closePath();
            }
        }
    }
    previousPos = [mouseX, mouseY];   
}

const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
