
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
  canvas.width = size[0];
  canvas.height = size[1];
});

function Log(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.lines = [];
}

Log.prototype.title = function(str){
  this._title = str;
  return this;
};

Log.prototype.write = function(line){
  this.lines.push(line);
  return this;
};

Log.prototype.draw = function(ctx){
  var y = 0;
  ctx.save();
  ctx.translate(this.x, this.y);

  if (this._title) {
    ctx.fillStyle = 'white';
    ctx.fillText(this._title, 0, 0);
  }

  ctx.fillStyle = 'cyan';
  this.lines.forEach(function(line){
    ctx.fillText(line, 0, y += 1);
  });
  ctx.restore();
};


var canvas = new Canvas(size[0], size[1])
  , ctx = canvas.getContext('2d')
  , a = new Log(5, 2, 20, 10).title('express')
  , b = new Log(20, 2, 20, 10).title('tap')
  , c = new Log(35, 2, 20, 10).title('mocha');

ctx.hideCursor();
setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  a.draw(ctx);
  b.draw(ctx);
  c.draw(ctx);
}, 1000 / 20);

setInterval(function(){
  a.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
}, 200);

setInterval(function(){
  b.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
}, 250);

setInterval(function(){
  c.write(['something', 'else', 'happened'][Math.random() * 3 | 0]);
}, 150);
