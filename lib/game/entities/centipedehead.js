ig.module(
	'game.entities.centipedehead'
)
.requires(
  'impact.entity',
  'game.entities.centipedesegment'
)
.defines(function(){

  EntityCentipedeHead = ig.Entity.extend({
    size: {x: 8, y: 8},
    maxSegments: 10,
    segments: [],
    history: [],
    collides: ig.Entity.COLLIDES.NONE,
    animSheet: new ig.AnimationSheet('media/centipedehead.png', 8, 8),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addInitialSegments()
      this.pushHistory()
      this.vel.x = 5
    },
    addInitialSegments: function() {
      for(var i =0 ; i < 5; i++) {
        var segment = ig.game.spawnEntity(EntityCentipedeSegment, 0, 0, {
          head: this,
          index: i + 1
        })
        this.segments.push(segment)
      }
    },
    update: function() {
      this.addAnim( 'idle', 1.0, [0]);
      this.updateHistory()
      this.parent()
    },
    updateHistory: function() {
      this.history[this.history.length-1].endx = this.pos.x
      this.history[this.history.length-1].endy = this.pos.y
    },
    pushHistory: function() {
      this.history.push({
        x: this.pos.x,
        y: this.pos.y,
        endx: this.pos.x,
        endy: this.pos.y,
      })
    },
    getPositionForSegment: function(index) {
      var distanceFromHead = index * 8
      return this.tryGetPositionFromHistory(this.history.length-1, distanceFromHead, 0)
    },
    tryGetPositionFromHistory: function(index, desired, current) {
      var item = this.history[index]
        , distx = (item.endx - item.x)
        , disty = (item.endy - item.y)

      var distance = Math.sqrt(distx*distx + disty*disty)
      var xvel = distx/distance
      var yvel = disty/distance
      var total = distance + current

      if(total >= desired) {
        var remainder = desired - current
        return {
          x: item.endx - (remainder * xvel),
          y: item.endy - (remainder * yvel)
        }
      }
      else {
        if(index === 0)
          return { x: item.x, y: item.y }
        else
          return this.tryGetPositionFromHistory(index-1, desired, total)
      }
    }
  });
});
