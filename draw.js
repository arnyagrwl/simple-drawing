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


canvas.addEventListener('mousedown', draw);
function draw (event) {
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left; // Adjust for canvas position
    const mouseY = event.clientY - rect.top;  // Adjust for canvas position

    context.beginPath();
    context.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}