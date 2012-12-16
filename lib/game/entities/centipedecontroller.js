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

      $('#game').touchwipe({
         wipeLeft: function(e) {
          settings.head.moveLeft()
         },
         wipeUp: function() {
          settings.head.moveDown()
         },
         wipeDown: function() {
          settings.head.moveUp()
         },
         wipeRight: function() {
          settings.head.moveRight()
        },
        preventDefaultEvents: true
      })
    },
    onSwipe: function(e) {
      alert(e.direction)
      if(e.direction === 'left')
        this.head.moveLeft()
      else if(e.direction === 'right')
        this.head.moveRight()
      else if(e.direction === 'down')
        this.head.moveDown()
      else if(e.direction === 'up')
        this.head.moveUp()
    },
    update: function() {
      this.parent()
      if(ig.input.state('left')) {
        this.head.moveLeft()
      }
      else if(ig.input.state('right')) {
        this.head.moveRight()
      }
      else if(ig.input.state('down')) {
        this.head.moveDown()
      }
      else if(ig.input.state('up')) {
        this.head.moveUp()
      }
    }
  })
})
