ig.module(
	'game.entities.defenceunit'
)
.requires(
  'impact.entity',
  'game.entities.bullet'
)
.defines(function(){

  EntityDefenceUnit = ig.Entity.extend({
    size: {x: 8, y: 8},
    speed: 30,
    bulletSpeed: 20,
    collides: ig.Entity.COLLIDES.NONE,
    firingTicks: 0,
    firingRate: 250,
    animSheet: new ig.AnimationSheet('media/defenceunit.png', 8, 8),
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.head = settings.head
      this.addAnim( 'idle', 1.0, [0]);
    },
    update: function() {
      this.parent()
      this.updateFiringTicks()
      this.updateVelocity()
      if(Math.abs(this.head.pos.x - this.pos.x) < 30)
        this.tryFire()
    },
    updateVelocity: function() {
      if(this.head.pos.x < this.pos.x)
        this.vel.x = -this.speed
      else if(this.head.pos.x > this.pos.x)
        this.vel.x = this.speed
    },
    updateFiringTicks: function() {
      if(this.firingTicks !== 0) {
        this.firingTicks++
      if(this.firingTicks % this.firingRate === 0)
        this.firingTicks = 0
      }
    },
    tryFire: function() {
      if(this.firingTicks === 0) {
        this.firingTicks++
        this.fire()
      }
    },
    fire: function() {
      ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {
        speed: this.bulletSpeed
      })
    }
  })

})
