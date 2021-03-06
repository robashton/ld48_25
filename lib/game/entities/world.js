ig.module(
	'game.entities.world'
)
.requires(
  'impact.entity',
  'game.entities.rock',
  'game.entities.flower',
  'game.entities.centipedehead',
  'game.entities.centipedecontroller',
  'game.entities.defenceunit',
  'game.entities.audio',
  'game.eventbus'
)
.defines(function(){

  EntityWorld = ig.Entity.extend({
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      this.level = 1
      Events.on('flower-eaten', this.onFlowerEaten, this)
    },
    start: function() {
      this.head = ig.game.spawnEntity(EntityCentipedeHead, 0, 0) 
      this.input = ig.game.spawnEntity(EntityCentipedeController,0,0, { head: this.head })
      this.defence = ig.game.spawnEntity(EntityDefenceUnit, 160, 232, {
        head: this.head
      })
      this.audio = ig.game.spawnEntity(EntityAudio, 0,0)
      this.createRocks()
      this.startLevel()
    },
    startLevel: function() {
      this.createFlowers()
      this.head.speed = 50 + (this.level*10)
      this.defence.bulletSpeed = 40 + (this.level*5)
      this.defence.firingRate = Math.floor(Math.max(150 - (this.level * 10), 30))
      this.defence.speed = 25 + this.level*2
      this.defence.accuracyTolerance = 30 + (this.level * 5)
      Events.raise('level-started', this.level)
    },
    createRocks: function() {
      for(var i = 0; i < 10 ; i++) {
        ig.game.spawnEntity(EntityRock, 
              Math.random() * 270 + 25,
              Math.random() * 180 + 30)
      }
    },
    createRock: function(x, y) {
      ig.game.spawnEntity(EntityRock,x,y)
    },
    createFlowers: function() {
      this.flowerCount = 5
      this.spawnFlower()
    },
    spawnFlower: function() {
      ig.game.spawnEntity(EntityFlower, 
            Math.random() * 270 + 25,
            Math.random() * 180 + 20)
    },
    onFlowerEaten: function(flower) {
      this.flowerCount--
      if(this.flowerCount <= 0) {
        this.level++
        this.startLevel()
      }
      else 
        this.spawnFlower()

      var self = this
      if(Math.random() > 0.3)
        setTimeout(function() {
          self.createRock(flower.pos.x, flower.pos.y)
        }, 3000)
    },
    removeAll: function(Type) {
      var rocks = ig.game.getEntitiesByType( Type )
      for(var i = 0; i < rocks.length; i++)
        rocks[i].kill()
    }
  })
})
