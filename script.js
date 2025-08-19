/* ========== Buttons ==========
   Flow:
   1) User clicks Play -> music starts, Show Message button appears
   2) User clicks Show Message -> popup card shows (music keeps playing)
================================ */

const playBtn = document.getElementById("play-btn");
const msgBtn  = document.getElementById("msg-btn");
const overlay = document.getElementById("overlay");
const closeCard = document.getElementById("close-card");
const audio = document.getElementById("bg-music");

audio.loop = true; // keep music playing

playBtn.addEventListener("click", async () => {
  try {
    await audio.play();
    playBtn.textContent = "Music Playing 🎶";
    playBtn.disabled = true;
    msgBtn.classList.remove("hidden"); // reveal second button
  } catch (e) {
    // If the file is missing or browser blocks on first tap
    playBtn.textContent = "Tap Again to Play 🎵 (add audio/birthday_music.mp3)";
    console.log("Audio play error:", e);
  }
});

msgBtn.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

closeCard.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

/* ========== Confetti (subtle, continuous) ========== */
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
function sizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);

const COUNT = 140;
const confetti = Array.from({ length: COUNT }, () => makePiece());

function makePiece() {
  const r = Math.random() * 6 + 2;
  return {
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    r,
    d: Math.random() * 150,
    color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 55%)`,
    tilt: Math.random() * 12 - 6,
    tiltAngle: Math.random() * Math.PI,
    speed: 0.5 + Math.random() * 1.2
  };
}

function draw() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.r * 2);
    ctx.stroke();
  });
  update();
  requestAnimationFrame(draw);
}

function update() {
  confetti.forEach(p => {
    p.tiltAngle += 0.04;
    p.y += p.speed + Math.cos(p.d) * 0.2 + p.r / 3;
    p.x += Math.sin(p.tiltAngle) * 0.6;

    if (p.y > confettiCanvas.height + 10) {
      // reset to top
      p.x = Math.random() * confettiCanvas.width;
      p.y = -10;
    }
  });
}
draw();
