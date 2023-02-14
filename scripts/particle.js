import { canvas, context as c } from "./canvas.js";

const directions = Object.freeze({
  up: 0,
  down: 1,
  left: 2,
  right: 3,
});
 
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

  /**
   * respawn particle
   * @param {number} direction Directions. See "directions" object.
   */
  respawn(direction) {
    switch (direction) {
      case 0:
        this.y = canvas.height;
        this.x = Math.random() * canvas.width;
        break;
      case 1:
        this.y = 0;
        this.x = Math.random() * canvas.width;
        break;
      case 2:
        this.x = canvas.width;
        this.y = Math.random() * canvas.height;
        break;
      case 3:
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
  update([x, y]) {
    this.x += x * this.randomRate;
    this.y += y * this.randomRate;

    if (this.y < 0)               this.respawn(directions.up);
    if (this.y > canvas.height)   this.respawn(directions.down);
    if (this.x < 0)               this.respawn(directions.left);
    if (this.x > canvas.width)    this.respawn(directions.right);

    this.draw();
  }
}
