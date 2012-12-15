ig.module( 'game.main' ) 
.requires( 
  'impact.game', 
  'impact.font',
  'game.entities.world',
  'game.entities.messaging',
  'game.eventbus'
)
.defines(function(){

MyGame = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
  state: {},
  actions: [],
  score: 0,
	init: function() {
    this.world = ig.game.spawnEntity(EntityWorld, 0,0)
    this.messaging = ig.game.spawnEntity(EntityMessaging, 0,0)
    this.world.start()
    Events.on('flower-eaten', this.onFlowerEaten, this)
	},
  onFlowerEaten: function(flower) {
    var change = this.world.level * 10
    this.score += change
    Events.raise('score-changed', {
      amount: change,
      x: flower.pos.x,
      y: flower.pos.y
    })
  },
	update: function() {
    this.parent()
	},
	
	draw: function() {
    this.parent()
  },
})


// Start the Game with 30fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 30, 320, 240, 3 );

});
