ig.module(
	'game.entities.deadsegment'
)
.requires(
	'impact.entity'
)
.defines(function(){

  EntityDeadSegment = ig.Entity.extend({
    size: {x: 8, y: 8},
    collides: ig.Entity.COLLIDES.NONE,
    animSheet: new ig.AnimationSheet('media/centipede.png', 8,8),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 0.2, [10, 15, 16, 17, 18, 19]);
      this.ticks = 30
    },
    update: function() {
      this.parent()
      this.ticks--
      if(this.ticks <= 0)
        this.kill()
    }
  })

})
