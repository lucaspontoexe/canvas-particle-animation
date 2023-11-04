import { canvas, context as c } from "./canvas.js";
import { measurer } from "./FpsMeasurer.js";
import Particle from "./particle.js";

let Yslider = document.querySelector(".y-slider");
let Xslider = document.querySelector(".x-slider");

let particle_y_speed = 4;
let particle_x_speed = 0.1;
let particles = [];

const calculateParticleCount = () => (innerWidth * innerHeight) / 1200;

function initStars(count = 1500) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  particles = [];

  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  particles.forEach((p) => p.draw());
}

function animate() {
  measurer.beginFrame();

  c.fillStyle = "rgba(0,0,0,0.25)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update([particle_x_speed, particle_y_speed]);
  });

  measurer.endFrame();
  requestAnimationFrame(animate);
}

initStars(calculateParticleCount());
animate();

window.addEventListener("resize", () => initStars(calculateParticleCount()));
Yslider.addEventListener("input", (e) => (particle_y_speed = +e.target.value));
Xslider.addEventListener("input", (e) => (particle_x_speed = +e.target.value));
