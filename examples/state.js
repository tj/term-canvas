
/**
 * Module dependencies.
 */

var Canvas = require('../');

var canvas = new Canvas(50, 100)
  , ctx = canvas.getContext('2d');

ctx.clear();

ctx.fillStyle = 'red';
ctx.fillRect(5, 5, 20, 10);
ctx.save();

ctx.fillStyle = 'blue';
ctx.fillRect(6, 6, 18, 8);
ctx.save();

ctx.fillStyle = 'yellow';
ctx.fillRect(7, 7, 16, 6);

ctx.restore();
ctx.fillRect(8, 8, 14, 4);

ctx.restore();
ctx.fillRect(9, 9, 12, 2);


console.log('\n\n\n\n\n');
ctx.resetState();