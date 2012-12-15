ig.module(
	'game.entities.rock'
)
.requires(
  'impact.entity'
)
.defines(function(){

  EntityRock = ig.Entity.extend({
    size: {x: 12, y: 12},
    collides: ig.Entity.COLLIDES.ACTIVE,
    checkAgainst: ig.Entity.TYPE.BOTH,
    type: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/rock.png', 12, 12),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1.0, [0]);
    },
    check: function(other) {
      this.parent(other)
      if(other instanceof EntityBullet) {
        other.kill()
        this.kill()
      }
    }
  })

})
