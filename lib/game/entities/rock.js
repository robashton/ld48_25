ig.module(
	'game.entities.rock'
)
.requires(
  'impact.entity',
  'game.eventbus'
)
.defines(function(){

  EntityRock = ig.Entity.extend({
    size: {x: 12, y: 12},
    collides: ig.Entity.COLLIDES.ACTIVE,
    checkAgainst: ig.Entity.TYPE.BOTH,
    type: ig.Entity.TYPE.A,
    rockType: 0,
    animSheet: new ig.AnimationSheet('media/rock.png', 12, 12),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.addAnim( 'idle', 1.0, [0]);
      this.addAnim( 'idle1', 1.0, [1]);
      this.addAnim( 'idle2', 1.0, [2]);
    },
    check: function(other) {
      this.parent(other)
      if(other instanceof EntityBullet) {
        other.kill()
        if(this.rockType === 2) {
          this.kill()
          Events.raise('rock-destroyed', this)
        }
        else
          this.decreaseSize()
      }
    },
    decreaseSize: function() {
      this.rockType++
      var rockSize = 12 - this.rockType*4
      this.currentAnim = this.anims['idle' + this.rockType]
      this.size.x = rockSize
      this.size.y = rockSize
    }
  })

})
