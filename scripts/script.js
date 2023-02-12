import { canvas, context as c } from "./canvas.js";
import Particle from "./particle.js";
let slider = document.querySelector('input[type=range]');

let particlesSpeed = 4;
let particles = [];

function initStars() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  particles = [];

  for (let i = 0; i < 1500; i++) {
    particles.push(new Particle());
  }
  // otimizar etc
  particles.forEach((p) => p.draw());
}

function animate() {
  c.fillStyle = "rgba(0,0,0,0.2)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update(particlesSpeed);
  });

  requestAnimationFrame(animate);
}

initStars();
animate();
window.addEventListener("resize", initStars);
slider.addEventListener("input", e => particlesSpeed = +e.target.value);
