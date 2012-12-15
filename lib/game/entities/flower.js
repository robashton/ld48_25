ig.module(
	'game.entities.flower'
)
.requires(
  'impact.entity',
  'game.eventbus'
)
.defines(function(){

  EntityFlower = ig.Entity.extend({
    size: {x: 6, y: 6},
    collides: ig.Entity.COLLIDES.ACTIVE,
    checkAgainst: ig.Entity.TYPE.BOTH,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/flower.png', 6, 6),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1.0, [0]);
    },
    check: function(other) {
      this.parent(other)
      if(other instanceof EntityBullet) {
        other.kill()
      }
      else if(other instanceof EntityCentipedeHead) {
        other.grow()
        this.kill()
        Events.raise('flower-eaten', this)
      }
    }
  })

})
