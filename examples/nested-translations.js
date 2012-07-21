
/**
 * Module dependencies.
 */

var Canvas = require('../')
  , canvas = new Canvas(100, 100)
  , ctx = canvas.getContext('2d')
  , x = 0
  , y = 0;

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.save();
ctx.translate(3, 3);
ctx.fillStyle = 'yellow';
ctx.fillRect(0, 0, 10, 5);
ctx.fillStyle = 'white';
ctx.fillText('Hey', 2, 1);

ctx.save();
ctx.translate(3, 3);
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 10, 5);
ctx.fillStyle = 'white';
ctx.fillText('Hey', 2, 1);

ctx.save();
ctx.translate(3, 3);
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 10, 5);
ctx.fillStyle = 'white';
ctx.fillText('Hey', 2, 1);
ctx.restore();

ctx.restore();
ctx.restore();

console.log('\n\n\n\n');
ctx.resetState();
