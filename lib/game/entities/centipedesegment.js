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
    animSheet: new ig.AnimationSheet('media/centipede.png', 8, 8),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'horizontal', 1.0, [11]);
      this.addAnim( 'vertical', 1.0, [10]);
      this.head = settings.head
      this.index = settings.index
      this.calculatePosition()
    },
    calculatePosition: function() {
      var position = this.head.getPositionForSegment(this.index)
      this.pos.x = position.x
      this.pos.y = position.y
      this.direction = position.direction
    },
    update: function() {
      this.parent()
      this.calculatePosition()

      if(this.direction === 'left' || this.direction === 'right')
        this.currentAnim = this.anims.horizontal
      if(this.direction === 'up' || this.direction === 'down')
        this.currentAnim = this.anims.vertical
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
