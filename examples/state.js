
/**
 * Module dependencies.
 */

var Canvas = require('../');

var canvas = new Canvas(50, 100)
  , ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(5, 5, 20, 10);

ctx.fillStyle = 'blue';
ctx.fillRect(6, 6, 18, 8);

ctx.fillStyle = 'yellow';
ctx.fillRect(7, 7, 16, 6);

console.log('\n\n\n');
ctx.resetState();