
module.exports = Log;

function Log(x, y) {
  this.x = x;
  this.y = y;
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

  // title
  if (this._title) {
    ctx.fillStyle = 'white';
    ctx.fillText(this._title, 0, 0);
  }

  // lines
  ctx.fillStyle = 'cyan';
  this.lines.forEach(function(line){
    ctx.fillText(line, 0, y += 1);
  });
  ctx.restore();
};