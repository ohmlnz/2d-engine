import PhysicsEntity from './engine/model.js';
import Controls from './controller/controls.js';
import Engine from './engine/engine.js';
import { setFps } from './helpers.js';

let pos_x = 100, pos_y = 100;
let canvas, ctx;
let player = new PhysicsEntity(pos_x, pos_y, 'red');
let entity = new PhysicsEntity(170, 100, 'blue');
let engine = new Engine();
let controls = new Controls(player);

window.onload = init;

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  // return if browser doesn't support WebGL or if failure
  if (!window.WebGLRenderingContext || !ctx) return;
  
  ['keydown', 'keyup'].forEach((event) => {
    document.addEventListener(event, e => {
      const input = controls.checkInput(e)
      engine.step(player, [entity], input)
    }, false);
  })
  setFps(60, render)
}

function render() {
  ctx.fillStyle = player.color;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = entity.color;
  ctx.strokeStyle = 'red';
  ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);
}
