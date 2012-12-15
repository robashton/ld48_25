ig.module(
	'game.entities.flower'
)
.requires(
  'impact.entity'
)
.defines(function(){

  EntityFlower = ig.Entity.extend({
    size: {x: 12, y: 12},
    collides: ig.Entity.COLLIDES.ACTIVE,
    checkAgainst: ig.Entity.TYPE.BOTH,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/rock.png', 12, 12),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1.0, [0]);
    }
  })

})
