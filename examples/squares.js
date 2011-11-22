
/**
 * Module dependencies.
 */

var Canvas = require('../');

var canvas = new Canvas(50, 100)
  , ctx = canvas.getContext('2d');

ctx.clear();

ctx.fillStyle = 'red';
ctx.fillRect(5, 5, 20, 10);

ctx.fillStyle = 'blue';
ctx.fillRect(27, 5, 20, 10);

ctx.fillStyle = 'yellow';
ctx.fillRect(49, 5, 20, 10);

console.log('\n\n\n');
ctx.resetState();
