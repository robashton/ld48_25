ig.module(
	'game.entities.centipedehead'
)
.requires(
	'impact.entity'
)
.defines(function(){

  EntityCentipedeHead = ig.Entity.extend({
    size: {x: 16, y: 16},
    collides: ig.Entity.COLLIDES.NONE,
    animSheet: new ig.AnimationSheet('media/centipedehead.png', 16, 16),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
    },
    update: function() {
      this.addAnim( 'idle', 1.0, [0]);
    }
  });
});
