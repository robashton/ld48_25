ig.module(
	'game.entities.centipedesegment'
)
.requires(
	'impact.entity'
)
.defines(function(){

  EntityCentipedeSegment = ig.Entity.extend({
    size: {x: 8, y: 8},
    collides: ig.Entity.COLLIDES.NONE,
    animSheet: new ig.AnimationSheet('media/centipedesegment.png', 8, 8),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.head = settings.head
      this.index = settings.index
    },
    update: function() {
      this.addAnim( 'idle', 1.0, [0]);
      var position = this.head.getPositionForSegment(this.index)
      this.pos.x = position.x
      this.pos.y = position.y
    },
  })

})
