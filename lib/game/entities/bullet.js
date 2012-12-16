ig.module(
	'game.entities.bullet'
)
.requires(
	'impact.entity'
)
.defines(function(){

  EntityBullet = ig.Entity.extend({
    size: {x: 4, y: 4},
    collides: ig.Entity.COLLIDES.LITE,
    checkAgainst: ig.Entity.TYPE.A,
    type: ig.Entity.TYPE.B,
    animSheet: new ig.AnimationSheet('media/bullet.png', 4,4),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 0.1, [0, 1, 2]);
      this.vel.x = typeof settings.spread === 'undefined' ? 0 : settings.spread
      this.vel.y = -settings.speed
    },
    check: function(other) {
      this.parent(other)
    }
  })

})
