
exports = module.exports = Context2d;

/**
 * Math.
 */

var abs = Math.abs
  , round = Math.round;

/**
 * Color map.
 */

exports.colors = {
    black: 0
  , red: 1
  , green: 2
  , yellow: 3
  , blue: 4
  , magenta: 5
  , cyan: 6
  , white: 7
  , normal: 9
};

function Context2d(canvas) {
  this.canvas = canvas;
  this.fillStyle = 'normal';
  this.strokeStyle = 'normal';
  this.beginPath();
}

Context2d.prototype.beginPath = function(){
  this.path = [];
};

Context2d.prototype.write = function(str){
  this.canvas.stream.write(str);
};

Context2d.prototype.hideCursor = function(){
  this.write('\033[?25l');
};

Context2d.prototype.showCursor = function(){
  this.write('\033[?25h');
};

Context2d.prototype.moveTo = function(x, y){
  x = round(x);
  y = round(y);
  this.write('\033[' + y + ';' + x + 'H');
};

/**
 * Plot line with the given points using
 * Bresenham's line algo.
 *
 * @param {Object} a
 * @param {Object} b
 * @api private
 */

Context2d.prototype.line = function(a, b){
  var steep = abs(b.y - a.y) > abs(b.x - a.x)
    , tmp;

  if (steep) {
    tmp = a.y;
    a.y = a.x;
    a.x = tmp;

    tmp = b.y;
    b.y = b.x;
    b.x = tmp;
  }

  if (a.x > b.x) {
    tmp = b.x;
    b.x = a.x;
    a.x = tmp;

    tmp = b.y;
    b.y = a.y;
    a.y = tmp;
  }

  var dx = b.x - a.x
    , dy = abs(b.y - a.y)
    , err = 0
    , derr = dy / dx;

  var ystep
    , y = a.y;

  ystep = a.y < b.y
    ? 1
    : -1;

  for (var x = a.x; x < b.x; ++x) {
    if (steep) {
      this.moveTo(y, x);
      this.write(' ');
    } else {
      this.moveTo(x, y);
      this.write(' ');
    }

    err += derr;
    if (err > .5) {
      y += ystep;
      err -= 1;
    }
  }
};

Context2d.prototype.stroke = function(){
  var self = this
    , path = this.path
    , len = path.length
    , prev
    , curr;

  this.applyStrokeStyle();
  for (var i = 1; i < len; ++i) {
    prev = path[i-1];
    curr = path[i];
    this.line(prev, curr);
  }
};

Context2d.prototype.lineTo = function(x, y){
  this.path.push({ x: x, y: y });
};

Context2d.prototype.clearRect = function(ox, oy, w, h){
  if (0 == ox
    && 0 == oy
    && w == this.canvas.width
    && h == this.canvas.height) {
    return this.clear();
  }

  for (var y = 0; y < h; ++y) {
    for (var x = 0; x < w; ++x) {
      this.moveTo(ox + x, oy + y);
      this.write('\033[0m ');
    }
  }
};

Context2d.prototype.clearLine = function(){
  this.write('\033[2K');
};

Context2d.prototype.clearDown = function(){
  this.write('\033[J');
};

Context2d.prototype.clear = function(){
  this.write('\033[1J');
  this.clearDown();
};

Context2d.prototype.fillText = function(str, x, y){
  this.applyForegroundFillStyle();
  this.moveTo(x, y);
  this.write(str);
};

Context2d.prototype.restore = function(){
  this.clear();
  this.showCursor();
  this.moveTo(0, 0);
  this.fillStyle = 'normal';
  this.strokeStyle = 'normal';
  this.applyFillStyle();
  this.applyStrokeStyle();
};

Context2d.prototype.strokeRect = function(x, y, w, h){
  var hr = Array(w + 1).join(' ');
  this.applyStrokeStyle();
  this.moveTo(x, y);
  this.write(hr);
  for (var i = 1; i < h; ++i) {
    this.moveTo(x, y + i);
    this.write(' ');
    this.moveTo(x + w - 1, y + i);
    this.write(' ');
  }
  this.moveTo(x, y + h);
  this.write(hr);
};

Context2d.prototype.fillRect = function(ox, oy, w, h){
  this.applyFillStyle();
  for (var y = 0; y < h; ++y) {
    for (var x = 0; x < w; ++x) {
      this.moveTo(ox + x, oy + y);
      this.write(' ');
    }
  }
};

Context2d.prototype.applyForegroundFillStyle = function(){
  color = exports.colors[this.fillStyle];
  this.write('\033[3' + color + 'm');
};

Context2d.prototype.applyFillStyle = function(){
  color = exports.colors[this.fillStyle];
  this.write('\033[4' + color + 'm');
};

Context2d.prototype.applyStrokeStyle = function(){
  color = exports.colors[this.strokeStyle];
  this.write('\033[4' + color + 'm');
};
