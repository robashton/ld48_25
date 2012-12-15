ig.module(
	'game.entities.centipedesegment'
)
.requires(
  'impact.entity',
  'game.entities.bullet'
)
.defines(function(){

  EntityCentipedeSegment = ig.Entity.extend({
    size: {x: 8, y: 8},
    collides: ig.Entity.COLLIDES.LITE,
    checkAgainst: ig.Entity.TYPE.B,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/centipedesegment.png', 8, 8),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1.0, [0]);
      this.head = settings.head
      this.index = settings.index
      this.calculatePosition()
    },
    calculatePosition: function() {
      var position = this.head.getPositionForSegment(this.index)
      this.pos.x = position.x
      this.pos.y = position.y
    },
    update: function() {
      this.parent()
      this.calculatePosition()
    },
    check: function(other) {
      this.parent(other)
      if(other instanceof EntityBullet) {
        this.head.damage()
        other.kill()
      }
    }
  })

})
