
module.exports = Tabs;

function Tabs() {
  this.tabs = [];
  this.active = 0;
}

Tabs.prototype.add = function(tab){
  this.tabs.push(tab);
};

Tabs.prototype.prev = function(){
  this.active = Math.max(0, this.active - 1);
};

Tabs.prototype.next = function(){
  this.active = Math.min(this.tabs.length - 1, this.active + 1);
};

Tabs.prototype.render = function(ctx){
  var self = this;
  var y = 1;
  ctx.save();
  ctx.translate(0, y);
  this.tabs.forEach(function(tab, i){
    tab.active = i == self.active;
    tab.render(ctx);
    ctx.translate(0, y += 3);
  });
  ctx.restore();
};