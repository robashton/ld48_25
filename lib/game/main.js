ig.module( 'game.main' ) 
.requires( 
  'impact.game', 
  'impact.font',

  'game.entities.centipedehead',
  'game.components.centipedecontroller'

)
.defines(function(){

MyGame = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
  state: {},
  actions: [],
	init: function() {
    this.createCentipede()
	},
	
	update: function() {
    this.parent()
	},
	
	draw: function() {
    this.parent()
  },
  createCentipede: function() {
    var head = ig.game.spawnEntity(EntityCentipedeHead, 0, 0, { name: 'playerhead' }) 
    this.input = new CentipedeController(head)
  }
})


// Start the Game with 30fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 30, 320, 240, 2 );

});
