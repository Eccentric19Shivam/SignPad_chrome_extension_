let canvas = document.getElementById("signatureCanvas");
let ctx = canvas.getContext("2d");
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Event listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

document.getElementById("clearButton").addEventListener("click", clearCanvas);
document.getElementById("downloadButton").addEventListener("click", downloadSignature);

// Functions
function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadSignature() {
  let dataUrl = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.href = dataUrl;
  a.download = "signature.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
