import { canvas, context as c } from "./canvas.js";
import Particle from "./particle.js";
let slider = document.querySelector("input[type=range]");
let fps_display = document.querySelector("span.fps");

let particle_y_speed = 4;
let particles = [];
let last_frame_timestamp = performance.now();

const calculateParticleCount = () => (innerWidth * innerHeight) / 1200;

function initStars(count = 1500) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  particles = [];

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
  // otimizar etc
  particles.forEach((p) => p.draw());
}

function animate() {
  const this_frame_timestamp = performance.now();

  c.fillStyle = "rgba(0,0,0,0.25)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update(particle_y_speed);
  });

  fps_display.textContent = Math.round(1000 / (this_frame_timestamp - last_frame_timestamp));
  last_frame_timestamp = this_frame_timestamp;
  requestAnimationFrame(animate);
}

initStars(calculateParticleCount());
animate();

window.addEventListener("resize", () => initStars(calculateParticleCount()));
slider.addEventListener("input", (e) => (particle_y_speed = +e.target.value));
