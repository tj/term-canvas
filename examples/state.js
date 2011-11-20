
/**
 * Module dependencies.
 */

var Canvas = require('../');

var canvas = new Canvas(50, 50)
  , ctx = canvas.getContext('2d');

process.on('SIGINT', function(){
  ctx.restore();
  process.nextTick(function(){
    process.exit();
  });
});

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'blue';
  ctx.strokeRect(5, 5, 20, 10);
}, 1000 / 20);