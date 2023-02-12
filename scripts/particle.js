import { canvas, context as c } from "./canvas.js";

export default class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2;
    this.randomRate = Math.random() + 1;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "white";
    c.fill();
    c.closePath();
  }

  respawn(direction) {
    this.y = direction === 'y' ? 0 : Math.random() * canvas.height;
    this.x = direction === 'x' ? 0 : Math.random() * canvas.width;
    this.radius = Math.random() * 2;
    this.randomRate = Math.random() + 1;
  }

  /**
   * update and redraw particle
   * @param {number} speed
   */
  update(speed) {
    this.y += speed * this.randomRate;
    this.x += 1;

    if (this.y > canvas.height) this.respawn('y');
    if (this.x > canvas.width) this.respawn('x');

    this.draw();
  }
}
