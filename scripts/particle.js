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
    switch (direction) {
      case "up":
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
        break;
      case "down":
        this.y = 0;
        this.x = Math.random() * canvas.width;
        break;
      case "left":
        this.x = canvas.width;
        this.y = Math.random() * canvas.height;
        break;
      case "right":
        this.x = 0;
        this.y = Math.random() * canvas.height;
        break;

      default:
        break;
    }

    this.radius = Math.random() * 2;
    this.randomRate = Math.random() + 1;
  }

  /**
   * update and redraw particle
   * @param {number} speed
   */
  update(speed) {
    this.y += speed * this.randomRate;
    this.x += this.randomRate;

    if (this.y < 0)             this.respawn("up");
    if (this.y > canvas.height) this.respawn("down");
    if (this.x < 0)             this.respawn("left");
    if (this.x > canvas.width)  this.respawn("right");

    this.draw();
  }
}
