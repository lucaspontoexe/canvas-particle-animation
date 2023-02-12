export class FpsMeasurer {
  constructor() {
    this.last_frame_timestamp = performance.now();
    this.current_timestamp = performance.now();
    this.fps_display = document.querySelector("span.fps");
  }

  beginFrame() {
    this.current_timestamp = performance.now();
  }

  endFrame() {
    this.fps_display.textContent = Math.round(
      1000 / (this.current_timestamp - this.last_frame_timestamp)
    );
    this.last_frame_timestamp = this.current_timestamp;
  }
}

export const measurer = new FpsMeasurer();
