ig.module( 'game.entities.audio' ) 
.requires( 
  'game.eventbus',
  "impact.entity",
  "impact.sound"
)
.defines(function(){

  EntityAudio = ig.Entity.extend({
    hurt: new ig.Sound('media/hurt.*'),
    fire: new ig.Sound('media/fire.*'),
    pickup: new ig.Sound('media/pickup.*'),
    init: function() {
      this.parent()
      Events.on('player-damaged', this.onPlayerDamaged, this)
      Events.on('bullet-fired', this.onBulletFired, this)
      Events.on('flower-eaten', this.onFlowerEaten, this)
    },
    onPlayerDamaged: function() {
      this.hurt.volume = 0.2
      this.hurt.play()
    },
    onBulletFired: function() {
      this.fire.volume = 0.2
      this.fire.play()
    },
    onFlowerEaten: function() {
      this.pickup.volume = 0.2
      this.pickup.play()
    }
  })

})

