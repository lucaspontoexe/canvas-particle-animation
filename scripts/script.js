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

// audio test
const audioElement = document.getElementsByTagName("audio")[0];

audioElement.addEventListener("play", visualize);

function visualize() {
  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaElementSource(audioElement);

  const analyser = audioCtx.createAnalyser();
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 32;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // https://losseff.xyz/katas/013-squeare-sum/javascript/
  function squareSum(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i] ** 2;
    }
    return Math.sqrt(sum);
  }

  function draw() {
    analyser.getByteFrequencyData(dataArray);
    particle_x_speed = squareSum(dataArray.slice(4)) / 128;
    particle_y_speed = -4 + squareSum(dataArray.slice(0, 3)) / 128;
    Xslider.value = particle_x_speed;
    Yslider.value = particle_y_speed;
    requestAnimationFrame(draw);
  }
  draw();
}
