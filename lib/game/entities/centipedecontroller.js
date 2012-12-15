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
      ig.input.bind(ig.KEY.LEFT_ARROW, 'left')
      ig.input.bind(ig.KEY.RIGHT_ARROW, 'right')
      ig.input.bind(ig.KEY.UP_ARROW, 'up')
      ig.input.bind(ig.KEY.DOWN_ARROW, 'down')
    },
    update: function() {
      this.parent()
      if(ig.input.state('left'))
    }
  })
})
