ig.module( 'game.centipedegame' ) 
.requires( 
  'impact.game', 
  'impact.font',
  'game.entities.world',
  'game.entities.messaging',
  'game.entities.scoredisplay',
  'game.eventbus'
)
.defines(function(){

  CentipedeGame = ig.Game.extend({
    font: new ig.Font( 'media/04b03.font.png' ),
    state: {},
    actions: [],
    clearColor: '#002200',
    init: function() {
      this.start()
    },
    onPlayerDied: function() {
      Events.raise('game-over', this.scorekeeper.getStats())
    },
    update: function() {
      this.parent()
    },
    
    draw: function() {
      this.parent()
    },
    restart: function() {
      Events.clear()
      var entities = this.getEntitiesByType( Entity )
      for(var i =0 ; i < entities.length; i++)
        entities.kill()
      this.start()
    },
    start: function() {
      this.world = ig.game.spawnEntity(EntityWorld, 0,0)
      this.messaging = ig.game.spawnEntity(EntityMessaging, 0,0)
      this.scorekeeper = ig.game.spawnEntity(EntityScoreDisplay, 0, 0, {
        world: this.world
      })
      this.world.start()
      Events.on('player-died', this.onPlayerDied, this)
    }
  })

})

