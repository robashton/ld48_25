ig.module(
	'game.entities.centipedehead'
)
.requires(
  'impact.entity',
  'game.entities.centipedesegment',
  'game.entities.bullet'
)
.defines(function(){

  EntityCentipedeHead = ig.Entity.extend({
    size: {x: 8, y: 8},
    maxSegments: 10,
    segments: [],
    history: [],
    speed: 60,
    direction: '',
    collides: ig.Entity.COLLIDES.LITE,
    checkAgainst: ig.Entity.TYPE.B,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/centipedehead.png', 8, 8),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1.0, [0]);
      this.addInitialSegments()
      this.moveRight()
    },
    addInitialSegments: function() {
      for(var i =0 ; i < 5; i++) {
        this.grow()
      }
    },
    moveLeft: function() {
      this.changeDirection('left', -this.speed, 0)
    },
    moveRight: function() {
      this.changeDirection('right', this.speed, 0)
    },
    moveUp: function() {
      this.changeDirection('up', 0, -this.speed)
    },
    moveDown: function() {
      this.changeDirection('down', 0, this.speed)
    },
    changeDirection: function(direction, x, y) {
      if(this.direction === direction) return
      this.direction = direction
      this.vel.x = x
      this.vel.y = y
      this.pushHistory()
    },
    update: function() {
      this.updateHistory()
      this.checkBounds()
      this.parent()
    },
    checkBounds: function() {
      if(this.pos.x < 0)
        this.moveRight()
      if(this.pos.x > 312)
        this.moveLeft()
      if(this.pos.y < 0)
        this.moveDown()
      if(this.pos.y > 200)
        this.moveUp()
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
    },
    check: function(other) {
      this.parent(other)
      if(other instanceof EntityBullet) {
        this.damage()
        other.kill()
      }
    },
    damage: function() {
      if(this.segments.length === 0) {
        // Sadface game over
        this.kill()
        return
      }
      var segment = this.segments.pop()
      segment.kill()
    },
    grow: function() {
      if(this.segments.length === this.maxSegments) return
      var segment = ig.game.spawnEntity(EntityCentipedeSegment, 0, 0, {
          head: this,
          index: this.segments.length+1
        })
        this.segments.push(segment)
    }
  });
});
