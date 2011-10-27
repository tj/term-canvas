
exports = module.exports = Context2d;

/**
 * Color map.
 */

exports.colors = {
    none: 39
  , red: 31
  , green: 32
  , yellow: 33
  , blue: 34
  , magenta: 35
  , cyan: 36
  , white: 37
  , gray: 99
  , grey: 99
};

function Context2d(canvas) {
  this.canvas = canvas;
}

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
  x = Math.round(x);
  y = Math.round(y);
  this.write('\033[' + y + ';' + x + 'H');
};

Context2d.prototype.clearRect = function(ox, oy, w, h){
  for (var y = 0; y < h; ++y) {
    for (var x = 0; x < w; ++x) {
      this.moveTo(ox + x, oy + y);
      this.write('\033[30m');
    }
  }
};

Context2d.prototype.clearLine = function(){
  this.write('\033[2K');
};

Context2d.prototype.clear = function(){
  this.write('\033[1J');
  this.clearLine();
};

Context2d.prototype.fillText = function(str, x, y){
  this.moveTo(x, y);
  this.write(str);
};

Context2d.prototype.restore = function(){
  this.clear();
  this.showCursor();
  this.moveTo(0, 0);
  this.fillStyle = 'none';
};

Context2d.prototype.strokeRect = function(x, y, w, h){
  var hr = Array(w + 1).join('-');
  this.moveTo(x, y);
  this.write(hr);
  for (var i = 1; i < h; ++i) {
    this.moveTo(x, y + i);
    this.write('|');
    this.moveTo(x + w - 1, y + i);
    this.write('|');
  }
  this.moveTo(x, y + h);
  this.write(hr);
};

Context2d.prototype.__defineSetter__('fillStyle', function(color){
  this._fillStyle = color;
  color = exports.colors[color];
  this.write('\033[' + color + 'm');
});

Context2d.prototype.__defineGetter__('fillStyle', function(){
  return this._fillStyle;
});

Context2d.prototype.__defineSetter__('strokeStyle', function(color){
  this._strokeStyle = color;
  color = exports.colors[color];
  this.write('\033[' + color + 'm');
});

Context2d.prototype.__defineGetter__('strokeStyle', function(){
  return this._strokeStyle;
});
