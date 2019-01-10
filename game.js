import PhysicsEntity from './engine/model.js';
import Controls from './controller/controls.js';

let startTime, fpsInterval, now, then, elapsed;
let pos_x = 100, pos_y = 100;
let canvas, ctx;
let entity = new PhysicsEntity()
let controls = new Controls(pos_x, pos_y)
let requestAnimFrame = function(r) {
  return window.requestAnimationFrame(r) ||
   window.webkitRequestAnimationFrame(r) ||
   window.mozRequestAnimationFrame(r)
}

window.onload = init;

function init() {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d');
  canvas.width = 500
  canvas.height = 500
  // return if browser doesn't support WebGL or if failure
  if (!window.WebGLRenderingContext || !ctx) return;
  ['keydown', 'keyup'].forEach(function(event) {
    document.addEventListener(event, e => controls.checkValidInput(e), false);
  })
  startAnimating(60);
}

// initialize the timer variables and start the animation
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
  // request another frame
  requestAnimationFrame(animate);

  // calc elapsed time since last loop
  now = Date.now();
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {

      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      then = now - (elapsed % fpsInterval);

      // Put your drawing code here
      ctx.fillStyle = entity.color;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(controls.posX, controls.posY, entity.width, entity.height);
  }
}

// 1. move objects
// 2. pass array to engine
// 3. engine get positions
// 4. pass model to detector, see if collision
// 5. resolves and updates positions