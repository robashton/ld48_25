ig.module(
	'game.entities.world'
)
.requires(
  'impact.entity',
  'game.entities.rock',
  'game.entities.flower',
  'game.entities.centipedehead',
  'game.entities.centipedecontroller',
  'game.entities.defenceunit'
)
.defines(function(){

  EntityWorld = ig.Entity.extend({
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
    },
    startLevel: function() {
      this.head = ig.game.spawnEntity(EntityCentipedeHead, 0, 0) 
      this.input = ig.game.spawnEntity(EntityCentipedeController,0,0, { head: this.head })
      this.defence = ig.game.spawnEntity(EntityDefenceUnit, 160, 232, {
        head: this.head
      })
      this.createRocks()
      this.createFlowers()
    },
    createRocks: function() {
      for(var i = 0; i < 20 ; i++) {
        ig.game.spawnEntity(EntityRock, 
              Math.random() * 270 + 25,
              Math.random() * 180 + 30)
      }
    },
    createFlowers: function() {

    }
  })

})
