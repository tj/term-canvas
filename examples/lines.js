
/**
 * Module dependencies.
 */

var Canvas = require('../')
  , size = process.stdout.getWindowSize();

process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});

process.on('SIGWINCH', function(){
  size = process.stdout.getWindowSize();
  canvas.width = size[1];
  canvas.height = size[0];
});

var canvas = new Canvas(size[1], size[0])
  , ctx = canvas.getContext('2d')
  , x = 15
  , y = 10;

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'yellow';
  ctx.beginPath();
  ctx.lineTo(5, 5);
  ctx.lineTo(x += .2, y += .1);
  ctx.lineTo(40, 5);
  ctx.lineTo(5, 5);
  ctx.stroke();
}, 1000 / 20);
