// Some geometrical drawings

const min_side = Math.min(window.innerWidth, window.innerHeight);
const cnv = document.getElementById("canvas");
cnv.style["margin-top"] = (window.innerHeight - min_side) / 2 + "px";
cnv.style["margin-left"] = (window.innerWidth - min_side) / 2 + "px";
cnv.setAttribute('width', min_side);
cnv.setAttribute('height', min_side);
const ctx = cnv.getContext('2d');
const slider = document.getElementById("slider");


class Square {
  constructor(side, color, angle) {
    this.side = side;
    this.color = color;
    this.angle = angle;
  }
  draw() {
    ctx.resetTransform();
    ctx.translate(min_side/2, min_side/2);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.side/2, -this.side/2, this.side, this.side);
  }
}

function drawSquares(scale_factor, init_side, color=[0, 150, 200]) {

    let flip = 1;
    let n_squares = 700; //10 * (scale_factor ** 2);
    let sq_side = init_side;
    let angle = 0;

    for (let i=0; i<n_squares; i++) {
      let small_leg = scale_factor * sq_side;
      let big_leg = (1 - scale_factor) * sq_side;
      sq_side = Math.sqrt(small_leg**2 + big_leg**2);
      angle += Math.asin(small_leg / sq_side);
      let sq_color = `rgb(${flip*color[0]}, ${flip*color[1]}, ${flip*color[2]})`;

      let square = new Square(sq_side, sq_color, angle);
      square.draw();
      flip *= -1;
    }
}

function updateScaleFactor() {
    let value = parseFloat(slider.value);
    let color = [255 * (1 - value), 150, 200];
    ctx.resetTransform();
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    drawSquares(value, min_side, color);
}

let scale_factor = parseFloat(slider.value);
let color = [255 * (1 - parseFloat(slider.value)), 150, 200];
drawSquares(scale_factor, min_side);
