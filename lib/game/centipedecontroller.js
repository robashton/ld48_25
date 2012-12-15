ig.module( 'game.entities.centipedecontroller' ) 
.requires( 
  'impact.game', 
  'impact.entity'
)
.defines(function(){

  EntityCentipedeController = ig.Entity.extend({

    init: function(x,y, settings) {
      this.parent(x,y,settings)
      this.head = settings.head
    },
    update: function() {
      this.parent()

    }
  })
})
