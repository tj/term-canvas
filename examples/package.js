
module.exports = Package;

function Package(title) {
  this.complete(0);
  this.title(title);
  this.text('');
}

Package.prototype.moveTo = function(x, y){
  this.x = x;
  this.y = y;
  return this;
};

Package.prototype.complete = function(n){
  this._complete = n;
  return this;
};

Package.prototype.title = function(str){
  this._title = str;
  return this;
};

Package.prototype.text = function(str){
  this._text = str;
  return this;
};

Package.prototype.draw = function(ctx){
  var y = 0
    , text = this._text;

  ctx.save();
  ctx.translate(this.x, this.y);

  // title
  if (this._title) {
    ctx.fillStyle = 'white';
    ctx.fillText(this._title, 0, 0);
  }

  // text
  ctx.fillStyle = 'cyan';
  ctx.fillText(text, 0, ++y);
  ctx.restore();

  // progress
  var max = 10
    , width = (max * this._complete | 0) || 1
    , fill = Array(width).join('|')
    , left = Array(max - width).join(' ')
    , str = fill + left;

  // TODO: lame
  ctx.moveTo(this.x, this.y + ++y);
  ctx.write('\033[90m|\033[0m');
  ctx.write(str);
  ctx.write('\033[90m|\033[0m');
};