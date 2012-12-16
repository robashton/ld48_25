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
    speed: 25,
    bulletSpeed: 20,
    collides: ig.Entity.COLLIDES.NONE,
    firingTicks: 0,
    firingRate: 250,
    accuracyTolerance: 50,
    animSheet: new ig.AnimationSheet('media/defenceunit.png', 8, 8),
    firingStrategies: [
      function() {
        ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {
          speed: this.bulletSpeed
        })
      }, 
      function() {
        var count = 5
        var self = this
        var fire = function() {
          ig.game.spawnEntity(EntityBullet, self.pos.x, self.pos.y, {
            speed: self.bulletSpeed
          })
          if(count-- > 0)
            setTimeout(fire, 1000)
        }
        fire()
      }, 
      function() {
        for(var i = 0 ; i < 10; i++) {
          ig.game.spawnEntity(EntityBullet, this.pos.x, this.pos.y, {
            speed: this.bulletSpeed,
            spread: (5 - i) * 333.0
          })
        }
      }
    ],
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.head = settings.head
      this.addAnim( 'idle', 1.0, [0]);
    },
    update: function() {
      this.parent()
      this.updateFiringTicks()
      this.updateVelocity()
      if(Math.abs(this.head.pos.x - this.pos.x) < this.accuracyTolerance)
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
      var strategy = this.firingStrategies[
        Math.floor(Math.random() * this.firingStrategies.length)
      ]
      strategy.call(this)
    }
  })

})
